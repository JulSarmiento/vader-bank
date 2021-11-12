let validator;


function reception(description, amount){
  setTimeout(() => {

    const date = new Intl.DateTimeFormat('en-US').format(new Date())
    validator.balance += amount;
    validator.movements.push({name: description, type: 'Recepcion', amount, date });
    localStorage.setItem('Users', JSON.stringify(UserFactory.users));

    document.querySelector('.reception-modal').click();
    document.querySelector('#reception-resume').innerHTML = `Recepcion exitosa por ${formatPrice(amount)}, su nuevo saldo es de: ${formatPrice(validator.balance)}`

    document.querySelector('.reception-modal-btn').addEventListener('click', () => {
      window.location.href = './user.html'
    })
  }, 3000);

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
