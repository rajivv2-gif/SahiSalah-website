# Namankan Adda Leads Backend Setup Guide 🚀

Your frontend lead evaluator captures critical details (Name, Phone, Academic Score, Budget, Stream). To securely store these directly into your own private Google Sheet without paying for a backend server or database, follow these exact steps:

### Step 1: Create the Google Sheet
1. Go to [Google Sheets](https://sheets.google.com) and create a Blank Spreadsheet.
2. Name it something like **Namankan Adda Leads DB**.
3. In the bottom tab, rename `Sheet1` to exactly `Leads` (case-sensitive).
4. In Row 1, create the following column headers exactly matching the `name=""` attributes in our HTML:
   - Cell A1: `Timestamp`
   - Cell B1: `Name`
   - Cell C1: `Phone`
   - Cell D1: `Score`
   - Cell E1: `Budget`
   - Cell F1: `Stream`

### Step 2: Add the Apps Script
1. In the top Google Sheets menu, click **Extensions > Apps Script**.
2. Delete all existing code in the editor (`function myFunction() {...}`).
3. Open the `GoogleScript.gs` file I provided in your project folder, copy all the code, and paste it into the editor.
4. Hit **Save** (the floppy disk icon).
5. Ensure the script has permission by selecting the `initialSetup` function from the top dropdown, and clicking **Run**. Google will ask you to Review Permissions > Choose your account > Advanced > Go to Untitled project. Click Allow.

### Step 3: Deploy as a Live API
1. In the top right of the Apps Script editor, click the blue **Deploy** button > **New deployment**.
2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**.
3. Set the following criteria:
   - **Description**: `Version 1.0`
   - **Execute as**: `Me (your email)`
   - **Who has access**: `Anyone` (CRITICAL: If you don't choose "Anyone", the frontend won't be able to submit form data).
4. Click **Deploy**.
5. Copy the **Web app URL** generated (it will start with `https://script.google.com/macros/s/AKfyc...`).

### Step 4: Link it to your Website
1. Open the `common.js` file in your code editor.
2. Locate `line 116`: `const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycb.../exec";`
3. Replace the URL inside the quotes with the Web App URL you just copied.
4. Save the file.

### Step 5: Test It!
Go to your `apply.html` or `index.html`, fill out the evaluator quiz, enter a dummy name, and hit submit. Within 2 seconds, the data will instantly appear as a new row in your Google Sheet!
