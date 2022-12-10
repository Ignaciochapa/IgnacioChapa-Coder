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

// Mostrar productos
const contenedorProductos = document.querySelector("#contenedor-productos");

function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";
    fetch("../productos.json")
        .then((result) => result.json())
        .then(data => {
            productosElegidos.forEach(data => {
                const div = document.createElement("div");
                div.classList.add("producto");
                div.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${data.imagen}" class="card-img-top" alt="${data.titulo}">
                <div class="card-body">
                  <h5 class="card-title">${data.titulo}</h5>
                  <p class="card-text">$${data.precio}</p>
                  <button id="${data.id}" class="btn btn-primary">Agregar al carrito</button>
                </div>
            </div>
        `;
                contenedorProductos.append(div);
                const boton = document.getElementById(`${data.id}`)
                boton.addEventListener('click', () => {
                    agregarAlCarrito(data.id)
                })
            })

        })
        .catch((err) => {
            Toastify({
                text: "Hubo un error al conectarse con la base de datos",
                duration: 3000,
                close: true,
                gravity: "bottom",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
            }).showToast();
        });
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
    const existe = carrito.some(prod => prod.id === prodId)
    if (existe) {
        const prod = carrito.map(prod => {
            if (prod.id === prodId) {
                prod.cantidad++
            }
        })
    } else {
        const item = productos.find((prod) => prod.id === prodId)
        carrito.push(item)
    }
    actualizarCarrito()
}

// Local Storage
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

// Actualizar carrito
const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""
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
    contadorCarrito.innerText = carrito.length
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
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