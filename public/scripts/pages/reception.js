let validator;


function reception(description, amount){
  setTimeout(() => {
    validator.balance += amount;
    validator.movements.push({name: description, type: 'Recepcion', amount: amount});
    localStorage.setItem('Users', JSON.stringify(UserFactory.users));
    alert (`Recepcion exitosa por ${formatPrice(amount)}, su nuevo saldo es de: ${formatPrice(validator.balance)}`);
  }, 5000);

}

window.addEventListener('load', () => {

  UserFactory.init();

  validator = UserFactory.users.find(user => UserFactory.currentUser == user.dni);

  document.getElementById('reception-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const description = data.get('description');
    const amountRecept = parseInt(data.get('amount-to-recep'));

    setTimeout(() =>{
      document.querySelector('.qr-picture').classList.toggle('hide');
    }, 1000);

    reception(description, amountRecept);




    
  })


})
