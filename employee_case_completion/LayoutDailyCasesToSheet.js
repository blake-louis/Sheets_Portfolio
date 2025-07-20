const layoutCases = (inCasesDict) => {
  const destSheet = SpreadsheetApp.openById(links.cases).getSheetByName("Cases")

  console.log(inCasesDict)
  const spLength = inCasesDict['splint'].length
  const reLength = inCasesDict['recon'].length
  
  let domin
  if (spLength >= reLength) {
    domin = inCasesDict['splint']
  } else {
    domin = inCasesDict['recon']
  }
  const split = Math.ceil(domin.length/2)
  const columnStartPoints = {'splint': ["B2", "F2"], 'recon': ["J2", "N2"]}
  
  /**
   * actually lays out the entire sheet
   */
  for (const materialType in columnStartPoints) {
    console.log(`start: ${columnStartPoints[materialType][0]}`)
    let flier = destSheet.getRange(columnStartPoints[materialType][0])
    console.log(materialType)
    destSheet.setColumnWidth(flier.getColumn(), 130)
    destSheet.setColumnWidth(flier.offset(0,-1).getColumn(), 35)

    flier.setValue(materialType).setFontColor(colorPallet.colorWhite).setBackground(colorPallet.headers).setHorizontalAlignment("center").setFontWeight("bold").setFontSize(24)
    destSheet.setColumnWidth(flier.offset(0,1).getColumn(),65)  
    flier.offset(0,1).setValue('Notes').setFontColor(colorPallet.colorWhite).setBackground(colorPallet.headers).setHorizontalAlignment("center").setFontWeight("bold")
    destSheet.setColumnWidth(flier.offset(0,1).getColumn(), 40) 
    flier.offset(0,2).setValue("Init").setFontColor(colorPallet.colorWhite).setBackground(colorPallet.headers).setHorizontalAlignment("center")

    flier = destSheet.getRange(columnStartPoints[materialType][1])

    destSheet.setColumnWidth(flier.getColumn(), 130)
    destSheet.setColumnWidth(flier.offset(0,-1).getColumn(), 35)
    flier.setValue(materialType).setFontColor(colorPallet.colorWhite).setBackground(colorPallet.headers).setHorizontalAlignment("center").setFontWeight("bold").setFontSize(24)
    destSheet.setColumnWidth(flier.offset(0,1).getColumn(),65)  
    flier.offset(0,1).setValue('Notes').setFontColor(colorPallet.colorWhite).setBackground(colorPallet.headers).setHorizontalAlignment("center").setFontWeight("bold")
    destSheet.setColumnWidth(flier.offset(0,1).getColumn(), 40) 
    flier.offset(0,2).setValue("Init").setFontColor(colorPallet.colorWhite).setBackground(colorPallet.headers).setHorizontalAlignment("center")

    destSheet.getRange("N1").setValue(new Date())
    
    //let the fun begin loading up the days cases w/ formatting
    let flierCounter = 1
    flier = destSheet.getRange(columnStartPoints[materialType][0])
    for (const ipsCase of inCasesDict[materialType].slice(0, split)) {
      flier = flier.offset(1,0)
      flier.setValue(ipsCase).setFontColor(colorPallet.colorBlack).setHorizontalAlignment("center").setFontSize(12)
      if (inCasesDict['duplicates'].includes(ipsCase.toString().trim())) {
        flier.setBackground(colorPallet.colorWhite)
        console.log(`ips case dup: ${ipsCase}`)
      } else {
        flier.setBackground(colorPallet.regularCells)
      }
      flier.offset(0,-1).setValue(flierCounter).setHorizontalAlignment("center")
      if (ipsCase in caseNotes) {
        flier.offset(0,1).setValue(caseNotes[ipsCase])
      }
      flier.offset(0,2).setBorder(true,true,true,true,false,false)
      flierCounter ++
    }
    flier = destSheet.getRange(columnStartPoints[materialType][1])
    for (const ipsCase of inCasesDict[materialType].slice(split)) {
      flier = flier.offset(1,0)
      flier.setValue(ipsCase).setFontColor(colorPallet.colorBlack).setHorizontalAlignment("center").setFontSize(12)
      if (inCasesDict['duplicates'].includes(ipsCase.toString().trim())) {
        flier.setBackground(colorPallet.colorWhite)
      } else {
        flier.setBackground(colorPallet.regularCells)
      }
      flier.offset(0, -1).setValue(flierCounter).setHorizontalAlignment("center")
      if (ipsCase in caseNotes) {
        flier.offset(0,1).setValue(caseNotes[ipsCase])
        delete(caseNotes[ipsCase])
      }
      flier.offset(0,2).setBorder(true,true,true,true,false,false)
      flierCounter ++
    }

  }
}















