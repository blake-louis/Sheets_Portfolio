const tocMenu = () => {
  if (Session.getActiveUser().getEmail() !== Session.getEffectiveUser().getEmail()) {
    const html = HtmlService.createHtmlOutputFromFile('sidebar').setTitle("User Menu");
    SpreadsheetApp.getUi().showSidebar(html)
  } else {
    const html = HtmlService.createHtmlOutputFromFile('adminSidebar').setTitle("User Menu");
    SpreadsheetApp.getUi().showSidebar(html)
  }
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Myy Scripts")
    .addItem("Add Em Up", "runSaveNumbersMain")
    .addItem("Populate List", "runCollection")
    .addToUi();
  SpreadsheetApp.getUi()
  .createMenu("Menus")
  .addItem("Sidebar", "tocMenu")
  .addToUi()
}

