/**
 * This is the user class
 */
class User{
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

  // an array with setted objects for test
  static users = [
    new User('Julieth Sarmiento', 28, 1140862112, 'jasa1999@hotmail.com', '885388' ),
    new User('Habib Manzur', 30, 1140845884, 'habibmanazur@hotmail.com', 'geminis06'),
    new User('Bebe Vader', 18, 927, 'vader@hotmail.com', 'minimichi')
  ];

  // This variable contains the "logged"
  static currentUser;

  /**
   * This Fuction find a user by his dni
   */
  static fineOne(dni){
    dni = parseInt(dni);
    return UserFactory.users.find(user => dni == user.dni)
  }
  
  /**
   * This function add a new user.
   */
  static addNewUser() {
    // debugger
    const dni = prompt('Por favor ingrese su numero de cedula:');

    if(!dni){
      return
    }

    if(isNaN(dni)){
      alert('Por favor ingrese unicamente numeros.');
      return UserFactory.addNewUser();
    }
    
    if(UserFactory.fineOne(dni) ){
      alert('El usuario ya existe.');
      return;
    }
    
    const name = prompt('Ingrese su nombre y apellido:');
    const age = prompt('Ingrese su edad:');
    
    if(!name || !age){
      return

    } else if(isNaN(age)){
      alert('Por favor ingrese unicamente numeros.');

    } else if(age < 18){
      alert('El usuario debe ser mayor de edad para abrir una cuenta con nosotros.');

    } else {
      const email = prompt('Ingrese su correo electronico:');
      const password = prompt('Ingrese una contraseña:');

      if(!email || !password){
        return
      }

      const user = new User(name, age, dni, email, password, User.balance);
      UserFactory.users.push(user);
      alert(`Bienvenido/a ${name}, esperamos que su experiencia en nuestro banco sea digna de sus expectativas.`);
      return user
    }
  }

  /**
   * This function deletes a existent user.
   */
  static deleteUser(dni){
 
    const index = UserFactory.users.findIndex(user => dni == user.dni);

      if (index >= 0) {
      UserFactory.users.splice(index, 1)
      alert(`El usuario ${dni} fue eliminado. `)
    } else {
      alert('El usuario no existe');
    }
  }

}

/**
 * This class mangane all the auth process for the users like login and logout
 */
class AuthFactory{

  /**
   * This function simulate a login finding if a user match the dni and the password, and shows the username, the balance and the movments in the acount
   */
  static login(dni, password){
    let validator = UserFactory.users.find(user => dni == user.dni && password === user.password);

    if(validator){
      UserFactory.currentUser = validator;
      USER_NAME.innerHTML = `Bienvenido ${validator.name}`;
      BALANACE.innerHTML = `${MONEY_FORMAT.format(validator.balance)}`;
      TRANSACTIONS.innerHTML = `${UserFactory.currentUser.movements}`
    } else{
      alert('Usuario o contraseña erroneo, por favor, vuelva a ientar');
    }
  }

  /**
   * This function simulates a logout.
   */
  static logOut(){
    UserFactory.currentUser = null;
    USER_NAME.innerHTML = ``;
    BALANACE.innerHTML = ``;
    TRANSACTIONS.innerHTML = ``;
  }

}

