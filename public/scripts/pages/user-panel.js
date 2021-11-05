
/**
 * This envent
 */
window.addEventListener('load', () => {
  const showMovementsTableBtn = document.getElementById('show-movements');
  const movementsTable = document.getElementById('movements-table');
  const showCreditPaymentForm = document.getElementById('payment-form-container');
    
  UserFactory.init();
  
  let validator = UserFactory.users.find(user => UserFactory.currentUser == user.dni);

  document.getElementById('user-name').innerHTML = `Bienvenido/a ${validator.name}!`;

  document.getElementById('balance').innerHTML = formatPrice(validator.balance);

  //UserFactory.orderUserByName();

  document.querySelector('#transactions tbody').innerHTML = '';
  
  /**
   * Aqui se uso JQUERY
   */
  validator.movements.forEach((movement) => {
    console.log('movement', movement)
   $('#transactions tbody').append( `    
      <tr class="text">
      <td>${movement.name}</td>
      <td>${movement.type}</td>
      <td>${formatPrice(movement.amount)}</td>
      <td>9/10/2021</td>
     </tr>`)
  })


  showMovementsTableBtn.addEventListener('click', (event) =>{
    event.preventDefault();
    movementsTable.classList.toggle('hide');

  })

  document.getElementById('credit-show-panel').addEventListener('click', (event) => {
    event.preventDefault();
    showCreditPaymentForm.classList.toggle('hide');

    if(!validator.credit || !validator.creditDues){
      document.getElementById('minimun-due').innerHTML = '';
      document.getElementById('total-credit-due').innerHTML = '';

    } else{
      document.getElementById('minimun-due').innerHTML = formatPrice(validator.creditDues);
      document.getElementById('total-credit-due').innerHTML = formatPrice(validator.credit);
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
   * Aqui user JQUERY 
   */
  $('#credit-payment-form').submit( (event) => {

    event.preventDefault();

    const paymentResume = document.getElementById('payment-resume');
    const data = new FormData(event.target);

    let payment = data.get('credit-payment-Option');
    const otherValue = parseInt(data.get('other-value-payment'));

    if(payment == '0'){
      payment = validator.creditDues;

      if(payment > validator.balance){
        alert('No posee los fondos suficientes para el pago.');

      } else {
        validator.balance = validator.balance - payment;
        validator.credit = validator.credit - payment;
        UserFactory.save(UserFactory.users);
        paymentResume.innerHTML = `El pago a su credito por el valor de <strong>${formatPrice(payment)}</strong> fue exitoso.`;
        document.getElementById('balance').innerHTML = formatPrice(validator.balance);
        document.getElementById('total-credit-due').innerHTML = formatPrice(validator.credit);
      }


    } else if ( payment == '1'){

      payment = validator.credit;

      if(payment > validator.balance){
        alert('No posee los fondos suficientes para el pago.');

      } else {
        validator.balance = validator.balance - payment;
        validator.credit = validator.credit - payment;
        UserFactory.save(UserFactory.users);
        paymentResume.innerHTML = `El pago a su credito por el valor de <strong>${formatPrice(payment)}</strong> fue exitoso.`;
        document.getElementById('balance').innerHTML = formatPrice(validator.balance);
        document.getElementById('total-credit-due').innerHTML = formatPrice(validator.credit);
      }


    }else if( payment == '2'){


      if(otherValue > validator.balance){
        alert('No posee los fondos suficientes para el pago.');

      } else {
        validator.balance = validator.balance - otherValue;
        validator.credit = validator.credit - payment;
        UserFactory.save(UserFactory.users);
        paymentResume.innerHTML = `El pago a su credito por el valor de <strong>${formatPrice(otherValue)}</strong> fue exitoso.`;
        document.getElementById('balance').innerHTML = formatPrice(validator.balance);
        document.getElementById('total-credit-due').innerHTML = formatPrice(validator.credit);
      }


    }



  })



})












