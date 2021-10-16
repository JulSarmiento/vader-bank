/**
 * This class was built with singleton pattern because the global const wass returning null.
 */
class DomFactory{
  static _BALANACE;
  static _TRANSACTIONS;
  static _USER_NAME;
  static _USER_LIST;

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

  /**
   * Event button on click
   * @fires addNewUser
   */
  signInBtn.addEventListener('click', UserFactory.addNewUser);

  /**
   * Event button on click
   * @fires loginUser
   */
  logInBtn.addEventListener('click', loginUser);

  /**
   * Event button on click
   * @fires logoutUser
   */
  logOutBtn.addEventListener('click', logoutUser);

  /**
   * Event button on click
   * @fires deleteU
   */
  deleteBtn.addEventListener('click', deleteU );

  /**
   * Event button on click
   * @fires transactions 
   */
  transferBtn.addEventListener('click', transaction);
})

// Money formater
const OPTION = {style : 'currency', currency: 'COP'}; 
const MONEY_FORMAT = new Intl.NumberFormat('es-CO', OPTION); 

/**
 * This function validates before call the delete function in UserFactory Class.
 * @function deleteUser
 * @function logOut
 * 
 * @listens deleteBtn
 */
function deleteU(){

  if(!UserFactory.currentUser){
    return;
  };

  const userToFind = prompt('Ingrese el numero de cedula:');

  if(!userToFind){
    return;
  }
  
  if(userToFind != UserFactory.currentUser.dni){
    alert('No es posible elimintar una cuenta diferente a la tuya.');

  } else{
    UserFactory.deleteUser(userToFind);
    AuthFactory.logOut();
    console.log(UserFactory.users);
  }

}

/**
 * This function validates before call the login function in AuthFactory Class
 * @function findOne
 * @function login
 * 
 * @listens logInBtn
 */
function loginUser(){
  const askDni = parseInt(prompt('Ingrese su dni:'));

  if(!askDni){
    return;
  } 

  if(!UserFactory.findOne(askDni)){
    alert('El usuario indicado no existe.');
  } else{
    const askPassword = prompt('Ingrese su contraseña:');
  
    if(!askPassword){
      return;
    }
  
    AuthFactory.login(askDni, askPassword);
  }

 }

 /**
 * This function validates before call the logout function in AuthFactory Class
 * @function logOut
 * 
 * @listens logOutBtn
 */
 function logoutUser(){

  if(!UserFactory.currentUser){
    alert('No ha iniciado sesion.');

  } else{
    AuthFactory.logOut();
  
  }
 }

 /**
 * This function validates before call the transfer function in Transaction Class
 * @function transfer
 * 
 * @listens transferBtn
 */
 function transaction(){

  if(!UserFactory.currentUser){
    return;

  };

  const dniToTransfer = parseInt(prompt('Ingrese el DNI del usuario a transferir:'));

  if(!dniToTransfer){
    return;

  } 
  
  if(dniToTransfer === UserFactory.currentUser.dni){
    alert('No es posible realizar una transferencia a tu misma cuenta.');
    
  } else {
    Transactions.transfer(dniToTransfer);
  }
  
 }








