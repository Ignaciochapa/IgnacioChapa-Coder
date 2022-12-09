// Array que contiene los productos
const productos = [
    // Buzos
    {
        id: 1,
        titulo: "Buzo 1",
        imagen: "/assets/images/background-buzo.jpg",
        categoria: {
            nombre: "Buzos",
            id: "buzos"
        },
        precio: 1000,
        cantidad: 1
    },
    {
        id: 2,
        titulo: "Buzo 2",
        imagen: "/assets/images/buzo2.jpg",
        categoria: {
            nombre: "Buzos",
            id: "buzos"
        },
        precio: 1000,
        cantidad: 1
    },
    {
        id: 3,
        titulo: "Buzo 3",
        imagen: "/assets/images/buzo3.jpg",
        categoria: {
            nombre: "Buzos",
            id: "buzos"
        },
        precio: 1000,
        cantidad: 1
    },
    // Camperas
    {
        id: 4,
        titulo: "Campera 1",
        imagen: "/assets/images/campera1.jpg",
        categoria: {
            nombre: "Camperas",
            id: "camperas"
        },
        precio: 1000,
        cantidad: 1
    },
    {
        id: 5,
        titulo: "Campera 2",
        imagen: "/assets/images/campera2.jpg",
        categoria: {
            nombre: "Camperas",
            id: "camperas"
        },
        precio: 1000,
        cantidad: 1
    },
    {
        id: 6,
        titulo: "Campera 3",
        imagen: "/assets/images/campera3.jpg",
        categoria: {
            nombre: "Camperas",
            id: "camperas"
        },
        precio: 1000,
        cantidad: 1
    },
    // Remeras
    {
        id: 7,
        titulo: "Remera 1",
        imagen: "/assets/images/remera1.jpg",
        categoria: {
            nombre: "Remeras",
            id: "remeras"
        },
        precio: 1000,
        cantidad: 1
    },
    {
        id: 8,
        titulo: "Remera 2",
        imagen: "/assets/images/remera2.jpg",
        categoria: {
            nombre: "Remeras",
            id: "remeras"
        },
        precio: 1000,
        cantidad: 1
    },
];


const contenedorProductos = document.querySelector("#contenedor-productos");

function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";
    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.titulo}">
                <div class="card-body">
                  <h5 class="card-title">${producto.titulo}</h5>
                  <p class="card-text">$${producto.precio}</p>
                  <button id="${producto.id}" class="btn btn-primary">Agregar al carrito</button>
                </div>
            </div>
        `;
        contenedorProductos.append(div);
        const boton = document.getElementById(`${producto.id}`)
        boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
        })
    })
}

cargarProductos(productos);

const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')
const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

let carrito = []

//AGREGAR AL CARRITO
const agregarAlCarrito = (prodId) => {

    //PARA AUMENTAR LA CANTIDAD Y QUE NO SE REPITA
    const existe = carrito.some (prod => prod.id === prodId) //comprobar si el elemento ya existe en el carro

    if (existe){ //SI YA ESTÁ EN EL CARRITO, ACTUALIZAMOS LA CANTIDAD
        const prod = carrito.map (prod => { //creamos un nuevo arreglo e iteramos sobre cada curso y cuando
            // map encuentre cual es el q igual al que está agregado, le suma la cantidad
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else { //EN CASO DE QUE NO ESTÉ, AGREGAMOS EL CURSO AL CARRITO
        const item = productos.find((prod) => prod.id === prodId)//Trabajamos con las ID
        //Una vez obtenida la ID, lo que haremos es hacerle un push para agregarlo al carrito
        carrito.push(item)
    }
    //Va a buscar el item, agregarlo al carrito y llama a la funcion actualizarCarrito, que recorre
    //el carrito y se ve.
    actualizarCarrito() //LLAMAMOS A LA FUNCION QUE CREAMOS EN EL TERCER PASO. CADA VEZ Q SE 
    //MODIFICA EL CARRITO
}
//agregarAlCarrito(1) //Le pasamos el ID por parametro. Tenemos que asigarle como evento esta funcion al boton
//con el id de su producto correspondiente

// Local Storage
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

// Actualizar carrito
const actualizarCarrito = () => {
    //4- CUARTO PASO
    //LOS APPENDS SE VAN ACUMULANDO CON LO QE HABIA ANTES
    contenedorCarrito.innerHTML = "" //Cada vez que yo llame a actualizarCarrito, lo primero q hago
    //es borrar el nodo. Y despues recorro el array lo actualizo de nuevo y lo rellena con la info
    //actualizado
    //3 - TERCER PASO. AGREGAR AL MODAL. Recorremos sobre el array de carrito.

    //Por cada producto creamos un div con esta estructura y le hacemos un append al contenedorCarrito (el modal)
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.titulo}</p>
        <p>Precio: $${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})"><i class="bi bi-trash3-fill"></i></button>
        `

        contenedorCarrito.appendChild(div)
        
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })
    //SEPTIMO PASO
    contadorCarrito.innerText = carrito.length // actualizamos con la longitud del carrito.
    //OCTAVO PASO
    console.log(carrito)
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
    //Por cada producto q recorro en mi carrito, al acumulador le suma la propiedad precio, con el acumulador
    //empezando en 0.

}

// Eliminar del carrito
function eliminarDelCarrito(id) {
    const productoId = id;
    carrito = carrito.filter((producto) => producto.id !== productoId);
    if (carrito.length == 0) {
        localStorage.clear()
    }
    actualizarCarrito();
  }

// Vaciar carrito
botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    localStorage.clear()
    actualizarCarrito()
})