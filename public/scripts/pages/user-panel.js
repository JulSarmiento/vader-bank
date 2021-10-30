/**
 * This envent
 */
window.addEventListener('load', () => {
  const showMovementsTableBtn = document.getElementById('show-movements');
  const movementsTable = document.getElementById('movements-table')
    
  UserFactory.init();
  
  let validator = UserFactory.users.find(user => UserFactory.currentUser == user.dni);

  document.getElementById('user-name').innerHTML = `Bienvenido/a ${validator.name}!`;

  document.getElementById('balance').innerHTML = formatPrice(validator.balance);

  //UserFactory.orderUserByName();

  document.querySelector('#transactions tbody').innerHTML = '';
  
  validator.movements.forEach((movement) => {
    console.log('movement', movement)
    document.querySelector('#transactions tbody').insertAdjacentHTML( 'beforeEnd', `    
      <tr class="text">
      <td>${movement.name}</td>
      <td>${movement.type}</td>
      <td>${formatPrice(movement.amount)}</td>
      <td>9/10/2021</td>
     </tr>`)
  })


  showMovementsTableBtn.addEventListener('click', (event) =>{
    event.preventDefault();
    movementsTable.classList.toggle('hide');

  })
})












