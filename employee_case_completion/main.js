function runCollection() {
  const collectedCases = AutoRunner9000()
  //console.log(`collected cases: ${collectedCases}`)
  saveHistory()
  clearField()
  layoutCases(collectedCases)
}

/**
 * kept here for safety: clears the field for the next list
 */
const clearField = () => {
  const destSheet = SpreadsheetApp.openById(links.cases).getSheetByName("Cases")
  const blastField = destSheet.getRange("A1:R47")
  blastField.clear()
  blastField.clearNote()
}

/**
 * saves the current sheet to a private collection
 */
const saveSnapshotList = () => {
  
}
