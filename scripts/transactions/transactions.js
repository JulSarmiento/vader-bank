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
  static transfer(dniToTransfer){
    
    const toTransferUser = UserFactory.findOne(dniToTransfer);

    if(toTransferUser === undefined){
      alert('Usuario no encontrado. Por favor revise la informacion ingresada.');

    } else{ 
      
      let amount = parseInt(prompt('Ingrese el monto a transferir (no emplear puntos (.) ni comas (,)):'));

      if(amount > UserFactory.currentUser.balance){
        alert('No posee los fondos para realizar la transferencia.');

      } else {
        alert(`La transferencia fue exitosa.`);
        TRANSACTIONS.innerHTML = '';

        let newBalanceUserTransfering = UserFactory.currentUser.balance -= amount;
        toTransferUser.balance += amount;

        UserFactory.currentUser.movements.push(`Transferencia realizada a ${toTransferUser.name} por ${MONEY_FORMAT.format(amount)}.`);
        toTransferUser.movements.push(`Transferencia recibida por ${UserFactory.currentUser.name} por ${MONEY_FORMAT.format(amount)}.`);

        UserFactory.currentUser.movements.forEach(movement => {
          const li = document.createElement('li');
          const content = movement;
          const text = document.createTextNode(content);
          li.appendChild(text);
          TRANSACTIONS.appendChild(li);
        });
        
        BALANACE.innerHTML = MONEY_FORMAT.format(newBalanceUserTransfering);

      }       
    }

  }
}