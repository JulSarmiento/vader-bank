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

  // if(!validator){
  //   window.location.href = './index.html';
  // }
  
  document.getElementById('reception-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const description = data.get('description');
    const amountRecept = parseInt(data.get('amount-to-recep'));
    const img = document.querySelector('.qr-picture');

    img.classList.toggle('hide');

    const URL = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://qrco.de/bcY8vX";

    setTimeout(() => {
      fetch(URL)
      .then(response => response.blob())
      .then(result => {
        console.log(result)

        const image = window.URL.createObjectURL(result);
        img.src = image;
        

        setTimeout(() => {
          reception(description, amountRecept);
        }, 2000);
      })
      .catch(error => console.log('error', error));

    }, 2000)
    


    
  })


})
