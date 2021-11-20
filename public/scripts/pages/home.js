
/**
 * This envent load the information from the localstorage.
 * @fires init
 * @function init
 */
window.addEventListener('load', () => {

  localStorage.removeItem('Current-User');
  UserFactory.init();
  
  /**
   * Login event get the form data for login: user's dni and password. 
   * @function login
   * @fires login
   */
   document.getElementById('login-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const dniNumber = data.get('dni-number-login');
    const password = data.get('password-login');

    AuthFactory.login(dniNumber, password); 
  })

});