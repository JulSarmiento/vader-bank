/**
 * This class was built with singleton pattern because the global const was returning null.
 */
class DomFactory{
  static _BALANACE;
  static _TRANSACTIONS;
  static _USER_NAME;
  static _USER_LIST;
  static _LOGGED_PANEL;
  static _SIGNIN_FORM;
  static _lOGIN_FORM;
  static _TRANSFER_FORM;
  static _DELETE_FORM;

  static getUsersList() {
    if (!DomFactory._USER_LIST) {
      DomFactory._USER_LIST =  document.getElementById('users-list');
    }

    return DomFactory._USER_LIST;
  }

  static getTransactions() {
    if (!DomFactory._TRANSACTIONS) {
      DomFactory._TRANSACTIONS =  document.getElementById('transactions');
    }

    return DomFactory._TRANSACTIONS;
  }

  static getUsername() {
    if (!DomFactory._USER_NAME) {
      DomFactory._USER_NAME =  document.getElementById('user-name');
    }

    return DomFactory._USER_NAME;
  }

  static getBalance() {
    if (!DomFactory._BALANACE) {
      DomFactory._BALANACE =  document.getElementById('balance');
    }

    return DomFactory._BALANACE;
  }

  static getLoggedPanel() {
    if (!DomFactory._LOGGED_PANEL) {
      DomFactory._LOGGED_PANEL =  document.getElementById('logged-panel');
    }

    return DomFactory._LOGGED_PANEL;
  }

  static getSigninForm() {
    if (!DomFactory._SIGNIN_FORM) {
      DomFactory._SIGNIN_FORM =  document.getElementById('signin-form');
    }

    return DomFactory._SIGNIN_FORM;
  }

  static getLoginForm() {
    if (!DomFactory._lOGIN_FORM) {
      DomFactory._lOGIN_FORM =  document.getElementById('login-form');
    }

    return DomFactory._lOGIN_FORM;
  }

  static getTransferForm(){
    if (!DomFactory._TRANSFER_FORM) {
      DomFactory._TRANSFER_FORM =  document.getElementById('transfer-form');
    }

    return DomFactory._TRANSFER_FORM;
  }

  static getDeleteForm(){
    if (!DomFactory._DELETE_FORM) {
      DomFactory._DELETE_FORM =  document.getElementById('delete-user-form');
    }

    return DomFactory._DELETE_FORM;
  }

}

/**
 * This envent
 */
window.addEventListener('load', () => {
  // buttons
  const signInBtn = document.getElementById('signin');
  const logInBtn = document.getElementById('login');
  const logOutBtn = document.getElementById('logout');
  const deleteBtn = document.getElementById('delete');
  const transferBtn = document.getElementById('transfer');

  // Getting data from the local storage
  const dataStored = localStorage.getItem('Users');
  const dataCurrentUser = localStorage.getItem('Current-User');

  if(dataStored){
    UserFactory.users = JSON.parse(dataStored);
    UserFactory.users.forEach((user) =>{
      console.log(user)
    })
  }

  if(dataCurrentUser){
    UserFactory.currentUser = JSON.parse(dataCurrentUser);
  }

  /**
   * Event button on click
   * @fires toggle
   */
  signInBtn.addEventListener('click', () => {
    DomFactory.getSigninForm().classList.toggle('hide');
  });

  /**
   * Event button on click
   * @fires toggle
   */
  logInBtn.addEventListener('click', () => {
    DomFactory.getLoginForm().classList.toggle('hide');
  });

  /**
   * Event button on click
   * @fires logOut
   */
  logOutBtn.addEventListener('click', AuthFactory.logOut);

  /**
   * Event button on click
   * @fires toggle
   */
  deleteBtn.addEventListener('click', () => {
    DomFactory.getDeleteForm().classList.toggle('hide');
  } );

  /**
   * Event button on click
   * @fires toggle
   */
  transferBtn.addEventListener('click', () => {
    DomFactory.getTransferForm().classList.toggle('hide');
  });

  /**
   * Login event get the form data for login: user's dni and password. 
   * 
   * @fires login
   */
  DomFactory.getLoginForm().addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const dniNumber = data.get('dni-number-login');
    const password = data.get('password-login');

    AuthFactory.login(dniNumber, password); 
  })

  /**
   * This event get the input's values in the signin's form.
   * 
   * @fires addNewUser
  */
  DomFactory.getSigninForm().addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const fullName = data.get('full-name');
    const age = data.get('age');
    const email = data.get('email');
    const dniNumber = data.get('dni-number');
    const password = data.get('password');
    const rePassword = data.get('re-password')

    UserFactory.addNewUser(fullName, age, email, dniNumber, password, rePassword);
  })

  /**
   * This event get the input's values in the Tranfer's form.
   * 
   * @fires transaction
  */
  DomFactory.getTransferForm().addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const dniToTransfer = data.get('dni-number-to-transfer');
    const amountToTranfer = parseInt(data.get('amount-to-transfer'));

    transaction(dniToTransfer,amountToTranfer);
  })

  /**
   * This event get the input's values in the delete's form.
   * 
   * @fires deleteUser
  */
  DomFactory.getDeleteForm().addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const dniNumberToDelete =  data.get('dni-number-to-delete');

    UserFactory.deleteUser(dniNumberToDelete);

  })
})

// Money formater
const OPTION = {style : 'currency', currency: 'COP'}; 
const MONEY_FORMAT = new Intl.NumberFormat('es-CO', OPTION); 

/**
 * This function validates before call the transfer function in Transaction Class
 * @function transfer
 * 
 * @listens transferBtn
*/
 function transaction(dniToTransfer, amount){

    if(dniToTransfer == UserFactory.currentUser.dni){
      alert('No es posible realizar una transferencia a tu misma cuenta.');
      
    } else {
      Transactions.transfer(dniToTransfer, amount);
    }
  
 }








