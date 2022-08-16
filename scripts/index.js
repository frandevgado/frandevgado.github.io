const navCartNumber = document.getElementById('cart-number')

document.addEventListener('DOMContentLoaded', () =>{
    fetchCart()
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
        console.log(quantities)
    })
    let totalQuantInCart = quantities.reduce((acc,value) => acc + value, 0)
    navCartNumber.innerHTML = `<i class="fa-solid fa-earth-americas"></i> Mis viajes <span class="cart-number">(${totalQuantInCart})</span>`
    if(totalQuantInCart === 0){
        navCartNumber.innerHTML = `<i class="fa-solid fa-earth-americas"></i> Mis viajes`
    }
}
