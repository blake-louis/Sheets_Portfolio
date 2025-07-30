/*
grabs the cases and all data from the sheet
*/

const getCases = () => {
  const updated = getThemCases();
  for (const x in updated) {
    console.log(`${x}: ${updated[x]}`)
  }
  let splints = []
  let recon = []
  let flier = SpreadsheetApp.openById(links.cases).getRange('B2')
  for (let x = 0; x < 3; x++) {
    if (flier.getValue() == 'splint') {
      let rowFlier = flier.offset(1,0)
      while (rowFlier.getValue().length > 0) {
        splints.push(rowFlier.getValue())
        rowFlier = rowFlier.offset(1,0)
      }
    } else {
      let rowFlier = flier.offset(1,0)
      while (rowFlier.getValue().length > 0) {
        recon.push(rowFlier.getValue())
        rowFlier = rowFlier.offset(1,0)
      }
    }
    flier = flier.offset(0,4)
  }
}
