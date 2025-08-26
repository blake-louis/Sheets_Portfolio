const testGett = () => {
  const summary = SpreadsheetApp.openById(links.shippingTodaySummary).getSheetByName("Shipping Today")
  console.log(summary.getRange("B8").getValue())
}
