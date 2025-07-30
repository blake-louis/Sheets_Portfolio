
/*
  * get a hash of each case for the day and it's case date as the value
  */
const retrieveCaseDates = () => {
  const dateGet = new Date()
  const monthName = dateGet.toLocaleString('default', { month: 'long' });
  const monthNumber = dateGet.getMonth() + 1;
  const dayNumber = dateGet.getDate();
  const dailyIPSSheet = SpreadsheetApp
    .openById(links.dailyIPSShipments)
    .getSheetByName(monthName);
  //key: case #  value: [dhl/rep pickup, case date]
  let returnCaseInfo = {}
  //gather all cases and dates from the current day's list
  //check for date, then loop and collect dhl/rep pickup and case date info
  const lastRow = dailyIPSSheet.getLastRow()
  const entireRange = dailyIPSSheet.getRange(`A2:J${lastRow}`).getValues()
  
  //for (const x of entireRange) {
  //  console.log(x)
  //  console.log(x[1])
  //}
  //let's process this 2D array >:)
  for (let row = 0; row < entireRange.length; row++) {
    //console.log(entireRange[row][0])
    if (entireRange[row][0].toString().length > 50) {
      //console.log(entireRange[row][0].toString().length)
      const dateCheck = Utilities.formatDate(entireRange[row][0], "America/New_York", "M/d")
      //console.log(dateCheck)
      //console.log(`${monthNumber}/${dayNumber}`)
      //console.log(dateCheck.includes(`${monthNumber}/${dayNumber + 1}`))
      if (dateCheck.includes(`${monthNumber}/${dayNumber}`)) {
        for (let todayRows = row + 1; todayRows < entireRange.length; todayRows++) {
          //console.log(entireRange[todayRows])
          try {
            //console.log(entireRange[todayRows][1].toString())
            const dhlCheck = entireRange[todayRows][3].toString().toLowerCase()
            if (dhlCheck.includes("dhl") || dhlCheck.includes("rep pick")) {
              returnCaseInfo[entireRange[todayRows][1]] = [entireRange[todayRows][3], entireRange[todayRows][9]]
              //console.log(returnCaseInfo[entireRange[todayRows][1]])
            } else {
              if (entireRange[todayRows][1].toString().length > 0) {
                returnCaseInfo[entireRange[todayRows][1]] = ["", entireRange[todayRows][9]]
              } else {
                continue
              }
            }
          } catch {
            //console.log('There was an issue when gathering case information from daily ips shipment')
          }
          
        }
      } 
    }
  }
          
  //for (const x in returnCaseInfo) {
  //  console.log(`case: ${x}: `)
  //  for (const y of returnCaseInfo[x]) {
  //    console.log(`item: ${y}`)
  //  }
  //}
  return returnCaseInfo
}

/*
  * plugs in all of the found data. the logic is careful not
  * to add duplicate data
  */
function plugInCaseDateAndDHL() {
  const todaysCases = retrieveCaseDates();
  const todaysKeys = Object.keys(todaysCases)
  //console.log(todaysKeys)
  const qaSheet = SpreadsheetApp.openById(links.cases).getSheetByName('Cases')
  let columnFlier = qaSheet.getRange("B3")
  for (let rowCount = 0; rowCount < 5; rowCount++) {
    let rowFlier = columnFlier
    while (rowFlier.getValue().toString().length > 0) {
      const thisCell = rowFlier.getValue()
      if (todaysKeys.includes(thisCell) && !rowFlier.getNote().includes(todaysCases[thisCell][1])) {
        rowFlier.setNote(`Sx: ${todaysCases[thisCell][1]}\n${rowFlier.getNote()}`)
      }
      if (todaysKeys.includes(thisCell) && todaysCases[thisCell][0].toString().length > 0 && !rowFlier.offset(0,1).getValue().toString().includes(todaysCases[thisCell][0])){
          rowFlier.offset(0,1).setValue(`${todaysCases[thisCell][0]}/ ${rowFlier.offset(0,1).getValue()}`).setFontColor(colorPallet.colorWhite).setBackground(colorPallet.colorRed).setFontWeight('bold').setFontSize(14)
      }
      rowFlier = rowFlier.offset(1,0)
    }
    columnFlier = columnFlier.offset(0, 4)
  }

}

const test = () => {
  const todays = retrieveCaseDates()
  for (const x in todays) {
    console.log(`${x}: ${todays[x]}`)
  }
}


