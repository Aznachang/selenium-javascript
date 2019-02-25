/** Run Whole Test File
 *  ----------------------  *
 * 1. cd ./testcases        *
 * 2. mocha home-earnings.spec -t 150000   *
 */

/** NPM Modules **/
// Chai
const { assert, expect, should } = require('chai');
// Decache - [DOCS]: https://www.npmjs.com/package/decache
const decache = require('decache');
// WebDriver
const { describe, it, after, before } = require('selenium-webdriver/testing');

const { firstEarnings } = require('../testdata/earnings');

// Base Url
// const baseUrl = 'https://connectdev';
const baseUrl = 'https://connectdev/';
const basePDFUrl = `${baseUrl}/earnings/getpdf`;

/**  DECLARE TEST PAGES  **/
let Page = require('./Pages/earnings_page');

/**** Earnings Tests ****/
describe('Earnings Tests', () => {
  let page = null;
  let directDeposit,
    payPeriod;

  // LogIn Before a Test
  before(() => {
    page = new Page();
    page.logIn().click();
  });

  after(() => {
    page.quit();
    decache(Page);
  });

  describe('Navigating to Earnings Table', () => {

    it('should LogIn, then click on Earnings Nav-Link, then Earnings Table Shows Up', () => {
      // Issue Date Path on 1st Earnings Table row - 05-535594
      let payPeriodPath = firstEarnings;

      page.find(payPeriodPath, 'xpath')
        .getText()
        .then(paid => {
          payPeriod = paid
        });
      
      // Direct Deposit - getId of 'first' home-earnings row
      page.find('detail-btn', 'className')
        .getAttribute('id')
        .then(depositId => {
          directDeposit = depositId;
          // regExp to see if deposit id matches ##-######
          expect(depositId).to.match(/^\d{2}-\d{6}/);
        });
    });

    it('should pop up FIRST clicked-on record on dynamic Earnings Table', () => {
      // let modalTitle = 'Earnings Statement Detail';
      payPeriod = '01/19';

      page.find('detail-btn', 'className').click();
      page.displayEarningsDetail()
        .getText()
        .then(actualPayPeriod => expect(actualPayPeriod).to.equal(payPeriod));
    });

    it(`should show Earnings Statement Detail with 
    matching Pay Period Date and Direct Dep # for first record row clicked`, () => {
      // Pay Period Path - Earnings Statement Detail Modal
      let path = '//*[@id="earnings-detail"]/div/div/table[1]/tbody/tr[1]/td[4]';
      page.waitUntil(path, 'xpath');  

      /** Test Case for Matching Pay Period Date **/
      page.find(path, 'xpath')
        .getText()
        .then(actualPayPeriod => expect(payPeriod).to.equal(actualPayPeriod));
      
      // CHECK FOR MATCHING Direct Deposit
      let directDepPath = '//*[@id="earnings-detail"]/div/div/table[1]/tbody/tr[1]/td[6]';
      page.waitUntil(directDepPath, 'xpath');

      /** Test Case for Matching Direct Deposit # between Earnings Table and Modal **/
      page.find(directDepPath, 'xpath')
        .getText()
        .then(actualDirectDeposit => expect(actualDirectDeposit).to.equal(directDeposit));
    });

    /** Navigate to Deductions Chart **/
    it.skip('should show the Deductions Chart upon hitting the link', () => {
      let expectedChart = 'Deductions Chart';
      page.displayDeductionsChart();

      // wait until Header Chart Title and Pie Chart load
      page.waitUntil('earningsChart', 'id');
      page.waitUntil('h5', 'tagName');

      // Test Case to see if header titles match for Chart Deductions Modal
      page.find()
        .getText()
        .then(chartTitle => {
          expect(chartTitle).to.equal(expectedChart);
          page.closeChartModal();
        });
    });

    /** Display Specific Earnings Month PDF **/
    it(`should show the Detailed Earnings Statement and PDF with matching Direct-Deposit number`, () => {

      page.displayHomeEarningsPDF()
        .getAttribute('src')
        .then(depositNum => expect(depositNum).to.include(directDeposit));
    });
  }); // end of inner describe()

  describe('Closing Earnings Modals', () => {
    it('should close the Earnings PDF Viewer Modal upon hitting X button', () => {
      let modalTitle = 'Earnings Statement Detail';

      page.closeModal('mfp-close', 'className');

      // allow PDF Modal to close first
      page.waitUntil('modal-title', 'className');
      let path = '//*[@id="ModalEarningsDetail"]/div/div/div[1]/div/div/span[2]/h5';
      page.waitUntil(path, 'xpath');

      page.find(path, 'xpath')
        .getText()
        .then(actualModalTitle => expect(actualModalTitle).to.equal(modalTitle));
    });

    it('should close Earnings Detailed Modal and show regular Earnings Page with table', () => {
      
      // page.closeEarningsDetailModal();
      page.visit(baseUrl);
      // let path = '/html/body/div[4]/div/div[1]/div/h2/'
      page.waitUntil('h2', 'tagName');

      let headerTitle = page.find('h2', 'tagName');
      headerTitle.getText()
        .then(actualHeader => expect(actualHeader).to.include('Earnings Summary'));
    });
  }); // end of inner describe()

});
