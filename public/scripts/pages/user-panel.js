/**
 * This envent
 */
window.addEventListener('load', () => {
  const showMovementsTableBtn = document.getElementById('show-movements');
  const movementsTable = document.getElementById('movements-table')
    
  UserFactory.init();
  
  let validator = UserFactory.users.find(user => UserFactory.currentUser == user.dni);

  DomFactory.getUsername().innerHTML = `Bienvenido/a ${validator.name}!`;

  DomFactory.getBalance().innerHTML = formatPrice(validator.balance);

  //UserFactory.orderUserByName();

  DomFactory.getTransactions().innerHTML = '';
  
  validator.movements.forEach((movement) => {
    console.log('movement', movement)
    DomFactory.getTransactions().insertAdjacentHTML( 'beforeEnd', `    
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












