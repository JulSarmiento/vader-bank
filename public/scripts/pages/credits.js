let validator;

/**
 * This function print the resume for the credit. 
 * @param {number} amount 
 * @param {number} dues 
 */
function printResume(amount, dues){

}

window.addEventListener('load', () => {
  UserFactory.init();

  validator = UserFactory.users.find(user => UserFactory.currentUser == user.dni);

  document.getElementById('generate-qr').addEventListener('click', () => {
    document.getElementById('credit-form-container').classList.toggle('hide');

  })




  document.getElementById('credit-resume-btn').addEventListener('click', (event) => {

    event.preventDefault();
    document.getElementById('resume-container').classList.toggle('hide');
  })

})

