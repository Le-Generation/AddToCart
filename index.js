//Check for loading success
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
  } else {
    // Call the 'ready' function after loading is completed.
    ready()
  }
  
  //Function to string all btn-danger together and store under variable name: removeCartItemButtons for item removal actions.
  function ready() {
    let removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i]
  // onclick to action removal of item.
      button.addEventListener('click', removeCartItem)
    }
    //This updates the total quantity of input for each item.
    let quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (let i = 0; i < quantityInputs.length; i++) {
      let input = quantityInputs[i]
      input.addEventListener('change', quantityChanged)
    }
    //This adds item to the cart list.
    let addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (let i = 0; i < addToCartButtons.length; i++) {
      let button = addToCartButtons[i]
      button.addEventListener('click', addToCartClicked)
    }
  }
  
  //Function remove-buttons to delete the items from cart.
  function removeCartItem(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    // Call the updateCartTotal function
    updateCartTotal()
  }
  
  //This code updates the total quantity price of each item.
  function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1
    }
    updateCartTotal()
  }
  
  //Function to add items to the cart list.
  function addToCartClicked(event) {
    let button = event.target
    let shopItem = button.parentElement.parentElement
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    console.log(title, price)
    addItemToCart(title, price)
    //Call the updateCartTotal function.
    updateCartTotal()
  }
  
  // Function to add the items to cart, restricted to one-unit per style, max three garments of three diff styles per purchase.
  function addItemToCart(title, price) {
    let cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    let cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (let i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].innerText == title) {
        alert('This item has already been added to the cart')
        return
      }
    }
    let cartRowContents = `
      <div class="cart-item cart-column">
      <span class="cart-item-title">${title}</span>
      </div>
      <span class="cart-price cart-column">${price}</span>
      <div class="cart-quantity cart-column">
      <!-- Enables user to place a class with a quantity number input -->
      <input class="cart-quantity-input" type="number" value="1">
      <button class="btn btn-danger" type="button">Remove</button>
      </div>
  `
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow
      .getElementsByClassName('btn-danger')[0]
      .addEventListener('click', removeCartItem)
    cartRow
      .getElementsByClassName('cart-quantity-input')[0]
      .addEventListener('change', quantityChanged)
  }
  
  // Function to re-calculate new total cost when item is added or removed.
  function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName('cart-items')[0]
    let cartRows = cartItemContainer.getElementsByClassName('cart-row')
    let total = 0
    for (let i = 0; i < cartRows.length; i++) {
      let cartRow = cartRows[i]
      let priceElement = cartRow.getElementsByClassName('cart-price')[0]
      let quantityElement = cartRow.getElementsByClassName(
        'cart-quantity-input',
      )[0]
      let price = parseFloat(priceElement.innerText.replace('$', ''))
      let quantity = quantityElement.value
      console.log(price * quantity)
      total = total + price * quantity
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
  }
  
  
  