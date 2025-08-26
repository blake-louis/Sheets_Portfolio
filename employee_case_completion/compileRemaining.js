
/*
  * scrape qa list and find all cases that are unaccounted for 
  */
const compileNeedReview = () => {
  const qaSheet = SpreadsheetApp.openById(links.cases).getSheetByName('Cases')
  let flier = qaSheet.getRange('A2')
  const categ = ['splint', 'recon', 'unsorted']
  let needReview = []

  for (let x = 0; x < 20; x++) {
    if (categ.includes(flier.getValue())) {
      console.log('1')
      let rowFlier = flier.offset(1,0)
      while (rowFlier.getValue().length > 0) {
        if (rowFlier.offset(0,2).getValue().length == 0 && rowFlier.offset(0,2).getBackground() != colorPallet.colorBlack) {
          console.log(rowFlier.getValue())
          console.log(`length zero? ${rowFlier.offset(0,2).getValue()}`)
          needReview.push(rowFlier.getValue())
        }
        rowFlier = rowFlier.offset(1,0)
      }
    }
    flier = flier.offset(0,1)
  }

  return needReview
}

function runNeedsReview() {
  const compSheet = SpreadsheetApp.openById(links.cases).getSheetByName('Final Walk Through')
  compSheet.getRange('A2:B').clear()
  let flier = compSheet.getRange('A2')
  compSheet.setColumnWidth(flier.getColumn(), 200)
  const needsReview = compileNeedReview()
  console.log(`needs rev ${needsReview}`)
  for (const x of needsReview) {
    console.log(x)
    flier.setValue(x).setFontSize(20)
    flier = flier.offset(1,0)
  }
}
