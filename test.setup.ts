// @ts-nocheck
import { Before, BeforeAll, AfterAll, After } from "@cucumber/cucumber";
import { devices, chromium } from "playwright";
import { OurWorld } from "./types";
BeforeAll(async function () {
  // Browsers are expensive in Playwright so only create 1
  global.browser = await chromium.launch({
    // Not headless so we can watch test runs
    headless: false,
    // Slow so we can see things happening
    slowMo: 50
  });


});
AfterAll(async function () {
  await global.browser.close();
});
// Create a new test context and page per scenario
Before(async function (this: OurWorld) {
  const ipad = devices["iPad Mini landscape"];
  this.context = await global.browser
  .newContext({
    viewport: {width:1024,height:768},
    userAgent: ipad.userAgent,
  });
  await this.context.tracing.start({ screenshots: true, snapshots: true });
  this.page = await this.context.newPage();
});
// Cleanup after each scenario
// After(async function (this: OurWorld) {
//   await this.context.tracing.stop({path:`trace/${this.parameters.}trace.zip`});
//   await this.page.close();
//   await this.context.close();
// });

After(async function (testCase,this: OurWorld) {
  //console.log(testCase);
  console.log(testCase.gherkinDocument.feature.name);
  console.log(testCase.pickle.name);
  await this.context.tracing.stop({path:`trace/${testCase.gherkinDocument.feature.name}_${getStringValue(testCase.pickle.name).replace(/[\n\r]+|[\s]{1,}/g, "-").trim()}_trace.zip`});
  if (testCase.result.status == 'FAILED') {
    var stream = await this.page.screenshot();
    this.attach(stream, 'image/png');
  }
  await this.page.close();
  await this.context.close();
});


function getStringValue(value: any): string {
  return value.toString();
}