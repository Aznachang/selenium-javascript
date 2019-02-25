/** Run Whole Test File
 *  ----------------------  *
 * 1. cd ./testcases/LoginsTests   *
 * 2. mocha login-disabled.spec -t 150000   *
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

//user json - use the 'disabledUser'
let user = require('../../testdata/users');

/**** LOG-IN LockOut Test ****/
describe('Disabled Account - Login Test', () => {
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
  describe('For a Disabled User Account', () => {
    // User Account LOCK-OUT due to TOO MANY Incorrect LogIn attemps
    it('should prompt user, this his or her account has been disabled', () => {
      // let expectedErrorMsg = 'This account has been locked out due to too many failed login attempts.';
      let expectedErrorMsg = 'This account is currently disabled.';

      page.disabledLogIn().getText()
      .then(errorMsg => {
        expect(errorMsg).to.equal(expectedErrorMsg);
      });
    });
  });  
}); // end of LogIn-Disabled Tests