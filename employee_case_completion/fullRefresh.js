/*
grabs the cases and all data from the sheet
*/
const getCases = () => {
  let splint = []
  let recon = []
  let flier = SpreadsheetApp.openById(links.cases).getSheetByName('Cases').getRange('B2')
  while (flier.getColumn() < 17) {
    if (flier.getValue() == 'splint') {
      let rowFlier = flier.offset(1,0)
      while (rowFlier.getValue().length > 0) {
        //console.log(rowFlier.getValue())
        splint.push(rowFlier.getValue())
        rowFlier = rowFlier.offset(1,0)
      }
    }  
    if (flier.getValue() == 'recon'){
      let rowFlier = flier.offset(1,0)
      while (rowFlier.getValue().length > 0) {
        recon.push(rowFlier.getValue())
        //console.log(rowFlier.getValue())
        rowFlier = rowFlier.offset(1,0)
      }
    }
    flier = flier.offset(0,1)
  }
  return {splint, recon}
}

/*grabs all the cases from the sorted side of the admin sheet
  */
const compareForRefresh = () => {
  //gets admins list
  const adminCurrent = getThemCases()
  for (const cases in adminCurrent) {
    console.log(`case: ${cases}`)
  }
  //gets qa's list
  const qaCurrent = getCases()
  for (const x in qaCurrent) {
    for (const y of qaCurrent[x]) {
      //console.log(`${x}: ${qaCurrent[y]}`)
    }
  }
  let addedCases = {'splint': [], 'recon': []}
  //for (const x in qaCurrent) {
  //  console.log(x)
  //}

  for (const category in adminCurrent) {
    for (const ipsCase of adminCurrent[category]) {
      if (!qaCurrent[category].includes(ipsCase)) {
        addedCases[category].push(ipsCase)
        console.log(`pushing: ${ipsCase}`)
      }
    }
  }
  for (const x in addedCases) {
    //for (const c of addedCases[x]) {
    //  console.log(`${x}: ${c}`)
    //}
  }
  return addedCases
}

function runAndAddCasses() {
  const newCases = compareForRefresh()
  let flier = SpreadsheetApp.openById(links.cases).getSheetByName('Cases').getRange('F3')
  while (flier.getValue().length > 0) {
    flier = flier.offset(1,0)
  }
  for (const ipsCase of newCases['splint']) {
    flier.setValue(ipsCase)
    if (newCases['recon'].includes(ipsCase)) {
      flier.setBackground(colorPallet.colorWhite)
      flier.offset(0,-1).setValue(flier.offset(-1,-1).getValue() + 1)
    } else {
      flier.setBackground(colorPallet.regularCells)
      flier.offset(0,-1).setValue(flier.offset(-1,-1).getValue() + 1)
    }
    flier = flier.offset(1,0)
  }
  flier = SpreadsheetApp.openById(links.cases).getSheetByName('Cases').getRange('N3')
  while (flier.getValue().length > 0) {
    flier = flier.offset(1,0)
  }
  for (const ipsCase of newCases['recon']) {
    flier.setValue(ipsCase)
    if (newCases['splint'].includes(ipsCase)) {
      flier.setBackground(colorPallet.colorWhite)
      flier.offset(0,-1).setValue(flier.offset(-1,-1).getValue() + 1)
    } else {
      flier.setBackground(colorPallet.regularCells)
      flier.offset(0,-1).setValue(flier.offset(-1,-1).getValue() + 1)
    }
    flier = flier.offset(1,0)
  }

  Browser.msgBox(`Cases added:\n Splints: ${newCases['splint']}\nRecon: ${newCases['recon']}`);
}

function RunTestNumber() {
  let spreader = SpreadsheetApp.openById(links.cases).getSheetByName('Test')
  let flyBoy = spreader.getRange('F3')
  checkCaseNumberOfList(flyBoy, spreader)
}

const checkCaseNumberOfList = (inRange, inSheet) => {
  if (!Number(inRange.offset(-1,-1).getValue()) instanceof Number) {
    inRange.offset(0,-1).setValue(inRange.offset(-1,-1) + 1) 
  } else {
    let maxRowFinder = inSheet.getRange(inRange.getSheet().getLastRow(), inRange.getColumn() - 1)
    while (maxRowFinder.getValue().toString().length == 0) {
      maxRowFinder = maxRowFinder.offset(-1,0)

    }
    console.log(`Row: ${maxRowFinder.getRow()}\nColumn: ${maxRowFinder.getColumn()}\nvalue: ${maxRowFinder.getValue()}`)
  }
}
