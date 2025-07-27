/*
will compile all splint and recon cases for extraction and future formatting
NOTE the cases are a set at the beginning. converted to array before returning
the removal of duplicates is handled in this step
*/
const getThemCases = () => {
  //setup needed dict and the requires sheets
  let cases = {}
  cases["splint"] = new Set()
  cases["recon"] = new Set()
  const nonSplintCateg = ['SLM', 'PA', 'PEEK', 'Crystal', 'Classic']
  const shippingTodaySummary = SpreadsheetApp.openById(links.shippingTodaySummary)
  //flier traverses the categories
  let flier = shippingTodaySummary.getSheetByName("Shipping Today").getRange("A4")
  console.log("We have opened the gates")
  //case_scraper traverses columns
  let case_scraper = flier
  
  while (flier.getValue().substring(0, flier.getValue().lastIndexOf(" ")) == "Splint" || nonSplintCateg.includes(flier.getValue().substring(0, flier.getValue().lastIndexOf(" ")))) {
    console.log(`flier: ${flier.getValue().substring(0, flier.getValue().lastIndexOf(" "))}`)
    if (flier.getValue().substring(0,flier.getValue().lastIndexOf(" ")) == "Splint") {
      case_scraper = case_scraper.offset(1,0)
      while (case_scraper.getValue().length >= 1) {

        cases['splint'].add(case_scraper.getValue().trim())
        //console.log(`this is the initial scrape: ${case_scraper.getValue()}`)
        case_scraper = case_scraper.offset(1,0)
      }
      flier = flier.offset(0,1)
    }
    if (nonSplintCateg.indexOf(flier.getValue().substring(0, flier.getValue().lastIndexOf(" "))) !== -1) {
      case_scraper = flier.offset(1,0)
      while (case_scraper.getValue().length >= 1) {
        cases['recon'].add(case_scraper.getValue())
        case_scraper = case_scraper.offset(1,0)      
      }
      flier = flier.offset(0,1)
    }
  }
  //returns dict of arrays
  for (let category in cases) {
    cases[category] = [...cases[category]]
    //console.log(`individual: ${cases[category]}`)
  }
  return cases
}
/**
 * gets the umeric value while maintaining seperation of 'splint/recon'/ cuts off "C"
 */
const getCaseNumbers = (inCases) => {
  let returnDictCases = {}
  returnDictCases['splint'] = []
  returnDictCases['recon'] = []
  //for troubleshooting cases: pastes to the sheet
  let erroredCases = []
  //get the number values of each case, still seperated by splint/recon
  for (let caseList in inCases) {
    for (let ipsCase of inCases[caseList]) {
      console.log(`ipsCase: ${ipsCase}`)
      if (ipsCase.length == 8) {
        if (ipsCase.slice(1).length != 7) {
          console.log(`caught during slicing ${ipsCase}`)
        }
        returnDictCases[caseList].push(Number(ipsCase.slice(1)))  
      } else {
        erroredCases.push(ipsCase)
      }
    }
  }
  //now paste the troubled cases to the sheet for review:
  //if (erroredCases.length > 0) {
    //const destSheet = SpreadsheetApp.openById(links.cases).getSheetByName("Cases")
    //let errorRanger = destSheet.getRange("U12")
    //for (const errorCase of errorRanger) {
      //errorRanger.setValue(errorCase)
      //errorRanger = errorRanger.offset(1,0)
    //}
  //}
  return returnDictCases
}
/**
 * sorts one array (recon or splint)
 * mergersort
 * actually returns the sorted array
 */
const sortCases = (inArray) => {
  if (inArray.length <= 1) {
    return inArray
  }
  const middle = Math.floor(inArray.length/2)
  const left = inArray.slice(0, middle)
  const right = inArray.slice(middle, inArray.length)

  const sortLeft = sortCases(left)
  const sortRight = sortCases(right)

  return mergeCases(sortLeft, sortRight)
}

/**
 * simple merger for the case number
 */
const mergeCases = (leftArray, rightArray) => {
  let sortedIPSCases = []
  let pointOne = 0
  let pointTwo = 0

  while (pointOne < leftArray.length && pointTwo < rightArray.length) {
    //console.log(`left: ${leftArray[pointOne]} right: ${rightArray[pointTwo]}`)
    if (leftArray[pointOne] < rightArray[pointTwo]) {
      sortedIPSCases.push(leftArray[pointOne])
      pointOne ++
    } else {
      sortedIPSCases.push(rightArray[pointTwo])
      pointTwo ++
    }
    for (const x of sortedIPSCases) {
      if (x.length != 7) {
        //console.log(`got one: ${x}`)
      }
    }
  }
  return sortedIPSCases.concat(leftArray.slice(pointOne).concat(rightArray.slice(pointTwo)))
}

/**
 * will add "C" to each element and convert to a string
 * only completes on one array at a time
 */
const addC = (inArray) => {
  let returnArray = []
  for (const ipsCase of inArray) {
    //console.log(`length: ${"C" + howManyZeros(7 - ipsCase.toString().length) + ipsCase}`)
    returnArray.push("C" + howManyZeros(7 - ipsCase.toString().length) + ipsCase)
  }
  return returnArray
}
//used exclusively in the above function to determine how many leading 0's were cut off, returns string
const howManyZeros = (inNumber) => {
  let returnStr = ""
  for (let zeroith = 0; zeroith < inNumber; zeroith++) {
    returnStr += "0"
  }
  //console.log(`zeroes needed: ${returnStr} length: ${inNumber}`)
  return returnStr
}


/**
 * runs all of the commands in order of this group of logical operations
 * note that daysCases ends up with an additional key/value
 */
const AutoRunner9000 = () => {
  let daysCases = getCaseNumbers(getThemCases());
  //console.log(`here is the first set: ${daysCases['splint']}`)
  for (cases in daysCases) {
    //console.log(`before ${cases} ${daysCases[cases]}`)
    daysCases[cases] = sortCases(daysCases[cases])
    daysCases[cases] = addC(daysCases[cases])

    console.log(`after ${cases}: ${daysCases[cases]}`)
  }
  daysCases = findSameCases(daysCases)
  return daysCases
}

/**
 * finds duplicates(those with splints and recon)
 * adds a key/value to the dict
 */
const findSameCases = (inCasesDict) => {
  inCasesDict['duplicates'] = []
  for (const ipsCase of inCasesDict['splint']) {
    if (inCasesDict['recon'].includes(ipsCase)) {
      inCasesDict['duplicates'].push(ipsCase)
    }
  }
  return inCasesDict
 }

/*
  * this will compare the current state of the list with the 
  * two admin columns to ensure all cases are taken into account-
  * also checks if any have been added dynamically*/
const checkForMissedCases = () => {
  const qaSheet = SpreadsheetApp.openById(links.test).getSheetByName('Cases')
  const columnOptions = ['splint', 'recon']
  let missingCases = []
  let columnFlier = qaSheet.getRange('B2')

  while (columnOptions.includes(columnFlier.getValue())) {

  }
}


/*
  *compile all the cases in the admin columns
  * */
const adminScraper = () => {
  const todaySummary = SpreadsheetApp.openById(links.shippingTodaySummary).getSheetByName('Shipping Today')
  let casesToShip = []
  let columnFlier =  todaySummary.getRange('I3')

  for (const x = 0; x < 2; x++) {
    while (columnFlier.getValue().toString().length > 0) {
      casesToShip.push(columnFlier.getValue())
      columnFlier = columnFlier.offset(1,0)
    }
    columnFlier = todaySummary.getRange('K3')
  }
  return casesToShip
}

























