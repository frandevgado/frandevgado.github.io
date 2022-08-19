document.addEventListener('DOMContentLoaded', () =>{
    fetchData()
    if(localStorage.getItem('cart')){
        cart = JSON.parse(localStorage.getItem("cart"))
        
    }
})

// hamburger menu variables
const navBar = document.getElementById('navbar')
const navMenu = document.getElementById('navbar-menu')
const navHamburger = document.getElementById('bars-menu')
const lineOne = document.getElementById('bar-line1')
const lineTwo = document.getElementById('bar-line2')
const lineThree = document.getElementById('bar-line3')


// item list variables
const productItemsContainer = document.getElementById('products-container')
const cardTemplate = document.getElementById('card-template').content

const fragment = document.createDocumentFragment()

// modal variables
const closeM = document.querySelector('.close')
const openM = cardTemplate.querySelector('.cta')
const modal = document.querySelector('.modal')
const modalC = document.querySelector('.modal-container')

// item detail variables
const detailTitle = document.getElementById('detail-title')
const detailImg = document.getElementById('detail-img')
const detailDescription = document.getElementById('description')
const detailCheckIn = document.getElementById('detail-checkin')
const detailCheckOut = document.getElementById('detail-checkout')
const detailPrice = document.getElementById('detail-price')

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


// logica para traer y "pintar" los productos

    const fetchData = async () =>{
        try{
            const res = await fetch ('products.json')
            const data = await res.json()
            printCards(data)
        } catch (error) {
            console.log(error)
        }
    }
    
    const navCartNumber = document.getElementById('cart-number')

    document.addEventListener('DOMContentLoaded', () =>{
        fetchCart()
        hamburgerMenu()
    })
    
    const fetchCart = () =>{
        if(localStorage.getItem('cart')){
            const cart = JSON.parse(localStorage.getItem('cart'))     
            navCartQuantity(cart)
        }
    }
    
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
    
    const printCards = data =>{
        data.forEach(product =>{
            cardTemplate.querySelector('.card-container').setAttribute('id', product.id)
            cardTemplate.querySelector('h3').textContent = product.name
        cardTemplate.querySelector('h5').innerHTML = `Precio: <span> $</span><span>${product.price}</span>`
        cardTemplate.querySelector('img').setAttribute("src", product.img)
        cardTemplate.querySelector('.cta').dataset.id = product.id
        cardTemplate.querySelector('.buy-btn').dataset.name = product.name
        cardTemplate.querySelector('.card__check--in').textContent = `Desde: ${product.checkin}`
        cardTemplate.querySelector('.card__check--out').textContent = `Hasta: ${product.checkout}`

        const clone = cardTemplate.cloneNode(true)
        fragment.appendChild(clone)
    })
    productItemsContainer.appendChild(fragment)
}

// LOGIC - MODAL / DETAIL


// Convierto el div en un objeto
const setProductDetail = object =>{
    
   const product = {
    id: object.querySelector('.cta').dataset.id,
    name: object.querySelector('h3').textContent,
    img: object.querySelector('img').getAttribute('src'),
    price: object.querySelector('h5').textContent,
    checkin: object.querySelector('.card__check--in').textContent,
    checkout: object.querySelector('.card__check--out').textContent,
   }
    printProductDetail(product)
}

// Renderizo los detalles del producto en el modal dinamicamente
const printProductDetail = (product) => {
    detailTitle.textContent = product.name
    detailImg.setAttribute('src', product.img)
    detailTitle.textContent = product.name
    detailPrice.textContent = product.price
    detailCheckIn.textContent = product.checkin
    detailCheckOut.textContent = product.checkout
}


productItemsContainer.addEventListener('click', (e) =>{
    if(e.target.dataset.id){
        setProductDetail(e.target.parentElement.parentElement)
        modalC.style.opacity = "1"
        modalC.style.visibility = "visible"
        modal.classList.toggle("modal-close")
        modal.classList.add("a-class")
    }else if(e.target.dataset.name) {
        
        e.preventDefault()
        addToCart(e.target.parentElement.parentElement)
        navCartQuantity(cart) 
        Swal.fire({
            title: 'Éxito',
            text: 'Agregaste el destino al carrito',
            icon: 'success',
            confirmButtonText: 'Cerrar'
          })
    }
    e.stopPropagation()
})







// CloseModalHandler
const closeModal = (e) =>{
    modal.classList.toggle("modal-close")

    setTimeout(() =>{
        modalC.style.opacity = "0"
        modalC.style.visibility = "hidden"
    },800)

}

// Cerrar al hacer click en la cruz
closeM.addEventListener( "click", (e) =>{
    closeModal()
    e.stopPropagation()})

// Cerrar modal al clickear fuera del modal
modalC.addEventListener('click', (e) =>{
    if(e.target.classList.contains('modal-container')) closeModal()
})




//  LOGIC - ADD TO CART **

//  // comprobar si el producto ya está en el carrito
    const idIsInCart = (id) => cart.some( prod => prod.id === id) 
    
    // contenedor de productos en el carro
    let cart = []
    
    // función para agregar al carrito
    const addToCart = (object) =>{
        const product = {
            id: object.querySelector('.cta').dataset.id,
            name: object.querySelector('h3').textContent,
            img: object.querySelector('img').getAttribute('src'),
            price: object.querySelector('h5').children[1].textContent,
            checkin: object.querySelector('.card__check--in').textContent,
            checkout: object.querySelector('.card__check--out').textContent,
           }

        const productToCart = {...product, quantity: 1}
        if(idIsInCart(object.id)){
            let index = cart.findIndex(i => i.id === productToCart.id )
            let product = cart[index]
            product.quantity = product.quantity + 1
            localStorage.setItem("cart", JSON.stringify(cart))
        }else{
            cart.push(productToCart)
            localStorage.setItem("cart", JSON.stringify(cart))
        }
    }