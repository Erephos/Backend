/*
const productos = [
    {nombre: "Polo", precio: 35},
    {nombre: "Gorra", precio: 20}
];

let total = 0;

//Problema, error
for (let i = 0; i <= productos.length; i++) {
    total += productos[i].precio;
}


//SOlucion 1
for (let i = 0; i <= productos.length - 1; i++) {
    total += productos[i].precio;
}

//solucion 2
for (let i = 0; i < productos.length; i++) {
    total += productos[i].precio;
}
console.log("total: " + total)
*/
//Ejercicio other

//carrito 4 productos
const product = [
    {nombre: "Patito", precio: 50},
    {nombre: "Modem", precio: 75},
    {nombre: "Camara", precio: 300},
    {nombre: "GtaVI", precio: 120}
];
//MOstrar cuantos productos hay
console.log("Hay: ",product.length, "Productos")

//Muestra el primer y ultimo producto

console.log("Primero: ",product[0],"\nsegundo: ",product[3])

//total
let total1 = 0
for (let i = 0; i< product.length; i++) {
    total1 += product[i].precio;
}
console.log("total:", total1)