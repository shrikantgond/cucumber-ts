// step-definitions/homepage.ts
import { Given, When, Then } from "@cucumber/cucumber";
import assert from "assert";
import { OurWorld } from "../types";


Given("I view {string}", async function (this: OurWorld, url: string) {
  await this.page.goto(`https://${url}`);
  // const buffer = await this.page.screenshot()
  // return this.attach(buffer, 'image/png');
});

// Using a regular expression
When(/^I click '([^']*)'$/, async function (this: OurWorld, text: string) {
  // Scroll to the link...
  // await this.page.$eval(`"${text}"`, (element) => {
  //   element.scrollIntoView();
  // });
  // ...then click it now it's within the viewport
  await this.page.click(`"${text}"`);
});

// Then(/^I type 'Testing' into input$/, function(callback) {
//   // Write code here that turns the phrase above into concrete actions
//   callback(null, 'pending');
// });

When(/^I type '([^']*)' into input$/, async function (this: OurWorld, text: string) {
  // Scroll to the link...
  await this.page.goto(`https://www.google.com/search?q=${text}`);
});
When(/^I type '([^']*)' in '([^']*)'$/, async function (this: OurWorld, text: string, ctrl:string) {
  // Scroll to the link...
  await this.page.fill(`input[name="${ctrl}"]`,text);
});

Then("I expect to be on the accessibility page", async function (
  this: OurWorld
) {
  const heading1Text = (await this.page.textContent("h1")) as string;
  assert.strictEqual(
    trimExcessWhiteSpace(heading1Text),
    "Accessibility statement"
  );
});

Then("I expect to be on the search page", async function (
  this: OurWorld
) {
  const pagetitleText = (await this.page.title()) as string;
  assert.notStrictEqual(
    trimExcessWhiteSpace(pagetitleText),
    "Accessibility statement"
  );
});


// textContent includes whitespace, so use this method to trim
// See https://stackoverflow.com/a/42921059
const trimExcessWhiteSpace = (s: string) =>
  s.replace(/[\n\r]+|[\s]{2,}/g, " ").trim();