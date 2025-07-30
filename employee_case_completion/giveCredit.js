function fixC() {
  let credit = SpreadsheetApp.openById(links.credit).getSheetByName('Sheet1').getRange('A8')
  while (credit.getValue().toString.length > 0) {
    credit.setValue('C' + credit.getValue())
    credit = credit.offset(1,0)
  }
}

/*
  * gathers up all the predone cases into a dict:
  * key: case #: value: Initial
  */
const getPredone = () => {
  console.log('1')
  let credit = SpreadsheetApp.openById(links.credit).getSheetByName('Sheet1').getRange('A1')
  let returnCredit = {}
  while (credit.getValue().toString().length > 0) {
    returnCredit[credit.getValue()] = credit.offset(0,1).getValue()
    credit = credit.offset(1,0)
  }
  return returnCredit
}
/*
  * returns remaining done cases to list
  */
const returnAcquired = (inObj) => {
  const credit = SpreadsheetApp.openById(links.credit).getSheetByName('Sheet1')
  const keys = Object.keys(inObj)
  const values = Object.values(inObj)
  credit.getRange('A1:A').clear()
  credit.getRange('B1:B').clear()
  let flier = credit.getRange('A1')
  for (const key of keys) {
    flier.setValue(key)
    flier.offset(0,1).setValue(inObj[key])
    flier = flier.offset(1,0)
  }
}

/**
check through the list and fill all fields with initials as needed
returns the done cases so remaining can be added back to the list in Credit sheet
*/
function applyCredit() {
  const doneCases = getPredone();
  const doneCasesKeys = Object.keys(doneCases) 
  const qaSheet = SpreadsheetApp.openById(links.cases).getSheetByName('cases')
  var creditAlert = []
  let flier = qaSheet.getRange('N3')
  for (let x = 0; x < 3; x++) {
    let rowFlier = flier
    while (rowFlier.getValue().toString().length > 0) {
      const thisCase = rowFlier.getValue()
      var questionSplint = new Boolean
      if(doneCasesKeys.includes(thisCase)) {
        console.log(`found: ${thisCase}`)
        creditAlert.push(thisCase)
        if (rowFlier.getBackground() === colorPallet.colorWhite) {
          questionSplint == true
        }
        rowFlier.offset(0,2).setValue(doneCases[thisCase])
        rowFlier.setBackground(colorPallet.completedCase)
        if (questionSplint === false) {
          delete doneCases[thisCase]
          break
        } else {
          if (qaSheet.getRange("B3:B").getValues().includes(thisCase)) {
            let splintFlier = qaSheet.getRange("B3")
            while (splintFlier.getValue() !== thisCase) {
              splintFlier = splintFlier.offset(1,0)
            }
            if (splintFlier.getBackground() === colorPallet.regularCells) {
              splintFlier.setBackground(colorPallet.completedCase)
              splintFlier.offset(0,2).setBackground(colorPallet.colorBlack)
            }
          } 
          if (qaSheet.getRange("F3:F").getValues().includes(thisCase)) {
            let splintFlier = qaSheet.getRange("F3")
            while (splintFlier.getValue() !== thisCase) {
              splintFlier = splintFlier.offset(1,0)
            }
            if (splintFlier.getBackground() === colorPallet.regularCells) {
              splintFlier.setBackground(colorPallet.completedCase)
              splintFlier.offset(0,2).setBackground(colorPallet.colorBlack)
            }
          }
          console.log(`deleting: ${thisCase}`)
          delete doneCases[thisCase]
        }
        
      }
      rowFlier = rowFlier.offset(1,0)
    }
    flier = flier.offset(0, -4)
    console.log(`flier change column: ${flier.getColumn()}`)
  }
  const thisSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
  Browser.msgBox(`Cases to track down: ${creditAlert}`)
  console.log(doneCases)
  return doneCases
}

/*
runs and replaces with updated values/ initials/ etc
*/
function runGetCredit() {
  const remainingAfterRun = applyCredit() 
  returnAcquired(remainingAfterRun)
}
