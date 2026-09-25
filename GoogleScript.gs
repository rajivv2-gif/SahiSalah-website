/**
 * Handles incoming lead submissions from all forms on the Sahi Salah website.
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  // Wait for up to 10 seconds for other processes to finish.
  lock.tryLock(10000);

  try {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    
    // Find the correct tab: check for 'Sheet1', then 'Leads', or fallback to the first sheet
    let sheet = doc.getSheetByName('Sheet1') || doc.getSheetByName('Leads') || doc.getSheets()[0];

    // If no sheets exist at all (empty spreadsheet), create one
    if (!sheet) {
      sheet = doc.insertSheet('Sheet1');
    }

    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn() || 1).getValues()[0];
    const nextRow = sheet.getLastRow() + 1;

    // Map the form data to the column headers using intelligent matching
    const newRow = headers.map(function(header) {
      // Auto-timestamp for new lead
      if (header === 'Timestamp' || header === 'timestamp') {
        return new Date();
      }
      return getParameterByHeader(header, e.parameter);
    });

    // Write the new row to the sheet
    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  finally {
    lock.releaseLock();
  }
}

/**
 * Intelligent helper to match spreadsheet headers with various naming formats used across forms.
 */
function getParameterByHeader(header, parameter) {
  // Normalize header string (lowercase, remove spaces and symbols)
  const h = header.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // Mapping table of header terms to expected form parameters
  const mapping = {
    'name': ['leadName', 'Name', 'name', 'studentName'],
    'phone': ['leadPhone', 'Phone', 'phone', 'whatsapp', 'WhatsApp', 'WhatsApp Number', 'whatsappnumber'],
    'whatsappnumber': ['leadPhone', 'Phone', 'phone', 'whatsapp', 'WhatsApp', 'WhatsApp Number', 'whatsappnumber'],
    'whatsapp': ['leadPhone', 'Phone', 'phone', 'whatsapp', 'WhatsApp', 'WhatsApp Number', 'whatsappnumber'],
    'email': ['email', 'Email'],
    'score': ['score', 'Score'],
    'budget': ['budget', 'Budget'],
    'stream': ['stream', 'Stream', 'Target', 'target', 'education'],
    'target': ['stream', 'Stream', 'Target', 'target', 'education'],
    'targetcountry': ['Target', 'target', 'Target Country', 'targetcountry', 'stream', 'Stream'],
    'education': ['education', 'edu', 'Target', 'target'],
    'city': ['city', 'City'],
    'testtype': ['test_type', 'testtype', 'TestType'],
    'goal': ['goal', 'Goal'],
    'location': ['location', 'Location']
  };

  // Find candidate keys for this normalized header
  const candidates = mapping[h];
  if (candidates) {
    for (let i = 0; i < candidates.length; i++) {
      if (parameter[candidates[i]] !== undefined) {
        return parameter[candidates[i]];
      }
    }
  }
  
  // Case-insensitive direct match fallback
  for (const key in parameter) {
    if (key.toLowerCase() === h) {
      return parameter[key];
    }
  }
  
  // Literal match fallback
  return parameter[header] !== undefined ? parameter[header] : "";
}
