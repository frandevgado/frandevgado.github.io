const allItemsContainer = document.getElementById('cart-items-container')
const itemCartTemplate = document.getElementById('item-cart-template').content
const itemContainer = document.querySelectorAll('.cart-item-container')


const fragment = document.createDocumentFragment()

document.addEventListener('DOMContentLoaded', () =>{
    fetchCart()
})

const fetchCart = () =>{
    if(localStorage.getItem('cart')){
        const cart = JSON.parse(localStorage.getItem('cart'))
        updateItemsInCart(cart)
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



