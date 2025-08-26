/*
  * scrapes the list compiled by admin of cases already processed
  * */
const getShippedTodayCases = () => {
  const shippedCases = []
  const shipSummary = SpreadsheetApp.openById(links.shippingTodaySummary).getSheetByName('Shipping Today')
  let flier = shipSummary.getRange('P3')
  for (let x = 0; x < 2; x++) {
    while (flier.getValue().length > 0) {
      shippedCases.push(flier.getValue())
      flier = flier.offset(1,0)
    }
    flier = shipSummary.getRange('Q3')
  }
  return shippedCases
}
/*
  * this loops the entire sheet;
* checks if there is a signature associated with the case,
  * if so: move on. else: color code accordingly*/
const checkQaCasesForShipped = () => {
  const qaSheet = SpreadsheetApp.openById(links.cases).getSheetByName('Cases')
  let flier = qaSheet.getRange('B2')
  const shippedCases = getShippedTodayCases()
  const categ = ['splint', 'recon']
  for (let x = 0; x < 16; x++) {
    if (!categ.includes(flier.getValue())) {
      console.log('not a cat')
      flier = flier.offset(0,1)
      continue
    } else {
      console.log('a cat!')
      let rowFlier = flier.offset(1,0)  
      while (rowFlier.getValue().length > 0) {
 
        if (shippedCases.includes(rowFlier.getValue()) && rowFlier.offset(0,2).getValue().length == 0 && rowFlier.offset(0,2).getBackground() != colorPallet.colorBlack) {
          rowFlier.setBackground(colorPallet.shippedCases)
          rowFlier.offset(0,2).setValue('SHIPPED')
        }
        rowFlier = rowFlier.offset(1,0)
      }
    }
    flier = flier.offset(0,1)
  }
}

function runShippedCheck() {
  checkQaCasesForShipped()
}
