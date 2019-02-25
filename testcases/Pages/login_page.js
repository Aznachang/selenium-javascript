let Base_Page = require('./base_page-ES6');

// User JSON Data
const { user, userBadLogIn,
  disabledUser,
  invalidUsernameLogin, invalidPasswordLogin
} = require('../../testdata/users');

// const baseUrl = 'https://connectdev';
const baseUrl = 'https://connectdev/';

class Login extends Base_Page {
  constructor() {
    super();
  }
    /** 
   * METHODS
   *  **/
  visitLogIn() {
    this.visit(`${baseUrl}/login`);
  }
  
  logOutGoToLogIn() {
    // log out
    this.logOut();
    // Go to Home Page
    this.find('body > div.top-bar > a', 'css').click();
    // go to LogIn Page
    this.visitLogIn();
  }

  fillLogInName() {
    this.visit(`${baseUrl}/login`);
    this.writeForm('username', 'name', user.userName);

    return this.find('username', 'name')
  }

  fillLogInPassword() {
    this.visit(`${baseUrl}/login`);
    this.writeForm('password', 'name', user.password);

    return this.find('password', 'name');
  }

  logIn() {
    this.visit(`${baseUrl}/login`);

    // (element, By.type, txtFormField)
    this.writeForm('username','name', user.userName);
    this.writeForm('password','name', user.password);
  
    return this.find('loginsubmit', 'id');
  }

  logOut() {
    // Open up dropdown menu
    this.find("//*[@id='navbarDropdownMenuLink']", 'xpath').click();
    // Click on 'LogOut' menu option
    let logOutPath = '//*[@id="navbar2"]/ul[2]/li[4]/div/a[3]';
    this.find(logOutPath, 'xpath').click();
    this.waitUntil('Connect - Logged Out', 'titleIs');
    
  }

  invalidUsername() {
    // (element, By.type, txtFormField)
    this.writeForm('username','name', invalidUsernameLogin.userName);
    this.writeForm('password', 'name', invalidUsernameLogin.password);
    this.find('loginsubmit', 'id').click(); 

    this.waitUntil('inputError', 'id'); // (el, type);
  }

  invalidPassword() {
    // (element, By.type, txtFormField)
    this.writeForm('username','name', invalidPasswordLogin.userName);
    this.writeForm('password', 'name', invalidPasswordLogin.password);
    this.find('loginsubmit', 'id').click(); 

    this.waitUntil('inputError', 'id'); // (el, type);
  }
  
  // logIn error msg
  invalidLogIn() {
    // (element, By.type, txtFormField)
    this.writeForm('username','name', userBadLogIn.userName);
    this.writeForm('password', 'name', userBadLogIn.password);
    this.find('loginsubmit', 'id').click(); 
  
    this.waitUntil('inputError', 'id'); // (el, type);  
    // gives Bootstrap error message txt 'alert'
    return this.find('inputError', 'id');
  }

  // disabled account - error msg
  disabledLogIn() {
    this.visit(`${baseUrl}/login`);
  
    // (element, By.type, txtFormField)
    this.writeForm('username','name', disabledUser.userName);
    this.writeForm('password', 'name', disabledUser.password);
    this.find('loginsubmit', 'id').click(); 
  
    this.waitUntil('inputError', 'id'); // (el, type);  
    // gives Bootstrap error message txt 'alert'
    return this.find('inputError', 'id');
  }
  
  forgotPassword() {
    const path = '//*[@id="login-form"]/div[2]/div/p/a';
    this.find(path, 'xpath').click();

    this.writeForm('username','name', user.userName);
    this.find('btn-primary', 'className').click();
    this.waitUntil('portal-card', 'className');
    return this.find('portal-card', 'className');
  }
  // labelById - string
  loginErrorLabel(labelById) {
    return this.find(labelById,'id');
  }

  emptyLogin() {
    // click on submit right away
    // this.visit(`${baseUrl}/login`);
    this.waitUntil('loginsubmit', 'id');
    this.find('loginsubmit', 'id').click(); 
    // this.sleep(1000); // give time for errorlabels to update
  }
}

module.exports = Login;
