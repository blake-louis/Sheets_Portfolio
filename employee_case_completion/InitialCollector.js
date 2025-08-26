/*
This function returns the employees stored in the "Employees" sheet in the format:
{initials: [name, splintCount, reconCount]}
*/ 
function getEmployeeInitials() {
  let employees = {}
  let emplSheet = SpreadsheetApp.openById(links.myResources)
  let flier = emplSheet.getRange("A1")
  console.log('about to gather data in getEmployeeInitials')
  while (flier.getValue().length >= 1) {
    if (flier.getValue() != "Employees") {
      employees[flier.getValue()] = [flier.offset(0,1).getValue(), 0, 0]
      flier = flier.offset(1,0)
    }
  
  }
  console.log(employees)
  return employees
}

/*
traverses the "Cases" sheet and collects all initials defined in the "getEmployeeInitials" function
returns a completed dictionary related to all specified employees in the format described in "getEmployeeInitials"
*/
const addCases = (inSheet) => {
  console.log('Gathering employee names and initials')
  let employees = getEmployeeInitials();
  let casesSheet = SpreadsheetApp.openById(links.cases).getSheetByName(inSheet)
  let flier = casesSheet.getRange("A2")
/**
 * Iterate across row 2, the title row
 * two switches: Splints and Recon decide which number will be added to in employee:
 * {initial: [name, splint, recon]}
 *                    ^       ^
 */
  while (flier.getColumn() < 16) {
    if (flier.getValue() == "splint") {
      let initial_scraper = flier
      while (initial_scraper.getValue().length >= 1) {
        if (initial_scraper.offset(0,2).getValue() in employees) {
          employees[initial_scraper.offset(0,2).getValue()][1] = employees[initial_scraper.offset(0,2).getValue()][1] + 1
        }
        initial_scraper = initial_scraper.offset(1,0)
      } 
    }
    if (flier.getValue() == "recon") {
      let initial_scraper = flier
      while (initial_scraper.getValue().length >= 1) {
        if (initial_scraper.offset(0, 2).getValue() in employees) {
          console.log('in the addition')
          employees[initial_scraper.offset(0,2).getValue()][2] = employees[initial_scraper.offset(0,2).getValue()][2] + 1 
          
        }
        initial_scraper = initial_scraper.offset(1,0)
      }
    }
    flier = flier.offset(0,1)
    }
  Object.entries(employees).map(([key, value]) => {
    console.log(`employee here${key}: ${value}`);
  })
  return employees
}

/**
 * this is a rough function to run the above commands and then print them into a sheet for extraction by meeee
 */
const saveNumbers = (inSheet) => {
  console.log('Running addCases...')
  const employees = addCases(inSheet)
  const keys = Object.keys(employees)
  let emplSheet = SpreadsheetApp.openById(links.myResources)
  let ranger = emplSheet.getRange("A2")
  console.log('entering document of added cases')
  while (ranger.getValue().length >= 1) {
    if (keys.includes(ranger.getValue())) {
      ranger.offset(0, 2).setValue(employees[ranger.getValue()][1]) 
      ranger.offset(0, 3).setValue(employees[ranger.getValue()][2]) 
    }
    ranger = ranger.offset(1, 0)
  }
  //set the date of the data pulled
  let get_date = SpreadsheetApp.openById(links.cases).getSheetByName("Cases").getRange("N1").getValue()
  console.log(get_date)
  emplSheet.getRange("F1").setValue(get_date)
}
/*
  * exportable main run 
  */
function runSaveNumbersMain() {
  console.log('Calling saveNumbers...')
  saveNumbers("Cases")
}

