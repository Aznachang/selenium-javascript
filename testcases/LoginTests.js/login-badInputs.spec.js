/** Run Whole Test File
 *  ----------------------  *
 * 1. cd ./testcases        *
 * 2. mocha cd ./testcases/LoginsTests   *
 */

/** NPM Modules **/
// Chai
const { assert, expect, should } = require('chai');
// Decache - [DOCS]: https://www.npmjs.com/package/decache
const decache = require('decache');
// WebDriver
const { describe, it, after, before } = require('selenium-webdriver/testing');

/**  DECLARE TEST PAGES  **/
const Page = require('../Pages/login_page');
// JSON files
const { emails } = require('../../testdata/email');
const { users, badUserName, userBadLogIn } = require('../../testdata/users');
const { blankUsername, blankPassword, emailEntered, invalidLogin } = require('../../testdata/errorLabelMsgs');

// baseUrl
const baseUrl = 'https://connectdev/';

/**** LOG-IN Tests ****/
describe('Login Front-End Validation Tests', () => {
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
  describe('Empty Login Form Submit', () => {
    it('should prompt user to type in a username and a password', () => {
      page.visit(`${baseUrl}/login`);
      page.emptyLogin();
      // empty Username Input
      page.loginErrorLabel('invalid-username')
        .getText()
        .then(errorLabel => expect(errorLabel).to.equal(blankUsername));
      
      // empty Password Input
      page.loginErrorLabel('invalid-password')
        .getText()
        .then(errorLabel => expect(errorLabel).to.equal(blankPassword));
    });
  });

  // Login Form Field takes in User Input Correctly
  describe('For the Emails in Username Input - Login Form', () => {
    /** Email and Blank Password */
    it('should prompt user to type in username instead of email address', () => {
      page.writeForm('username','name', emails.goodEmail); // UserName Field
      // An 'Email Type - @' Entered into Username Input
      page.loginErrorLabel('invalid-username')
      .getText()
      .then(errorLabel => expect(errorLabel).to.include(emailEntered));
      page.clearField('username','name'); // Clear out the Username field

      // empty Password Input
      page.loginErrorLabel('invalid-password')
      .getText()
      .then(errorLabel => expect(errorLabel).to.equal(blankPassword));
    });
    /** Email and Bad Password */
    it('should not allow login via email and bad password', () => {
      page.clearField('username','name');
      page.writeForm('username','name', emails.goodEmail);
      page.writeForm('password', 'name', userBadLogIn.password);
      // click on submit
      page.find('loginsubmit', 'id').click(); 

       // An 'Email Type - @' Entered into Username Input
       page.loginErrorLabel('invalid-username')
       .getText()
       .then(errorLabel => expect(errorLabel).to.include(emailEntered));

       // empty Password Input
       page.loginErrorLabel('invalid-password')
       .getText()
       .then(errorLabel => expect(errorLabel).to.equal(''));
    });
  });

  describe('Bad Inputs for UserName and Password', () => {
     /** Bad UserName Bad Password */
     it('should not allow login via bad username and bad password', () => {
      page.clearField('username','name');
      page.writeForm('username','name', badUserName);

      page.clearField('password','name');
      page.writeForm('password','name', userBadLogIn.password);
      // click on submit
      page.find('loginsubmit', 'id').click(); 

      // waitUntil Server-Response HTML Response Pops Up
      page.waitUntil('inputError', 'id');

       // Server-Side Error Msg Response
       page.loginErrorLabel('inputError')
       .getText()
       .then(errorLabel => expect(errorLabel).to.include(invalidLogin));
    });
     /** Good UserName Bad Password */
     it('should not allow login via valid username and bad password', () => {
      const {userName, password } = userBadLogIn;

      // username
      page.clearField('username','name');
      page.writeForm('username','name', userName);
      // password
      page.clearField('username','name');
      page.writeForm('password','name', password);

      // click on submit
      page.find('loginsubmit', 'id').click(); 

       // Server-Side Error Msg Response
       page.loginErrorLabel('inputError')
       .getText()
       .then(errorLabel => expect(errorLabel).to.include(invalidLogin));
    });
  });

  // Login Form Field takes in User Input Correctly
  describe('User Finally Enters in Credentials with Username', () => {
    it('should login the user to home page for finally good login', () => {
      let expectedTitle = 'Connect - Home';

      page.clearField('username','name'); // Clear out the Username field
      page.logIn().click();
      page.waitUntil(expectedTitle, 'titleIs');
      // check that Home Page has Title Tab of 'Connect - Home'
      page.getTitleTab().then(title => expect(title).to.equal(expectedTitle));
    });
  });

}); // end of LogIn Tests
