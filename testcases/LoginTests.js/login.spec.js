/** Run Whole Test File
 *  ----------------------  *
 * 1. cd ./testcases/LoginsTests   *
 * 2. mocha login.spec -t 150000   *
 */

/** NPM Modules **/
// Chai
const { assert, expect, should } = require('chai');
// Decache - [DOCS]: https://www.npmjs.com/package/decache
const decache = require('decache');
// WebDriver
const { describe, it, after, before } = require('selenium-webdriver/testing');
const baseUrl = 'https://connectdev/';

/**  DECLARE TEST PAGES  **/
const Page = require('../Pages/login_page');
//user json
const { user, userBadLogIn } = require('../../testdata/users');

/**** LOG-IN Tests ****/
describe('LogIn Tests', () => {
  let page = null;

  before(() => {
    page = new Page();
    // page.visit(`${baseUrl}/login`);
  });

  after(() => {
    page.quit();
    decache(Page);
  });

  // Login Form Field takes in User Input Correctly
  describe('For the LogIn Form', () => {
    it('should have username field take-in what user typed', () => {
      // check if 'userName' input ===  'expected form input'
      page.fillLogInName()
        .getAttribute('value')
        .then(userName => expect(userName).to.equal(user.userName));
    });

    it('should have password field take-in what user typed', () => {
      // check if 'password' input ===  'expected form input'
      page.fillLogInPassword()
        .getAttribute('value')
        .then(password => expect(password).to.equal(user.password));
    });
  });

  describe('For A Correct LogIn', () => {
    // Correct LogIn Credentials
    it("should show Home Page title as 'Connect - Home' upon successful login", () => {
      let expectedTitle = 'Connect - Home';

      page.logIn().click();
      page.waitUntil(expectedTitle, 'titleIs');
      // check that Home Page has Title Tab of 'Connect - Home'
      page.getTitleTab().then(title => expect(title).to.equal(expectedTitle));
      page.logOut();
    });
  });

  /** MissType password **/
  describe('Forgot Password Workflow', () => {
    // Incorrect LogIn Credentials
    it('should prompt user LogIn credentials FAILED on first miss login', () => {
      let expectedErrorMsg = 'Invalid username or password.';
      // Get Back to Login Page
      page.visitLogIn();
      // Enter a Bad Login
      page.invalidLogIn()
        .getText()
        .then(errorMsg => expect(errorMsg).to.include(expectedErrorMsg));
    }); // end of 'it'

    // user decides to create a new password after forgetting password
    it('should prompt user to check email with following message', () => {
      let expectedErr = 'Password Reset Email Sent';

      page.forgotPassword()
        .getText()
        .then(msg => expect(msg).to.include(expectedErr));
    });
  });
}); // end of LogIn Tests
