const navCartNumber = document.getElementById('cart-number')
const navBar = document.getElementById('navbar')
const navMenu = document.getElementById('navbar-menu')
const navHamburger = document.getElementById('bars-menu')
const lineOne = document.getElementById('bar-line1')
const lineTwo = document.getElementById('bar-line2')
const lineThree = document.getElementById('bar-line3')

document.addEventListener('DOMContentLoaded', () =>{
    fetchCart()
    hamburgerMenu()
})
const fetchCart = () =>{
    if(localStorage.getItem('cart')){
        const cart = JSON.parse(localStorage.getItem('cart'))     
        navCartQuantity(cart)
        updateLocalStorage(cart)
    }
}

const updateLocalStorage = (value) => localStorage.setItem("cart", JSON.stringify(value))


const navCartQuantity = (cart) =>{
    let quantities = []
    cart.forEach(prod =>{
        quantities.push(prod.quantity)
    })
    let totalQuantInCart = quantities.reduce((acc,value) => acc + value, 0)
    navCartNumber.innerHTML = `<i class="fa-solid fa-earth-americas"></i> Mis viajes <span class="cart-number">(${totalQuantInCart})</span>`
    if(totalQuantInCart === 0){
        navCartNumber.innerHTML = `<i class="fa-solid fa-earth-americas"></i> Mis viajes`
    }
}

// Hamburger menu


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
