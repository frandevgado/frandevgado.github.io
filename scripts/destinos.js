document.addEventListener('DOMContentLoaded', () =>{
    fetchData()
})

// item list variables
const productItemsContainer = document.getElementById('product-item')
const cardTemplate = document.getElementById('card-template').content
const checkOut = document.getElementById('card-checkout')

const fragment = document.createDocumentFragment()

// item detail variables

const closeM = document.querySelector('.close')
const openM = cardTemplate.querySelector('.cta')
const modal = document.querySelector('.modal')
const modalC = document.querySelector('.modal-container')

// const productDetailTemplate = document.getElementById('detail-template').content
const detailTitle = document.getElementById('detail-title')
const detailImg = document.getElementById('detail-img')
const detailDescription = document.getElementById('description')
const detailCheckIn = document.getElementById('detail-checkin')
const detailCheckOut = document.getElementById('detail-checkout')


// logica para traer y "pintar" los productos

    const fetchData = async () =>{
        try{
            const res = await fetch('products.json')
            const data = await res.json()
            printCards(data)
            printDetail(data)
        } catch (error) {
            console.log(error)
        }
    }
    
    
    
    const printCards = data =>{
        data.forEach(product =>{
            cardTemplate.querySelector('.card-container').setAttribute('id', product.id)
            cardTemplate.querySelector('h3').textContent = product.name
        cardTemplate.querySelector('h5').innerHTML = `Precio: <span> $${product.price}ars</span class="price-color">`
        cardTemplate.querySelector('img').setAttribute("src", product.img)
        cardTemplate.querySelector('.cta').dataset.id = product.id
        const clone = cardTemplate.cloneNode(true)
        fragment.appendChild(clone)
    })
    productItemsContainer.appendChild(fragment)
}

// logica para desplegar y ocultar modal + mostrar detalles del producto



const printDetail = (data) =>{
    productItemsContainer.addEventListener('click', (e) => {
        console.log(e.target)
        if(e.target.classList.contains('cta')) {
           data.forEach(product =>{
                detailTitle.textContent = product.name
        }) 
        }
    })
}


productItemsContainer.addEventListener('click', (e) =>{
    if(e.target.classList.contains('cta')){
        e.preventDefault()
        modalC.style.opacity = "1"
        modalC.style.visibility = "visible"
        modal.classList.toggle("modal-close")
    }
})


closeM.addEventListener("click", (e) =>{
    modal.classList.toggle("modal-close")

setTimeout(()=>{
    modalC.style.opacity = "0"
    modalC.style.visibility = "hidden"
}, 800)

})

window.addEventListener('click', (e) =>{
    if(e.target == modalC){
        modal.classList.toggle("modal-close")

        setTimeout(() =>{
            modalC.style.opacity = "0"
            modalC.style.visibility = "hidden"
        },800)
    }
})


// productItemsContainer.addEventListener('click', (e) => {
//     if(e.target.classList.contains('cta')) {
//         detailTitle.textContent = 'asdasd'
//     }
// })