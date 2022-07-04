

let firstName = prompt('Ingrese su nombre')

alert(`Bienvenido ${firstName}!`)

class Destinos{
    constructor(nombre, fecha, monto){
        this.nombre = nombre
        this.fecha = fecha
        this.monto = monto
    }
}

const productos = []


const arrayDestinos = []

/*Acá utilizo WHILE para pedir 3 destinos y colocar c/u dentro de un
array de objetos (arrayDestinos.push) colocando el límite en 3 con la propiedad length*/

const datosViaje = () =>{
    let nombre = prompt('Ingrese nombre del primer país que quisiera visitar')
    let fecha = prompt('¿En que año?')
    let monto = prompt('¿Cual monto es su límite a utilizar para el mismo?')
    arrayDestinos.push(new Destinos(nombre, fecha, monto))
}

while(arrayDestinos.length < 3){
    if(arrayDestinos.length === 0){
        datosViaje()
    alert('Aún quedan 2 destinos')
    }
    else if(arrayDestinos.length === 1){
        datosViaje()
        alert('¡Perfecto! Falta el último destino')
    }else if(arrayDestinos.length === 2){
        datosViaje()
            alert('Gracias, enseguida le entregaremos las disponibilides')
            }
}

console.log(arrayDestinos)