export const GOOGLE_APPS_SCRIPT_CODE = `/**
 * MINDSPACE 2026 - Free-Tier Google Sheets Backend Handler
 * Deploy this script as a Web App to securely store student registrations directly in your private Google Sheet.
 * 
 * SETUP STEPS:
 * 1. Open Google Sheets (sheets.new) and name it "MINDSPACE 2026 Registrations"
 * 2. In Google Sheets menu: Extensions > Apps Script
 * 3. Delete any default code, paste this entire script, and click Save (Ctrl+S)
 * 4. Click "Deploy" > "New deployment"
 * 5. Select type: "Web app"
 * 6. Set Description: "MINDSPACE Registration Webhook"
 * 7. Set Execute as: "Me"
 * 8. Set Who has access: "Anyone" (allows student browser form submissions)
 * 9. Click "Deploy", copy the Web App URL (ends with /exec), and paste it into the MINDSPACE Organizer Dashboard Settings.
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Auto-create table headers on first run if empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Registration ID",
        "Submission Timestamp",
        "Full Name",
        "College Email",
        "College / Institution",
        "Course / Department",
        "Semester / Year",
        "Contact Number",
        "Selected Activities",
        "Preferred Time Slot",
        "Consent Status",
        "Status"
      ]);
      sheet.getRange(1, 1, 1, 12).setFontWeight("bold").setBackground("#25483B").setFontColor("#FFFFFF");
      sheet.setFrozenRows(1);
    }
    
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.registrationId || "N/A",
      new Date().toLocaleString(),
      data.fullName || "",
      data.email || "",
      data.college || "",
      data.department || "",
      data.semester || "",
      data.contactNumber || "N/A",
      data.selectedActivities || "",
      data.preferredTimeSlot || "",
      data.consent || "Agreed",
      data.status || "confirmed"
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ result: "success", id: data.registrationId }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("MINDSPACE 2026 Webhook endpoint is active and listening for POST requests.");
}
`;
