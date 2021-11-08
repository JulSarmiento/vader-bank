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
      alert('El usuario ya existe.');
      return;
    }
    
    if(age < 18){
      alert('El usuario debe ser mayor de edad para abrir una cuenta con nosotros.');

    } else {

      if(password !== rePassword){
        alert('Las contraseñas no son iguales.'); 
      } else{ 
        const user = new User(fullname, age, dniNumber, email, password, User.balance, User.movements);
        UserFactory.users.push(user);
        UserFactory.save(UserFactory.users);
        alert(`Bienvenido/a ${fullname}, esperamos que su experiencia en nuestro banco sea digna de sus expectativas.`);
        window.location.href="./index.html";  
        return user;
      }


    }

  }

  /**
   * This function order the user's array by name.
   */
  static orderUserByName(){

    const orderedUsers = UserFactory.users.sort((a,b) => {
      return a.name.localeCompare(b.name)
    });

    orderedUsers.forEach(user => {

      if (user.dni == UserFactory.currentUser.dni) {
        return;
        
      } else {
        const li = document.createElement('li');
        const content = user.name;
        const text = document.createTextNode(content);
        li.appendChild(text);
        DomFactory.getUsersList().appendChild(li);
      }      

    })
  }

  /**
   * This function deletes a user by his DNI.
   * @param {number} dniNumberToDelete 
   */
  static deleteUser(dniNumberToDelete){

    if(dniNumberToDelete != UserFactory.currentUser.dni){
      alert('No es posible elimintar una cuenta diferente a la tuya.');
  
    } else {

      const index = UserFactory.users.findIndex(user => dniNumberToDelete == user.dni);

      if (index >= 0) {
        UserFactory.users.splice(index, 1);
        alert(`El usuario ${dniNumberToDelete} fue eliminado.`);
        console.log(UserFactory.users);
        AuthFactory.logOut();

      } else {
        alert('El usuario no existe');

      }
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
      
      // UserFactory.currentUser.movements.forEach(movement => {
      //   const li = document.createElement('li');
      //   const content = movement;
      //   const text = document.createTextNode(content);
      //   li.appendChild(text);
      //   DomFactory.getTransactions().appendChild(li);
      // });

      window.location.href="./user.html";  

    } else{
      alert('Contraseña erroneo, por favor, vuelva a ientar');
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

