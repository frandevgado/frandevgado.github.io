let user = prompt('Ingrese usuario')
let password = prompt('Ingrese contraseña')

while (user != 'Gustavo' || password != 212739){
user = prompt('Ingrese usuario')
password = prompt('Ingrese contraseña')
}

let number = parseInt(prompt(`Bienvenido ${user}! Ingrese un número del 1 al 10 por favor`))

for(i = 1; i <= number; i++){
    console.log(number * i)
}


