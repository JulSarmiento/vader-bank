// buttons
const signInBtn = document.getElementById('signin');
// const LOG_IN = document.getElementById('login');
const deleteBtn = document.getElementById('delete');
// const TRANSFER = document.getElementById('transfer');

// Money formater
const OPTION = {style : 'currency', currency: 'COP'}; 
const MONEY_FORMAT = new Intl.NumberFormat('es-CO', OPTION); 
  

function deleteU(){
  const userToFind = prompt('Ingrese el numero de cedula:')

  if(userToFind === null || !userToFind){
    return
  }

  UserFactory.deleteUser(userToFind)
  console.log(UserFactory.users);
}

// // Button's events
window.addEventListener('load', () => {
  signInBtn.addEventListener('click', UserFactory.addNewUser);
  // LOG_IN.addEventListener('click', loginUser);
  deleteBtn.addEventListener('click', deleteU );
  // TRANSFER.addEventListener('click', transaction);
} )






