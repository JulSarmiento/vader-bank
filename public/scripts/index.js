
/**
 * This function give the money format
 * @param {number} price 
 * @returns formante number
 */
function formatPrice(price){
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(price);
}

// /**
//  * This envent
//  */
// window.addEventListener('load', () => {

//   /**
//    * This event get the input's values in the delete's form.
//    * 
//    * @fires deleteUser
//   */
//   DomFactory.getDeleteForm().addEventListener('submit', (event) => {
//     event.preventDefault();
//     const data = new FormData(event.target);
//     const dniNumberToDelete =  data.get('dni-number-to-delete');

//     UserFactory.deleteUser(dniNumberToDelete);

//   })

  
// })











