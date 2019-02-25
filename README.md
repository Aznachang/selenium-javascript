# stress-test
## Development Config
simply type into VS Code Project Terminal: 
```
npm i
OR
npm install
```

## Helpful Links to Testing Tools Used
-------------
Chai API Reference [link](http://www.chaijs.com/api/bdd/)

ChromeDriver - WebDriver for Chrome Browser [link](https://sites.google.com/a/chromium.org/chromedriver/downloads_)

Selenium-WebDriver [link](https://seleniumhq.github.io/selenium/docs/api/javascript/index.html)

Simple Tutorial on Selenium Webdriver with Mocha [link](https://blog.testproject.io/2017/06/07/javascript-testing-with-selenium-webdriver-mocha/)

Mocha Official Docs [link](https://mochajs.org/#asynchronous-code)

## Running Selenium Tests with Mocha and Chai
Type the following Root Project Terminal in ORDER:
```
Example
1. cd ./testcases
2. mocha registration.spec -t 150000

Login Tests
1. cd ./testcases/LoginTests
2. mocha login-badInputs.spec -t 150000

```
Should run Tests for LogIn, Forgotten Password, Incorrect Logins, W2, Earnings, PayRoll Calendar, LogIn-LockOut, and Registration Workflow. The last testcase for Registration.spec registers 10 users that points to the same sco email address.

