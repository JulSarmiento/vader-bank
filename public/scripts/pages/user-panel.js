/**
 * This envent
 */
window.addEventListener('load', () => {
  const showMovementsTableBtn = document.getElementById('show-movements');
  const movementsTable = document.getElementById('movements-table');
  const showCreditPaymentForm = document.getElementById('payment-form-container');

  const creditBalance = document.querySelector('#credit-balance');
    
  UserFactory.init();
  
  let validator = UserFactory.users.find(user => UserFactory.currentUser == user.dni);

  document.getElementById('user-name').innerHTML = `Bienvenido/a ${validator.name}!`;

  document.getElementById('balance').innerHTML = formatPrice(validator.balance);

  document.getElementById('user-date').innerHTML = `<small>Ultimo logeo: ${new Intl.DateTimeFormat('en-US').format(new Date())}</small>`

  document.querySelector('#transactions tbody').innerHTML = '';
  
  if(validator.credit > 0){
    creditBalance.innerHTML = (formatPrice(validator.credit));

  } else{
    creditBalance.innerHTML = '';
  }
  
  validator.movements.forEach((movement) => {
    console.log('movement', movement)
    document.querySelector('#transactions tbody').insertAdjacentHTML('beforeEnd', `    
      <tr class="text">
      <td>${movement.name}</td>
      <td>${movement.type}</td>
      <td>${formatPrice(movement.amount)}</td>
      <td>${movement.date}</td>
     </tr>`)
  })


  showMovementsTableBtn.addEventListener('click', (event) =>{
    event.preventDefault();
    movementsTable.classList.toggle('hide');
  })

  document.getElementById('credit-show-panel').addEventListener('click', (event) => {
    event.preventDefault();
    
    if(!validator.credit || !validator.creditDues){

      document.getElementById('minimun-due').innerHTML = '';
      document.getElementById('total-credit-due').innerHTML = '';
      

    } else{
      document.getElementById('minimun-due').innerHTML = formatPrice(validator.creditDues);
      document.getElementById('total-credit-due').innerHTML = formatPrice(validator.credit);
      showCreditPaymentForm.classList.toggle('hide');
    }

  })

  const otherValueInput = document.querySelector('#other-value-payment input');

  document.querySelectorAll('#payment-form-container input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', (event) => {
      const {value} = event.target;
      if (value === '2') {
        otherValueInput.removeAttribute('disabled');
        otherValueInput.setAttribute('required', 1);
      } else {
        otherValueInput.setAttribute('disabled', 1);
        otherValueInput.removeAttribute('required');
      }
    });
  })

  /**
   * This evente submit the credit form data to process and allow the credit payment, also add the information in the current user's movements array
   */
  document.querySelector('#credit-payment-form').addEventListener('submit', (event) => {

    event.preventDefault();

    const paymentResume = document.getElementById('payment-resume');
    const data = new FormData(event.target);
    const date = new Intl.DateTimeFormat('en-US').format(new Date());

    let payment = data.get('credit-payment-Option');
    const otherValue = parseInt(data.get('other-value-payment'));

    if(payment == '0'){
      payment = validator.creditDues;

      if(payment > validator.balance){
        document.querySelector('#credit-payument-reject-resume').innerHTML = 'No posee los fondos suficientes para el pago.';
        document.querySelector('.credit-payument-reject-modal').click();

      } else {
        validator.balance -= payment;
        validator.credit -= payment;
        
        validator.movements.push({name: 'Credito', type: 'Pago', amount: payment, date});
        UserFactory.save(UserFactory.users);

        paymentResume.innerHTML = `El pago a su credito por el valor de <strong>${formatPrice(payment)}</strong> fue exitoso.`;
        document.querySelector('.credit-payument-modal').click();

        document.querySelector('.credit-payument-modal-btn').addEventListener('click', () => {
          location.reload();
        })
        
        document.getElementById('balance').innerHTML = formatPrice(validator.balance);
        document.getElementById('total-credit-due').innerHTML = formatPrice(validator.credit);
      }


    } else if ( payment == '1'){

      payment = validator.credit;

      if(payment > validator.balance){
        document.querySelector('#credit-payument-reject-resume').innerHTML = 'No posee los fondos suficientes para el pago.';
        document.querySelector('.credit-payument-reject-modal').click();

      } else {
        validator.balance -= payment;
        validator.credit -= payment;

        validator.movements.push({name: 'Credito', type: 'Pago', amount: payment, date});
        UserFactory.save(UserFactory.users);

        paymentResume.innerHTML = `El pago a su credito por el valor de <strong>${formatPrice(payment)}</strong> fue exitoso.`;
        document.querySelector('.credit-payument-modal').click();

        document.querySelector('.credit-payument-modal-btn').addEventListener('click', () => {
          location.reload();
        })
        
        document.getElementById('balance').innerHTML = formatPrice(validator.balance);
        document.getElementById('total-credit-due').innerHTML = formatPrice(validator.credit);

      }

    }else if( payment == '2'){

      if(otherValue > validator.balance){
        document.querySelector('#credit-payument-reject-resume').innerHTML = 'No posee los fondos suficientes para el pago.';
        document.querySelector('.credit-payument-reject-modal').click();


      } else {
        validator.balance -= otherValue;
        validator.credit -= payment;
        validator.movements.push({name: 'Credito', type: 'Pago', amount: payment, date});
        UserFactory.save(UserFactory.users);

        paymentResume.innerHTML = `El pago a su credito por el valor de <strong>${formatPrice(payment)}</strong> fue exitoso.`;
        document.querySelector('.credit-payument-modal').click();

        document.querySelector('.credit-payument-modal-btn').addEventListener('click', () => {
          location.reload();
        })
        
        document.getElementById('balance').innerHTML = formatPrice(validator.balance);
        document.getElementById('total-credit-due').innerHTML = formatPrice(validator.credit);

      }

    }

  })

})