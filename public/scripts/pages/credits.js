let validator;
let dues;
let duesToShow;

const resumeText = document.getElementById('resume-text');

/**
 *  * This function print the resume for the credit. 
 * @param {number} amount 
 * @param {number} dues 
 * @param {number} tax 
 * @param {number} totalDues 
 */
function printResume(amount,dues, tax, totalDues){

  resumeText.innerHTML = 
  ` 
    <h2 class="my-3 text-center text"><strong>Resumen!</strong></h2>
    <p id="credit-result " class="text-center text">
      Para el crédito se maneja la tasa de interés del <strong>${parseFloat((tax*10).toFixed(2))}%</strong>. El monto 
      deseado es de <strong>${formatPrice(amount)}</strong>, que sera diferido a <strong>${dues}</strong> cuotas. El valor de sus cuotas 
      mensuales con la tasa de interés correspondiente es de:
      <br>
      <br>
      <strong>${formatPrice(totalDues)} COP</strong>
    </p>
 
    <div class="d-flex justify-content-center align-content-center align-items-center flex-row mt-5 gap-5" >
      <button id="request-credit" class="btn btn-warning text">Solicitar</button>
      <button id="cancel-credit" type="reset" class="btn btn-warning text" >Cancelar</button>
    </div>
  `;

  document.getElementById('cancel-credit').addEventListener('click', () => {
    location.reload();
  })

}

/**
 * This function add the credit information to the current user and save it in the localstorage
 * @param {number} amount 
 * @param {number} totalDues 
 */
function addCreditToUser(amount, totalDues){
  const creditRejectResume = document.querySelector('#credit-reject-resume')
  const creditRejectModal = document.querySelector('.credit-reject-modal');

  if(validator.credit){

    creditRejectResume.innerHTML = `Actualmente ya cuenta con un crédito de nuestro banco por un monto de ${formatPrice(validator.credit)}, para poder adquirir otro, debe cancelar el anterior.`;
    creditRejectModal.click();

    document.querySelector('.credit-reject-modal-btn').addEventListener('click', () => {
      window.location.href = './user.html';
    }) 

  } else {
    validator.credit = amount;
    validator.creditDues = totalDues;

    const date = new Intl.DateTimeFormat('en-US').format(new Date())
  
    validator.movements.push({name: 'Credito', type: 'Recepcion', amount, date });
    UserFactory.save(UserFactory.users);

    document.querySelector('#credit-resume').innerHTML = `Su crédito ha sido aprobado por un valor de: ${formatPrice(amount)}, el dinero ha sido depositado en su cuenta de crédito.`;
    document.querySelector('.credit-modal').click();

    document.querySelector('.credit-modal-btn').addEventListener('click', () => {
      window.location.href = './user.html';
    })    
    
  }

}

/**
 * This event load the information saved in the localstorage
 */
window.addEventListener('load', () => {

  UserFactory.init();

  validator = UserFactory.users.find(user => UserFactory.currentUser == user.dni);

  /**
   * This event capture the form information and validate the credit's due to set a tax value.
   */
  document.getElementById('credit-form').addEventListener('submit', (event) => {
    event.preventDefault();
  
    const data = new FormData(event.target);
    const creditAmount = parseInt(data.get('credit-amount'));
    const creditDues = parseInt(data.get('credit-dues'));

    if(creditAmount < 1000000){

      creditRejectResume.innerHTML = `El monto mínimo para los créditos es de ${formatPrice(1000000)}`;
      creditRejectModal.click();
      return
    };
  
    if(creditAmount <= 24000000){
  
      if(creditDues <= 24 ){
        dues = 0.14;
  
      } else if( creditDues <= 48){
        dues = 0.18;
        
      } else if (creditDues <= 60){
        dues = 0.202;
  
      } else {
        dues = 0.3;
  
      }
  
    } else if (creditAmount <= 40000000){
  
      if(creditDues <= 24 ){
        dues = 0.12;
  
      } else if( creditDues <= 48){
        dues = 0.15;
        
      } else if (creditDues <= 60){
        dues = 0.18;
        
      } else {
        dues = 0.2;

      }
  
    } else {
  
      if(creditDues <= 24 ){
        dues = 0.109;
  
      } else if( creditDues <= 48){
        dues = 0.11;
          
      } else if (creditDues <= 60){
        dues = 0.16;
          
      } else {
        dues = 0.17;
  
      }
    }
  
    let totalCreditDues = ((creditAmount / creditDues) * dues) + (creditAmount / creditDues);
   
    /**
     * This event allows to call the function to print the credit info.
     */
    document.getElementById('resume-container').classList.toggle('hide');
    printResume(creditAmount, creditDues, dues, totalCreditDues);

    /**
     * This event allows to save the credit information after the click event.
     */
    document.getElementById('request-credit').addEventListener('click', () => {
      addCreditToUser(creditAmount, totalCreditDues);
    })
    
  })

});






