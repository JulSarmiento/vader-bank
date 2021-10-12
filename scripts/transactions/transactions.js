class Transactions{

  static transfer(dniToTransfer, amout){
    
    const toTransferUser = UserFactory.fineOne(dniToTransfer)

    if(dniToTransfer !== toTransferUser.dni){
      alert('Usuario no encontrado. Por favor revise la informacion ingresada.');
    } else{ 

      if(amout > UserFactory.currentUser.balance){
        alert('No posee los fondos para realizar la transferencia.')
      } else {
        alert(`La transferencia fue exitosa.`);
        UserFactory.currentUser.movements.push(`Transferencia realizada a ${toTransferUser.name} por ${MONEY_FORMAT.format(amout)}.`)
        console.log(UserFactory.currentUser.movements);
        toTransferUser.balance += amout;
        toTransferUser.movements.push(`Transferencia recibida de ${UserFactory.currentUser.name} por ${MONEY_FORMAT.format(amout)}.`)
        BALANACE.innerHTML = UserFactory.currentUser.balance -= amout
        TRANSACTIONS.innerHTML = UserFactory.currentUser.movements;
      }
    }

  }
}