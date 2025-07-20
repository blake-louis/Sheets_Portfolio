const tocMenu = () => {
  const html = HtmlService.createHtmlOutputFromFile('sidebar').setTitle("Options");
  SpreadsheetApp.getUi().showSidebar(html)
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

