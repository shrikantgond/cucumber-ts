Feature: Appointment
  A random feature using some Playwright stuff
Scenario: Govuk accessibility statement link
  Given I view 'www.gov.uk'
  When I click 'Accessibility statement'
  Then I expect to be on the accessibility page

Scenario: Perform google search
  Given I view 'google.com'
  When I type 'Testing' into input
  And I click 'Google Search'
  Then I expect to be on the search page

  Scenario: Perform npm search
  Given I view 'www.npmjs.com/'
  When I type 'cucumber' in 'q'
  And I click 'Search'
  Then I expect to be on the search page

