const testGet = () => {
  const spread = SpreadsheetApp.openById(links.shippingTodaySummary).getSheetByName('Shipping Today')
  let flier = spread.getRange('K3')
  console.log(flier.getValue())
}

/*
  *this function scrapes the two columns to ensure all cases are accounted for
  gets cases that haven't been sorted and puts them in a list for leadership review
  this function breaks if the sheet is changed
  * */
const getCasesFromNTS = () => {
  const shippingSummary = SpreadsheetApp.openById(links.shippingTodaySummary).getSheetByName('Shipping Today')
  let fullList = new Set() 
  var flier = shippingSummary.getRange('I3')
  console.log(flier.getColumn())
  while (flier.getValue().toString().length > 0) {
    fullList.add(flier.getValue())
    console.log('first', flier.getValue())
    flier = flier.offset(1,0)
  }
  flier = shippingSummary.getRange('K3')
  console.log(flier.getColumn())
  while (flier.getValue().toString().length > 0) {
    fullList.add(flier.getValue())
    console.log('second', flier.getValue())
    flier = flier.offset(1,0)
  }
  return fullList
}
/*
  *extracts one copy each of cases for comparisons
  * */
const getCurrentCases = () => {
  const qaSheet = SpreadsheetApp.openById(links.test).getSheetByName('Cases')
  //console.log(`sheetname: ${qaSheet.getName()}`)
  var returnCases = new Set()
  let columnFlier = qaSheet.getRange('B2')
  const columnOptions = ['splint', 'recon']

  while (columnOptions.includes(columnFlier.getValue())) {
    console.log(`flier: ${columnFlier.getValue()}`)
    if (columnFlier.getValue() === columnOptions[0]) {
      let rowFlier = columnFlier.offset(1,0)
      //console.log(`initial columnFlier splint: ${columnFlier.getValue()}`)
      while (rowFlier.getValue().toString().length !== 0) {
        //console.log(`this case in splint: ${rowFlier.getValue()}`)
        returnCases.add(rowFlier.getValue().toString())
        rowFlier = rowFlier.offset(1,0)
      }
      columnFlier = columnFlier.offset(0,4)
    } 

    if (columnFlier.getValue() === columnOptions[1]) {
      let rowFlier = columnFlier.offset(1,0)
      //console.log(`initial columnFlier recon: ${columnFlier.getValue()}`)
      while (rowFlier.getValue().toString().length !== 0) {
        //console.log(`this case in recon: ${rowFlier.getValue()}`)
        returnCases.add(rowFlier.getValue().toString())
        rowFlier = rowFlier.offset(1,0)
      }
    }
    columnFlier = columnFlier.offset(0,4)
  }
  return returnCases
}

/*
  * makes comparison to extract unsorted cases
  */
const findMissingCases = () => {
  console.log('first')
  const currCases = getCurrentCases();
  console.log('second')
  const NTSCases = getCasesFromNTS();
  console.log('third')

  const unSortedCases = [...NTSCases].filter(x => !currCases.has(x))
  console.log('fourth')
  return unSortedCases
}

function plantMissingCases() {
  const missingCases = findMissingCases();
  const qaSheet = SpreadsheetApp.openById(links.cases).getSheetByName('Cases')
  qaSheet.getRange("R:R").clear()
  let flier = qaSheet.getRange('R2')
  qaSheet.setColumnWidth(flier.getColumn(), 130)
  flier.setBackground(colorPallet.headers).setValue('unsorted').setFontColor(colorPallet.colorWhite).setFontSize(20).setFontWeight("bold").setHorizontalAlignment("center")
  for (let cases of missingCases) {
    console.log(`missing case: ${cases}`)
    flier = flier.offset(1,0)
    flier.setValue(cases).setHorizontalAlignment("center").setFontColor(colorPallet.colorBlack)
  }
   
}
