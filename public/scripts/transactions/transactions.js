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

    const toTransferUser = UserFactory.findOne(dniToTransfer);

    if(toTransferUser === undefined){
      alert('Usuario no encontrado. Por favor revise la informacion ingresada.');

    } else{ 
      
      if(amount > validator.balance){
        alert('No posee los fondos para realizar la transferencia.');

      } else {
        alert(`La transferencia fue exitosa.`);

        let newBalanceUserTransfering = validator.balance -= amount;
        toTransferUser.balance += amount;

        const date = new Intl.DateTimeFormat('en-US').format(new Date());
        

        validator.movements.push({name: toTransferUser.name, type: 'Envio', amount, date});
        
        toTransferUser.movements.push({name: validator.name, type: 'Recepcion', amount, date});
 

        localStorage.setItem('Users', JSON.stringify(UserFactory.users));
        document.getElementById('balance-for-transfer').innerHTML = formatPrice(newBalanceUserTransfering);

      }       
    }

  }
}

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
      const dniToTransfer = data.get('dni-number-to-transfer');
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

  if(dniToTransfer == UserFactory.currentUser.dni){
    alert('No es posible realizar una transferencia a tu misma cuenta.');
    
  } else {
    Transactions.transfer(dniToTransfer, amount);
  }

}





