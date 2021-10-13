class UserFactory{

  static addNewUser() {
    let dni = prompt('Por favor ingrese su numero de cedula:');

    if(!dni){
      return
    }

    if(isNaN(dni)){
      alert('Por favor ingrese unicamente numeros.');
    } else {
      if(UserFactory.fineOne(dni) ){
        alert('El usuario ya existe.');
      } else {
        const name = prompt('Ingrese su nombre y apellido:');
        const age = prompt('Ingrese su edad:');
        if(!name || !age){
          return
        } else if(isNaN(age)){
          alert('Por favor ingrese unicamente numeros.');
        } else if(age < 18){
          alert('El usuario debe ser mayor de edad para abrir una cuenta con nosotros.')
        } else {
          const email = prompt('Ingrese su correo electronico:');
          const password = prompt('Ingrese una contraseña:');
          if(!email || !password){
            return
          } else {
            alert(`Bienvenido/a ${name}, esperamos que su experiencia en nuestro banco sea digna de sus expectativas.`);
            const user = new User(name, age, dni, email, password, User.balance);
            UserFactory.users.push(user);
            return user
          }
        }
      }
    }
  }
}