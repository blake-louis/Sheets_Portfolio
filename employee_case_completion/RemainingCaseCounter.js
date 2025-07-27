const countRemaining = () => {
  const qaSheet = SpreadsheetApp.openById(links.test).getSheetByName('Cases')
  //console.log(`sheetname: ${qaSheet.getName()}`)
  let splintCount = 0;
  let reconCount = 0;
  let columnFlier = qaSheet.getRange('B2')
  const columnOptions = ['splint', 'recon']

  while (columnOptions.includes(columnFlier.getValue())) {
    console.log(`flier: ${columnFlier.getValue()}`)
    if (columnFlier.getValue() === columnOptions[0]) {
      let rowFlier = columnFlier.offset(1,0)
      //console.log(`initial columnFlier splint: ${columnFlier.getValue()}`)
      while (rowFlier.getValue().toString().length !== 0) {
        //console.log(`this case in splint: ${rowFlier.getValue()}`)
        if (rowFlier.getBackground() === colorPallet.regularCells) {
          //console.log('upping splintCount')
          splintCount += 1
        }
        //console.log('made the break')
        rowFlier = rowFlier.offset(1,0)

      }
      columnFlier = columnFlier.offset(0,4)
    } 

    if (columnFlier.getValue() === columnOptions[1]) {
      let rowFlier = columnFlier.offset(1,0)
      console.log(`initial columnFlier recon: ${columnFlier.getValue()}`)
      while (rowFlier.getValue().toString().length !== 0) {
        console.log(`this case in recon: ${rowFlier.getValue()}`)
        if (rowFlier.getBackground() === colorPallet.regularCells || rowFlier.getBackground() === colorPallet.colorWhite) {
          console.log('upping reconCount')
          reconCount += 1
        }
        rowFlier = rowFlier.offset(1,0)
      }
    }
    columnFlier = columnFlier.offset(0,4)
  }
  return [splintCount, reconCount]
}
  
