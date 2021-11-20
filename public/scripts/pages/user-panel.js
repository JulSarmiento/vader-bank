/**
 * This envent load the information from the localstorage, set the current user as "validator" and print the movement's array.
 */
window.addEventListener('load', () => {
  const showMovementsTableBtn = document.getElementById('show-movements');
  const movementsTable = document.getElementById('movements-table');
  const showCreditPaymentForm = document.getElementById('payment-form-container');

  const creditBalance = document.querySelector('#credit-balance');

  const creditPaymentRejectResume = document.querySelector('#credit-payument-reject-resume');
  const creditPaymentRejectModal = document.querySelector('.credit-payument-reject-modal');
    
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


  /**
   * This event capture the click event for toggle the hide class and show the movement's table.
   */
  showMovementsTableBtn.addEventListener('click', (event) =>{
    event.preventDefault();
    movementsTable.classList.toggle('hide');
  })

  /**
   * This event toggle the credit's panel.
   */
  document.getElementById('credit-show-panel').addEventListener('click', (event) => {
    const minimunDue = document.getElementById('minimun-due');
    const totalCreditDue = document.getElementById('total-credit-due');
    
    event.preventDefault();
    
    if(!validator.credit || !validator.creditDues){

      minimunDue.innerHTML = '';
      totalCreditDue.innerHTML = '';
    
    } else{
      minimunDue.innerHTML = formatPrice(validator.creditDues);
      totalCreditDue.innerHTML = formatPrice(validator.credit);
      showCreditPaymentForm.classList.toggle('hide');
    }

  })

  const otherValueInput = document.querySelector('#other-value-payment input');

  /**
   * This event capture a change in the selection for the radio buttons.
   */
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
    
    if(payment == '0'){
      payment = validator.creditDues;

      if(payment > validator.balance){
        creditPaymentRejectResume.innerHTML = 'No posee los fondos suficientes para el pago.';
        creditPaymentRejectModal.click();

      } else {
        validator.balance -= payment;
        validator.credit -= payment;
        
        validator.movements.push({name: 'Crédito', type: 'Pago', amount: payment, date});
        UserFactory.save(UserFactory.users);

        paymentResume.innerHTML = `El pago a su crédito por el valor de <strong>${formatPrice(payment)}</strong> fue exitoso.`;
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
        creditPaymentRejectResume.innerHTML = 'No posee los fondos suficientes para el pago.';
        creditPaymentRejectModal.click();

      } else {
        validator.balance -= payment;
        validator.credit -= payment;
        validator.creditDues = 0;

        validator.movements.push({name: 'Crédito', type: 'Pago', amount: payment, date});
        UserFactory.save(UserFactory.users);

        paymentResume.innerHTML = `El pago a su crédito por el valor de <strong>${formatPrice(payment)}</strong> fue exitoso.`;
        document.querySelector('.credit-payument-modal').click();

        document.querySelector('.credit-payument-modal-btn').addEventListener('click', () => {
          location.reload();
        })
        
        document.getElementById('balance').innerHTML = formatPrice(validator.balance);
        document.getElementById('total-credit-due').innerHTML = formatPrice(validator.credit);

      }

    }else if( payment == '2'){

      const otherValue = parseInt(data.get('other-value-payment'));

      if(otherValue > validator.balance){
        creditPaymentRejectResume.innerHTML = 'No posee los fondos suficientes para el pago.';
        creditPaymentRejectModal.click();


      } else if( otherValue > validator.credit){
        creditPaymentRejectResume.innerHTML = 'No puede ingresar un valor superior a la deuda.';
        creditPaymentRejectModal.click();

      } else {
        validator.balance -= otherValue;
        validator.credit -= otherValue;
        validator.movements.push({name: 'Crédito', type: 'Pago', amount: otherValue, date});
        UserFactory.save(UserFactory.users);

        paymentResume.innerHTML = `El pago a su crédito por el valor de <strong>${formatPrice(otherValue)}</strong> fue exitoso.`;
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