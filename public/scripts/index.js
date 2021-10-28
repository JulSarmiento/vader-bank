/**
 * This class was built with singleton pattern because the global const was returning null.
 */
class DomFactory{
  static _BALANACE;
  static _TRANSACTIONS;
  static _USER_NAME;
  static _USER_LIST;
  static _SIGNIN_FORM;
  static _lOGIN_FORM;
  static _TRANSFER_FORM;
  static _DELETE_FORM;
  static _MOVEMENTS;
  static _BALANCE_FOR_TRANSFER


  // static getUsersList() {
  //   if (!DomFactory._USER_LIST) {
  //     DomFactory._USER_LIST =  document.getElementById('users-list');
  //   }

  //   return DomFactory._USER_LIST;
  // }

  static getTransactions() {
    if (!DomFactory._TRANSACTIONS) {
      DomFactory._TRANSACTIONS =  document.querySelector('#transactions tbody');
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



  // static getDeleteForm(){
  //   if (!DomFactory._DELETE_FORM) {
  //     DomFactory._DELETE_FORM =  document.getElementById('delete-user-form');
  //   }

  //   return DomFactory._DELETE_FORM;
  // }

}

/**
 * This function give the money format
 * @param {number} price 
 * @returns formante number
 */
function formatPrice(price){
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(price);
}

/**
 * This envent
 */
window.addEventListener('load', () => {

    // Getting data from the local storage

  /**
   * Event button on click
   * @fires logOut
   */
   document.querySelector('.logout').addEventListener('click', AuthFactory.logOut);

  /**
   * Event button on click
   * @fires toggle
   */
  // deleteBtn.addEventListener('click', () => {
  //   DomFactory.getDeleteForm().classList.toggle('hide');
  // } );


  /**
   * This event get the input's values in the delete's form.
   * 
   * @fires deleteUser
  */
  // DomFactory.getDeleteForm().addEventListener('submit', (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.target);
  //   const dniNumberToDelete =  data.get('dni-number-to-delete');

  //   UserFactory.deleteUser(dniNumberToDelete);

  // })
})

// Money formater










