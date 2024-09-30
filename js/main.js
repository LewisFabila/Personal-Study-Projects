const productos = [
    // Figuras de Vinilo
    {
        id: "vinyl-01",
        titulo: "Heisenberg",
        imagen: "./img/vinyl/01.jpg",
        categoria: {
            nombre: "Figuras Vinyl",
            id: "vinyl"
        },
        precio: 600
    },
    {
        id: "vinyl-02",
        titulo: "All Might",
        imagen: "./img/vinyl/02.jpg",
        categoria: {
            nombre: "Figuras Vinyl",
            id: "vinyl"
        },
        precio: 600
    },
    {
        id: "vinyl-03",
        titulo: "Titan Eren",
        imagen: "./img/vinyl/03.jpg",
        categoria: {
            nombre: "Figuras Vinyl",
            id: "vinyl"
        },
        precio: 600
    },
    {
        id: "vinyl-04",
        titulo: "Web of Spider-Man #1",
        imagen: "./img/vinyl/04.jpg",
        categoria: {
            nombre: "Figuras Vinyl",
            id: "vinyl"
        },
        precio: 800
    },
    {
        id: "vinyl-05",
        titulo: "Homelander",
        imagen: "./img/vinyl/05.jpg",
        categoria: {
            nombre: "Figuras Vinyl",
            id: "vinyl"
        },
        precio: 600
    },
    {
        id: "vinyl-06",
        titulo: "Demogorgon",
        imagen: "./img/vinyl/06.jpg",
        categoria: {
            nombre: "Figuras Vinyl",
            id: "vinyl"
        },
        precio: 600
    },
    {
        id: "vinyl-07",
        titulo: "Woah Crash",
        imagen: "./img/vinyl/07.jpg",
        categoria: {
            nombre: "Figuras Vinyl",
            id: "vinyl"
        },
        precio: 600
    },
    {
        id: "vinyl-08",
        titulo: "Ezio",
        imagen: "./img/vinyl/08.jpg",
        categoria: {
            nombre: "Figuras Vinyl",
            id: "vinyl"
        },
        precio: 600
    },
    // Peluches
    {
        id: "plush-01",
        titulo: "Toph 9in",
        imagen: "./img/plush/01.jpg",
        categoria: {
            nombre: "Peluches",
            id: "plush"
        },
        precio: 600
    },
    {
        id: "plush-02",
        titulo: "Reptar 9in",
        imagen: "./img/plush/02.jpg",
        categoria: {
            nombre: "Peluches",
            id: "plush"
        },
        precio: 600
    },
    {
        id: "plush-03",
        titulo: "Puar 9in",
        imagen: "./img/plush/03.jpg",
        categoria: {
            nombre: "Peluches",
            id: "plush"
        },
        precio: 600
    },
    {
        id: "plush-04",
        titulo: "Pochita 2ft",
        imagen: "./img/plush/04.jpg",
        categoria: {
            nombre: "Peluches",
            id: "plush"
        },
        precio: 1200
    },
    {
        id: "plush-05",
        titulo: "Mechagodzilla 9in",
        imagen: "./img/plush/05.jpg",
        categoria: {
            nombre: "Peluches",
            id: "plush"
        },
        precio: 700
    },
    {
        id: "plush-06",
        titulo: "Plankton 9in",
        imagen: "./img/plush/06.jpg",
        categoria: {
            nombre: "Peluches",
            id: "plush"
        },
        precio: 600
    },
    {
        id: "plush-07",
        titulo: "Butters Bear 9in",
        imagen: "./img/plush/07.jpg",
        categoria: {
            nombre: "Peluches",
            id: "plush"
        },
        precio: 600
    },
    {
        id: "plush-08",
        titulo: "Ghost Face 9in",
        imagen: "./img/plush/08.jpg",
        categoria: {
            nombre: "Peluches",
            id: "plush"
        },
        precio: 600
    }
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();

}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los Productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}