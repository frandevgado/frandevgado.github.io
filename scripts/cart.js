document.addEventListener('DOMContentLoaded', () =>{
    fetchCart()
    hamburgerMenu()
})

const allItemsContainer = document.getElementById('cart-items-container')
const itemCartTemplate = document.getElementById('item-cart-template').content
const itemContainer = document.querySelectorAll('.cart-item-container')
const divTotalPrice = document.getElementById('total-price-cart')

const navCartNumber = document.getElementById('cart-number')

const fragment = document.createDocumentFragment()

// hamburger menu variables
const navBar = document.getElementById('navbar')
const navMenu = document.getElementById('navbar-menu')
const navHamburger = document.getElementById('bars-menu')
const lineOne = document.getElementById('bar-line1')
const lineTwo = document.getElementById('bar-line2')
const lineThree = document.getElementById('bar-line3')

const fetchCart = () =>{
    if(localStorage.getItem('cart')){
        const cart = JSON.parse(localStorage.getItem('cart'))
        updateItemsInCart(cart)
        
    }
}

const hamburgerMenu = () =>{
    navHamburger.addEventListener('click', displayMenu)
}

const displayMenu = () =>{
    lineOne.classList.toggle('activeline1__bars-menu')
    lineTwo.classList.toggle('activeline2__bars-menu')
    lineThree.classList.toggle('activeline3__bars-menu')
    navMenu.classList.toggle('active')
    navBar.classList.toggle('active')
}

const navCartQuantity = (cart) =>{
    let quantities = []
    cart.forEach(prod =>{
        quantities.push(prod.quantity)
    })
    let totalQuantInCart = quantities.reduce((acc,value) => acc + value, 0)
    navCartNumber.innerHTML = `<i class="fa-solid fa-earth-americas"></i> Mis viajes<span class="cart-number">(${totalQuantInCart})</span>`
    if(totalQuantInCart === 0){
        navCartNumber.innerHTML = `<i class="fa-solid fa-earth-americas"></i> Mis viajes`
    }
}


const updateItemsInCart = itemsInCart =>{
    allItemsContainer.innerHTML = ''
    itemsInCart.forEach(product => {
        itemCartTemplate.querySelector('.cart-item-container').setAttribute('id', product.id)
        itemCartTemplate.querySelector('h3').textContent = product.name
        itemCartTemplate.querySelector('img').setAttribute("src", product.img)
        itemCartTemplate.querySelector('h5').textContent = `Precio:  $${product.price}`
        itemCartTemplate.querySelector('.quantity').textContent = `${product.quantity}`
        itemCartTemplate.querySelector('.subtotal').textContent = `Subtotal: $${product.price * product.quantity}`
        itemCartTemplate.querySelector('.remove-button').setAttribute("id", product.id)
        itemCartTemplate.querySelector('.remove-button').setAttribute("onclick", `removeItemFromCart(${product.id})`)
        itemCartTemplate.querySelector('.decrease-button').setAttribute("id", product.id)
        itemCartTemplate.querySelector('.decrease-button').setAttribute("onclick", `decreaseQuantity(${product.id})`)
        itemCartTemplate.querySelector('.increase-button').setAttribute("id", product.id)
        itemCartTemplate.querySelector('.increase-button').setAttribute("onclick", `increaseQuantity(${product.id})`)
        const clone = itemCartTemplate.cloneNode(true)
        fragment.appendChild(clone)
    })

    allItemsContainer.appendChild(fragment)
    navCartQuantity(itemsInCart)
    totalPriceInCart(itemsInCart)
}


const removeItemFromCart = (prodId) =>{
    const cart = JSON.parse(localStorage.getItem('cart'))

    const item = cart.find(prod => parseInt(prod.id) === parseInt(prodId))
    const index = cart.indexOf(item)
    cart.splice(index, 1)

    updateItemsInCart(cart)
    updateLocalStorage(cart)
}


const updateLocalStorage = (value) => localStorage.setItem("cart", JSON.stringify(value))



const decreaseQuantity = (prodId) =>{
    const cart = JSON.parse(localStorage.getItem('cart'))
    const item = cart.find(prod => parseInt(prod.id) === parseInt(prodId))
    
    itemsCartQuantity = document.querySelectorAll('.quantity')
    
    item.quantity--
    itemsCartQuantity.textContent = `${item.quantity}`
    if(item.quantity === 0){
        const index = cart.indexOf(item)
        cart.splice(index, 1)
        updateItemsInCart(cart)
        updateLocalStorage(cart)
    }
    updateItemsInCart(cart)
    updateLocalStorage(cart)
}


const increaseQuantity = (prodId) =>{
    const cart = JSON.parse(localStorage.getItem('cart'))
    const item = cart.find(prod => parseInt(prod.id) === parseInt(prodId))
    itemCartQuantity = document.querySelectorAll('.quantity')

    item.quantity++
    itemCartQuantity.textContent = `${item.quantity}`
    updateItemsInCart(cart)
    updateLocalStorage(cart)
}

const totalPriceInCart = (cart) =>{
    divTotalPrice.innerHTML = ''
    let subtotals = []
    cart.forEach(prod =>{
        const prodSubtotal =  prod.price * prod.quantity
        subtotals.push(prodSubtotal)
    })
    const totalPrice = subtotals.reduce((acc,value) => acc + value, 0)
    if(cart.length !== 0){
    const totalPriceNumber = document.createElement('P')
    totalPriceNumber.className = 'total-div'
    totalPriceNumber.textContent = `Precio total: $${totalPrice}`
    divTotalPrice.appendChild(totalPriceNumber)
    }else{
        const emptyCart = document.createElement('P')
        emptyCart.textContent = `El carrito está vacío ¡Comience a llenarlo de aventuras!`
        divTotalPrice.appendChild(emptyCart)
    }
}