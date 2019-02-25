/** Run Whole Test File
 *  ----------------------  *
 * 1. cd ./testcases/LoginsTests   *
 * 2. mocha login-lockout.spec -t 150000   *
 */

/** NPM Modules **/
// Chai
const { assert, expect, should } = require('chai');
// Decache - [DOCS]: https://www.npmjs.com/package/decache
const decache = require('decache');
// WebDriver
const { describe, it, after, before } = require('selenium-webdriver/testing');

// Base Url
// const baseUrl = 'https://connectdev';
const baseUrl = 'https://connectdev/';

/**  DECLARE TEST PAGES  **/
let Page = require('../Pages/login_page');


/**** LOG-IN LockOut Test ****/
describe('LogIn Tests', () => {
  let page = null;

  before(() => {
    page = new Page();
    page.visit(`${baseUrl}/login`);
  });

  after(() => {
    page.quit();
    decache(Page);
  });

  // Max Attempts (see config > config.ISD43160): 3 
  describe('Forgot Password', () => {
    // User Account LOCK-OUT due to TOO MANY Incorrect LogIn attemps
    it('should lock user from login after 3 FAILED login attempts', () => {
      // let expectedErrorMsg = 'This account has been locked out due to too many failed login attempts.';
      let expectedErrorMsg = 'This account has been locked out';
      // let attempts = 0,
      let errorMsg = '';

      for (let i=0; i < 3; i++) {
        // First and Second LogIn Attempt
        if (i !== 2) {
          page.invalidLogIn();
        } else {
          // Third LogIn Attempt
          page.invalidLogIn().getText()
          .then(err => {
            expect(err).to.include(expectedErrorMsg);
          });
        }
      } // end of for-loop

    });
    
    it(`should log in user after user waits a certain amount of time 
      and logs in with correct credentials`, () => { 
      let expectedTitle = 'Connect - Home';  
    
      setTimeout(()=> {
        page.logIn().click();
        page.waitUntil('Connect - Home', 'titleIs');
        // check that Home Page has Title Tab of 'Connect - Home'
        page.getTitleTab().then(title => expect(title).to.equal(expectedTitle));
      }, 1000);
    });

  });
}); // end of Log-Out Tests