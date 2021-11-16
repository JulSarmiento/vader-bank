/**
 * This is the user class
 */
class User{
  /**
   * 
   * @param {string} name 
   * @param {number} age 
   * @param {number} dni 
   * @param {string} email 
   * @param {string} password 
   * @param {number} balance
   * @param {array} movements 
   * @param {number} credit
   * @param {number} creditDues
   */
  constructor(name, age, dni , email, password){
    this.name = name;
    this.age = parseInt(age);
    this.dni = parseInt(dni);
    this.email = email;
    this.password = password;
    this.balance = Math.round(Math.random()*9000000);
    this.movements = [];
    this.credit;
    this.creditDues;

  }
}

/**
 * This class manage the user's process, like adding, finding and deleting.
 */
class UserFactory{

  /**
   * Set the users array. Contains some users for testing.
   */
  static users = [];

  /**
   * The variable that contains the "logged" user.
   */
  static currentUser;

  /**
   * This function load the localstorage
   */
  static init(){

    const dataStored = localStorage.getItem('Users');
    const dataCurrentUser = localStorage.getItem('Current-User');
  
    if(dataStored){
      UserFactory.users = JSON.parse(dataStored);
      UserFactory.users.forEach((user) =>{
        console.log(user)
      })
    }
  
    if(dataCurrentUser){
      UserFactory.currentUser = JSON.parse(dataCurrentUser);
    }
  }

  /**
   * This fuction save the localstorage (specialy for uptades in the localstorage's array)
   */
  static save(users){
    localStorage.setItem('Users', JSON.stringify(users));
  };

  /**
   * This function find de user by its DNI number
   * @param {number} dni 
   * @returns {object} the user found.
   */
  static findOne(dni){
    dni = parseInt(dni);
    return UserFactory.users.find(user => dni == user.dni);
  }
  
  /**
   * This function adds a new user
   * @returns {object} returns the created user.
   * @function findOne
   * 
   * @listens signInBtn
   */
  static addNewUser(fullname, age, email, dniNumber, password, rePassword) {

    if(UserFactory.findOne(dniNumber) ){

      document.querySelector('#signin-reject-resume').innerHTML = 'El usuario ya existe.';
      document.querySelector('.signin-reject-modal').click(); 

      return
    }
    
    if(password !== rePassword){
      document.querySelector('#signin-reject-resume').innerHTML = 'Las contraseñas no son iguales.';
      document.querySelector('.signin-reject-modal').click();

    } else{ 

      const user = new User(fullname, age, dniNumber, email, password, User.balance, User.movements);
      UserFactory.users.push(user);
      UserFactory.save(UserFactory.users);

      document.querySelector('.modal-text-signin').innerHTML = `Bienvenido/a ${fullname}, esperamos que su experiencia en nuestro banco sea digna de sus expectativas.`;
      document.querySelector('.signin-modal').click();

      document.querySelector('.modal-signin-redirect').addEventListener('click', () => {
        window.location.href="./index.html"; 
      });

      return user;

      }


  }

  
}


/**
 * This class mangane all the auth process for the users like login and logout.
 */
class AuthFactory{

  /**
   * This function simulate a login finding if a user match the dni and the password, and shows the username, the balance and the movments in the acount
   * @param {number} dni 
   * @param {string} password 
   */
  static login(dni, password){

    let validator = UserFactory.users.find(user => dni == user.dni && password === user.password);

    if(validator){

      UserFactory.currentUser = validator;

      localStorage.setItem('Current-User', UserFactory.currentUser.dni);

      localStorage.setItem('Users', JSON.stringify(UserFactory.users));
      
      window.location.href="./user.html";  

    } else{
      document.querySelector('#login-reject-resume').innerHTML = 'Usuario o contraseña erroneo, por favor vuelva a intentar.';

      document.querySelector('.login-reject-modal').click();

    }
  }

  /**
   * This function simulates a logout.
   */
  static logOut(){
    UserFactory.currentUser = null;
    localStorage.removeItem(Current-User)
    window.location.href="./index.html";

  }

}

