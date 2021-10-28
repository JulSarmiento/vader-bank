
/**
 * This envent
 */
window.addEventListener('load', () => {

  localStorage.removeItem('Current-User');
  UserFactory.init();
  

  /**
   * This event get the input's values in the signin's form.
   * 
   * @fires addNewUser
  */
  DomFactory.getSigninForm().addEventListener('submit', (event) => {
    debugger
    event.preventDefault();
    const data = new FormData(event.target);
    const fullName = data.get('full-name');
    const age = data.get('age');
    const email = data.get('email');
    const dniNumber = data.get('dni-number');
    const password = data.get('password');
    const rePassword = data.get('re-password')

    UserFactory.addNewUser(fullName, age, email, dniNumber, password, rePassword);

  })


})










