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
   */
  constructor(name, age, dni , email, password){
    this.id;
    this.name = name;
    this.age = parseInt(age);
    this.dni = parseInt(dni);
    this.email = email;
    this.password = password;
    this.balance = Math.round(Math.random()*1000000);
    this.movements = [];

  }
}

/**
 * This class manage the user's process, like adding, finding and deleting.
 */
class UserFactory{

  /**
   * Set the users array. Contains some users for testing.
   */
  static users = [
    new User('Julieth Sarmiento', 28, 1140862112, 'jasa1999@hotmail.com', '885388' ),
    new User('Habib Manzur', 30, 1140845884, 'habibmanazur@hotmail.com', 'geminis06'),
    new User('Bebe Vader', 18, 927, 'vader@hotmail.com', 'minimichi')
  ];

  /**
   * The variable that contains the "logged" user.
   */
  static currentUser;

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
  static addNewUser() {
    
    const dni = prompt('Por favor ingrese su numero de cedula:');

    if(!dni){
      return;
    }

    if(isNaN(dni)){
      alert('Por favor ingrese unicamente numeros.');
      return UserFactory.addNewUser();
    }
    
    if(UserFactory.findOne(dni) ){
      alert('El usuario ya existe.');
      return;
    }
    
    const name = prompt('Ingrese su nombre y apellido:');
    const age = prompt('Ingrese su edad:');
    
    if(!name || !age){
      return;

    } 
    
    if(isNaN(age)){
      alert('Por favor ingrese unicamente numeros.');

    } else if(age < 18){
      alert('El usuario debe ser mayor de edad para abrir una cuenta con nosotros.');

    } else {
      const email = prompt('Ingrese su correo electronico:');
      const password = prompt('Ingrese una contraseña:');

      if(!email || !password){
        return;
      }

      const user = new User(name, age, dni, email, password, User.balance);
      UserFactory.users.push(user);
      alert(`Bienvenido/a ${name}, esperamos que su experiencia en nuestro banco sea digna de sus expectativas.`);
      return user;
    }
  }

  /**
   * This function deletes a user by his DNI.
   * @param {number} dni 
   */
  static deleteUser(dni){
 
    const index = UserFactory.users.findIndex(user => dni == user.dni);

    if (index >= 0) {
      UserFactory.users.splice(index, 1);
      alert(`El usuario ${dni} fue eliminado. `);

    } else {
      alert('El usuario no existe');
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
      USER_NAME.innerHTML = `Bienvenido ${validator.name}`;
      BALANACE.innerHTML = `${MONEY_FORMAT.format(validator.balance)}`;
      UserFactory.currentUser.movements.forEach(movement => {
        const li = document.createElement('li');
        const content = movement;
        const text = document.createTextNode(content);
        li.appendChild(text);
        TRANSACTIONS.appendChild(li);
      });

    } else{
      alert('Contraseña erroneo, por favor, vuelva a ientar');
    }
  }

  /**
   * This function simulates a logout.
   */
  static logOut(){
    UserFactory.currentUser = null;
    USER_NAME.innerHTML = '';
    BALANACE.innerHTML = ``;
    TRANSACTIONS.innerHTML = ``;
  }

}

