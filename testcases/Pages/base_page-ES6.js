/**
 *  OFFICIAL SELENIUM-WEBDRIVER GITHUB PAGE
 * ------------------------------------------------
 *    link: https://github.com/SeleniumHQ/selenium
 *    WIP Docs: https://seleniumhq.github.io/docs/
 * **/

/**
 * WebDriver API Config
 *  **/
require('chromedriver');
require('geckodriver');
const webdriver = require('selenium-webdriver');
const { Builder, By, Key, until, wait, alert } = require('selenium-webdriver');
class Page {
  constructor() {
    this.driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
  };

  /** 
   * Basic Page and Find Element (s) Methods
   *  **/
  // visit a particular URL page
  visit(url) {
    return this.driver.get(url);   
  }
  // close browser window
  quit() {
    return this.driver.quit();
  }

  // DropDown Menu Select
  selectOption(el, type) {
    this.find(el, type).click();
  }

  // Browser Title Tab
  getTitleTab(title) {
    return this.driver.getTitle();
  }
  // Wait Until an 'element' of 'type' exists upon (ms) time
  waitUntil(el, type) {
    if (type === 'titleIs') {
      return this.driver.wait(until.titleIs(el));  
    } else if (type === 'id') {
      return this.driver.wait(until.elementLocated(By.id(el), 7000));
    } else if (type === 'xpath') {
      return this.driver.wait(until.elementLocated(By.xpath(el), 7000));
    } else if (type === 'tagName') {
      return this.driver.wait(until.elementLocated(By.tagName(el), 7000));
    } else if (type === 'css') {
      return this.driver.wait(until.elementLocated(By.css(el), 7000));
    } else {
      return this.driver.wait(until.elementLocated(By.className(el), 7000));
    }
  }
  // Find the FIRST element of specified 'type'
  find(el, type) {
    // this.waitUntil(el, type);
    if (type === 'linkText') {
      return this.driver.findElement(By.linkText(el)).click();
    } else if (type === 'partialLinkText') {
      return this.driver.findElement(By.partialLinkText(el)).click();
    } else if (type === 'name') {
      return this.driver.findElement(By.name(el));
    } else if (type === 'id') {
      return this.driver.findElement(By.id(el));
    } else if (type === 'xpath') {
      return this.driver.findElement(By.xpath(el));
    } else if (type === 'tagName') {
      return this.driver.findElement(By.tagName(el));
    } else if (type === 'css') {
      return this.driver.findElement(By.css(el));
    } else {
      return this.driver.findElement(By.className(el));
    }
  }
  /** Find All Elements of specified 'type' - ex: 'className' **/
  findAll(el,type) {
    if (type === 'tagName') {
      return this.driver.findElements(By.tagName(el));
    }
    return this.driver.findElements(By.className(el));
  }

  /** 
   * Form Methods
   *  **/
  writeForm(el, type, txt) {
    // let driver = this.driver;
    this.find(el, type).sendKeys(txt);
  }
  clearField(el, type) {
    this.find(el, type).clear();
  }

  /** 
   * MODAL METHODS 
   * **/

  // in (ms)
  sleep(time) {
    this.driver.sleep(time);
  }
  
  openModal() {
    this.driver.switchTo().activeElement();
    this.driver.sleep(1000);
  }
  
  closeModal(el, type) {
    this.find(el, type).click();
    this.sleep(1000);
  }

}  // end of 'PAGE' class

module.exports = Page;