let validator;


function reception(amout){


}

window.addEventListener('load', () => {

  UserFactory.init();

  validator = UserFactory.users.find(user => UserFactory.currentUser == user.dni);

  document.getElementById('reception-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const amountRecept = parseInt(data.get('amount-to-recep'));

    reception(amountRecept);

    setTimeout(() =>{
      document.querySelector('.qr-picture').classList.toggle('hide');
    }, 2000);


    setTimeout(() => {
      validator.balance += amountRecept;
      validator.movements.push({name: 'Recepcion', type: 'Recepcion', amount: amountRecept});
      localStorage.setItem('Users', JSON.stringify(UserFactory.users));
      alert (`Recepcion exitosa por ${formatPrice(amountRecept)}, su nuevo saldo es de: ${formatPrice(validator.balance)}`);
    }, 6000);


    
  })


})
