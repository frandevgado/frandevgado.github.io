document.addEventListener('DOMContentLoaded', () =>{
    fetchData()
})



const productItem = document.getElementById('product-item')
const cardTemplate = document.getElementById('card-template').content
const checkOut = document.getElementById('card-checkout')
const title = document.getElementById('h1')

const fragment = document.createDocumentFragment()


const closeM = document.querySelector('.close')
const openM = cardTemplate.querySelector('.cta')
const modal = document.querySelector('.modal')
const modalC = document.querySelector('.modal-container')


const fetchData = async () =>{
    try{
        const res = await fetch('products.json')
        const data = await res.json()
        printCards(data)
        // printDetail(data)
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
    productItem.appendChild(fragment)
}

openM.addEventListener('click', (e) =>{
    e.preventDefault()
    e.console.log('aaaaaaaaaaaa')
})


// const printDetail = data =>{
// }