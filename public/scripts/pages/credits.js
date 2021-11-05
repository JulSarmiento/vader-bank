let validator;
let dues;
let duesToShow

/**
 *  * This function print the resume for the credit. 
 * @param {number} amount 
 * @param {number} dues 
 * @param {number} tax 
 * @param {number} totalDues 
 */
function printResume(amount,dues, tax, totalDues){

  document.getElementById('resume-text').insertAdjacentHTML('beforeend',  
  ` 
    <h2 class="my-3 text-center text"><strong>Resumen!</strong></h2>
    <p id="credit-result " class="text-center text">
      Para el credito se maneja la tasa de interes del <strong>${tax*10}%</strong>. El monto 
      deseado es de <strong>${formatPrice(amount)}</strong>, que sera diferido a <strong>${dues}</strong> cuotas. El valor de sus cuotas 
      mensuales con la tasa de interes correspondientes es de:
      <br>
      <br>
      <strong>${formatPrice(totalDues)} COP</strong>
    </p>
 
    <div class="d-flex justify-content-center align-content-center align-items-center flex-row mt-5 gap-5" >
      <button id="request-credit" class="btn btn-warning text">Solicitar</button>
      <button id="cancel-credit" class="btn btn-warning text" >Cancelar</button>
    </div>
  ` ) 

}


/**
 * This function add the credit information to the current user and save it in the localstorage
 * @param {number} amount 
 * @param {number} totalDues 
 */
function addCreditToUser(amount, totalDues){
  validator.credit = amount;
  validator.creditDues = totalDues;

  UserFactory.save();
}


window.addEventListener('load', () => {

  UserFactory.init();

  validator = UserFactory.users.find(user => UserFactory.currentUser == user.dni);

  /**
   * This event capture the form information.
   */
  document.getElementById('credit-form').addEventListener('submit', (event) => {
    event.preventDefault();
  
    const data = new FormData(event.target);
    const creditAmount = parseInt(data.get('credit-amount'));
    const creditDues = parseInt(data.get('credit-dues'));
  
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
     * This event allows to call the function to print the credit info
     */
    document.getElementById('resume-container').classList.toggle('hide');
    printResume(creditAmount, creditDues, dues, totalCreditDues);

    /**
     * This event allows to save the credit information after the click event
     */
    document.getElementById('request-credit').addEventListener('click', () => {
      addCreditToUser(creditAmount, totalCreditDues);
    })
    
  })



});



// PREGUNTARLE A HABI PORQUE ME REPITE 3 VECES EL RESUMEN Y LE DOY COTIZAR DOS VECES 


