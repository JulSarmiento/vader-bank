/**
 * This is the user class
 */
class User{
  constructor(name, age, dni , email, password){
    this.id;
    this.name = name;
    this.age = age;
    this.dni = dni;
    this.email = email;
    this.password = password;
    this.balance = Math.round(Math.random()*1000000);
  }
}

/**
 * This class manage the user's process, like adding, finding and deleting.
 */
class UserFactory{

  static users = [];

  /**
   * This Fuction find a user by his dni
   */
  static fineOne(dni){
    return UserFactory.users.find(user => dni == user.dni)
  }
  
  /**
   * This function add a new user.
   */
  
  static addNewUser(){

    // Start asking the dni to validate if the user exist or not for allowing to create a new user.
    let dni = prompt('Por favor ingrese su numero de cedula:');

    if(isNaN(dni)){
      alert('Por favor ingrese unicamente numeros.');
      return
    }else{
      dni = parseInt(dni);
    }

    if(UserFactory.fineOne(dni) ){
      alert('El usuario ya existe.')
      return;
    }

    const name = prompt('Ingrese su nombre y apellido:');

    let age = prompt('Ingrese su edad:');

    if(isNaN(age)){
      alert('Por favor ingrese unicamente numeros.');
    }else if(age < 18){
      alert('El usuario debe ser mayor de edad para poder crear una cuenta.')
      return
    } else{
      age = parseInt(age);

    }

    const email = prompt('Ingrese su correo electronico:');

    const password = prompt('Ingrese una contraseña:');

    if(!name || !age || !dni || !email || !password){
      return
    };

    alert(`Bienvenido/a ${name}, esperamos que su experiencia en nuestro banco sea digna de sus expectativas.`);
    const user = new User(name, age, dni, email, password, User.balance);
    UserFactory.users.push(user);
    return user
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

  static login(dni, password){
    let validator = UserFactory.users.find(user => dni == user.dni && password === user.password);

    if(validator){
      USER_NAME.innerHTML = `Bienvenido ${validator.name}`;
      BALANACE.innerHTML = `${MONEY_FORMAT.format(validator.balance)}`;
    } else{
      alert('Usuario o contraseña erroneo, por favor, vuelva a ientar');
    }
  }

  static logOut(){

  }

}

