const saveHistory = () => {
  const saveSheet = SpreadsheetApp.openById(links.cases).getSheetByName('Cases')
  const historyCopy = SpreadsheetApp.openById(links.history)
  const sheetName = saveSheet.getRange("N1").getValue().toString().trim()
  const theCopy = saveSheet.copyTo(historyCopy)
  theCopy.setName(sheetName)

  
}
