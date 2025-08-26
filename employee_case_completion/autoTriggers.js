function onEdit(e) {
  const range = e.range;
  const sheet = range.getSheet();
  const newValue = e.value;
  const inits = [4, 8, 12, 16]
  if (inits.includes(range.getColumn())) {
    if (range.getValue().length > 0) {
      if (sheet.getName() == "Cases" || sheet.getName() == "Test") {
        // If there's a value, highlight it
        if (range.getValue().toString().toLowerCase() === "push") {
          range.offset(0,-2).setBackground(colorPallet.colorPurple).setFontColor(colorPallet.colorWhite)
          findSisterCell(range, range.offset(0,-2).getValue(), false, true)
        } else {
          range.offset(0,-2).setBackground(colorPallet.completedCase).setFontColor(colorPallet.colorBlack);
          console.log('should be entering')
          findSisterCell(range, range.offset(0,-2).getValue(), true, false)
        }
      }

    } 
    if (range.getValue().length === 0) {
      // If cleared, reset background
      range.offset(0, -2).setBackground(colorPallet.regularCells).setFontColor(colorPallet.colorBlack);
      console.log('about to call function')
      findSisterCell(range, range.offset(0,-2).getValue(), false, false)
    }
  }
  const caseInits = [2, 6, 10, 14]
  if (caseInits.includes(range.getColumn() && sheet.getName() === "Cases")) {
    range.setBackground(colorPallet.regularCells).setHorizontalAlignment('center')
    range.offset(0,2).setBorder(true, true, true, true, true, true)

  }
}
/**
 * finds the sister cell if any. 
 * ensures that the user is credited for recon if there is splint and recon, and blacks out the splint side
 */
const findSisterCell = (inRange, inCase, isComplete, isPushed) => {
  console.log('reached the function')
  console.log(`range: ${inRange.getColumn()} case: ${inCase} isComplete? ${isComplete.toString()}`)
  //user enters from splint side
  //user cannot redo a complete case from the splint side
  if (inRange.getColumn() == 4 || inRange.getColumn() == 8) {
    let caseFinder = inRange.getSheet().getRange("J3")
    while (caseFinder.getValue().length > 0) {
      if (caseFinder.getValue().trim() === inCase.trim()) {
        switch (isComplete) {
          case true:
            caseFinder.setBackground(colorPallet.completedCase)
            caseFinder.offset(0,2).setValue(inRange.getValue()) 
            inRange.setValue("").setBackground(colorPallet.colorBlack)
            return
        } 
        switch (isPushed) {
          case true:
            caseFinder.setBackground(colorPallet.colorPurple).setFontColor(colorPallet.colorWhite)
            caseFinder.offset(0,-2).setBackground(colorPallet.colorWhite)
        }            
      }
      caseFinder = caseFinder.offset(1,0)
    }
    caseFinder = inRange.getSheet().getRange("N3")
    while (caseFinder.getValue().length > 0) {
      if (caseFinder.getValue().trim() === inCase.trim()) {
        switch (isComplete) {
          case true:
            caseFinder.setBackground(colorPallet.completedCase)
            caseFinder.offset(0,2).setValue(inRange.getValue()) 
            inRange.setValue("").setBackground(colorPallet.colorBlack)
            return
        }
        switch (isPushed) {
          case true:
            caseFinder.setBackground(colorPallet.colorPurple).setFontColor(colorPallet.colorWhite)
            caseFinder.offset(0,-2).setBackground(colorPallet.colorWhite)
        }               
      }
      caseFinder = caseFinder.offset(1,0)
    }
  }

  //user enters from recon side
  if (inRange.getColumn() == 12 || inRange.getColumn() == 16) {
    let caseFinder = inRange.getSheet().getRange("B3")
    while(caseFinder.getValue().length > 0) {
      if (caseFinder.getValue().trim() === inCase.trim()) {
        switch(isComplete) {
          case true:
            console.log('reached true for case complete')
            caseFinder.setBackground(colorPallet.completedCase)
            caseFinder.offset(0,2).setValue("").setBackground(colorPallet.colorBlack)
            return
          case false:
            if (isPushed === true) {
              caseFinder.setBackground(colorPallet.colorPurple).setFontColor(colorPallet.colorWhite)
              return
            } else {
              console.log('reached false for case complete')
              inRange.offset(0,-2).setBackground(colorPallet.colorWhite).setFontColor(colorPallet.colorBlack)
              caseFinder.setBackground(colorPallet.colorWhite).setFontColor(colorPallet.colorBlack)
              caseFinder.offset(0,2).setBackground(colorPallet.colorWhite).setFontColor(colorPallet.colorBlack)
              return
            }
        }
      }
      caseFinder = caseFinder.offset(1,0)
    }
    caseFinder = inRange.getSheet().getRange("F3")
    while(caseFinder.getValue().length > 0) {
      if (caseFinder.getValue().trim() === inCase.trim()) {
        switch(isComplete) {
          case true:
            console.log('reached false for case complete')

            caseFinder.setBackground(colorPallet.completedCase)
            caseFinder.offset(0,2).setValue("").setBackground(colorPallet.colorBlack)
            return
          case false:
            if (isPushed === true) {
              caseFinder.setBackground(colorPallet.colorPurple).setFontColor(colorPallet.colorWhite)
              return
            } else {
              console.log('reached false for case complete')
              inRange.offset(0,-2).setBackground(colorPallet.colorWhite).setFontColor(colorPallet.colorBlack)
              caseFinder.setBackground(colorPallet.colorWhite).setFontColor(colorPallet.colorBlack)
              caseFinder.offset(0,2).setBackground(colorPallet.colorWhite).setFontColor(colorPallet.colorBlack)
              return
            }
        }
      }
      caseFinder = caseFinder.offset(1,0)
    }
  }
}






