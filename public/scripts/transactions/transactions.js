// Current User from LocalStorage
let validator;

/**
 * This class manage all the transactions avaible for the users acounts.
 */
class Transactions{

  /**
   * This function allows transfer money to another existen user and update the balance for both users and push the information in the movements array.
   * @param {number} dniToTransfer 
   * 
   * @function findOne
   */
  static transfer(dniToTransfer, amount){

    const transferRejectResume = document.querySelector('#transfer-reject-resume')
    const transferRejectModal = document.querySelector('.transfer-reject-modal')

    const toTransferUser = UserFactory.findOne(dniToTransfer);

    if(toTransferUser === undefined){
      
      transferRejectResume.innerHTML = 'Usuario no encontrado. Por favor revise la informacion ingresada.';
      transferRejectModal.click();

      } else{ 
      
      if(amount > validator.balance){

        transferRejectResume.innerHTML = 'No posee los fondos suficientes para realizar la transferencia.';
        transferRejectModal.click();

      } else {
        
        let newBalanceUserTransfering = validator.balance -= amount;
        toTransferUser.balance += amount;

        const date = new Intl.DateTimeFormat('en-US').format(new Date());
        
        validator.movements.push({name: toTransferUser.name, type: 'Envío', amount, date});
        
        toTransferUser.movements.push({name: validator.name, type: 'Recepcion', amount, date});
 
        localStorage.setItem('Users', JSON.stringify(UserFactory.users));
        document.getElementById('balance-for-transfer').innerHTML = formatPrice(newBalanceUserTransfering);

        document.querySelector('.transfer-modal').click();
        document.querySelector('#transfer-resume').innerHTML = `Se ha enviado exitosamente un monto de ${formatPrice(amount)} al usuario ${toTransferUser.name}`;

        document.querySelector('.transfer-modal-btn').addEventListener('click', () => {
          window.location.href="./user.html";
        })        
      }       
    }

  }
}

/**
 * This event load the information from the localstorage, set the current user as the "validator".
 */
window.addEventListener('load', () => {

  UserFactory.init();

  validator = UserFactory.users.find(user => UserFactory.currentUser == user.dni);

  document.getElementById('balance-for-transfer').innerHTML = formatPrice(validator.balance);

  /**
   * This event get the input's values in the Tranfer's form.
   * 
   * @fires transaction
  */
     document.getElementById('transfer-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(event.target);
      const dniToTransfer = parseInt(data.get('dni-number-to-transfer'));
      const amountToTranfer = parseInt(data.get('amount-to-transfer'));
  
      transaction(dniToTransfer,amountToTranfer);
    })

})

/**
 * This function validates before call the transfer function in Transaction Class
 * @function transfer
 * 
 * @listens transferBtn
*/
function transaction(dniToTransfer, amount){

  if(dniToTransfer == validator.dni){

    transferRejectResume.innerHTML = 'No es posible realizar una transferencia a tu misma cuenta.';
    transferRejectModal.click();
    return

  } else {
    Transactions.transfer(dniToTransfer, amount);
  }

}





