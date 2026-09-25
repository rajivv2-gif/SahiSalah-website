/**
 * NAMANKAN ADDA - LEAD GENERATION SCRIPT
 * INSTRUCTIONS:
 * 1. Go to sheets.google.com and create a new blank Google Sheet.
 * 2. Name your sheet something like "Namankan Adda Leads".
 * 3. In the top menu, click Extensions > Apps Script.
 * 4. Erase any code there and paste this entire file.
 * 5. Click "Deploy" (top right) > "New deployment".
 * 6. Select type: "Web app".
 * 7. Under "Execute as", select "Me (<your email>)".
 * 8. Under "Who has access", MUST select "Anyone".
 * 9. Click Deploy. Authorize access if prompted.
 * 10. Copy the Web App URL generated.
 * 11. Navigate to your `common.js` file and replace the `GOOGLE_SCRIPT_URL` placeholder with this copied link!
 */

const sheetName = 'Sheet1'; // Make sure the tab name at the bottom of your sheet matches this!

function doPost(e) {
  try {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = doc.getSheetByName(sheetName);
    
    // Add headers if the sheet is empty
    if(sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "WhatsApp Number", "Target Country"]);
      
      // Optionally style the headers to look premium
      const headerRange = sheet.getRange("A1:D1");
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#3b82f6");
      headerRange.setFontColor("white");
    }

    // Capture the data submitted from the HTML modal form
    const data = [
      new Date(),       // Timestamp of the lead
      e.parameter.Name, // Pulls the "name" attribute from the <input name="Name">
      e.parameter.Phone, // Pulls the WhatsApp field
      e.parameter.Target // Pulls the Dropdown Selection
    ];
    
    // Append a new row to the sheet
    sheet.appendRow(data);
    
    // Return a JSON response back to the website so `common.js` knows it succeeded
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error back to the website
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
