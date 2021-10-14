/**
 * This class manage all the transactions avaible for the users acounts.
 */
class Transactions{

  /**
   * This function allows transfer money to another existen user and update the balance for both users and push the information in the movements array.
   * @param {number} dniToTransfer 
   * @param {number} amount 
   * 
   * @function findOne
   */
  static transfer(dniToTransfer, amount){
    
    const toTransferUser = UserFactory.findOne(dniToTransfer)

    if(dniToTransfer !== toTransferUser.dni){
      alert('Usuario no encontrado. Por favor revise la informacion ingresada.');

    } else{ 

      if(amount > UserFactory.currentUser.balance){
        alert('No posee los fondos para realizar la transferencia.')

      } else {
        alert(`La transferencia fue exitosa.`);

        let newBalanceUserTransfering = UserFactory.currentUser.balance -= amount;
        toTransferUser.balance += amount;

        UserFactory.currentUser.movements.push(`Transferencia realizada a ${toTransferUser.name} por ${MONEY_FORMAT.format(amount)}.`);
        toTransferUser.movements.push(`Transferencia recibida por ${UserFactory.currentUser.name} por ${MONEY_FORMAT.format(amount)}.`);

        BALANACE.innerHTML = MONEY_FORMAT.format(newBalanceUserTransfering)
        TRANSACTIONS.innerHTML = UserFactory.currentUser.movements
      }
    }

  }
}