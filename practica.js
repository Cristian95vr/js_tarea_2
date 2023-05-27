// Cada producto que vende el super es creado con esta clase
class Producto {
    sku;            // Identificador único del producto
    nombre;         // Su nombre
    categoria;      // Categoría a la que pertenece este producto
    precio;         // Su precio
    stock;          // Cantidad disponible en stock

    constructor(sku, nombre, precio, categoria, stock = 10) {
        this.sku = sku;
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
        this.stock = stock;
    }
}

// Creo todos los productos que vende mi super
const queso = new Producto('KS944RUR', 'Queso', 10, 'lacteos', 4);
const gaseosa = new Producto('FN312PPE', 'Gaseosa', 5, 'bebidas');
const cerveza = new Producto('PV332MJ', 'Cerveza', 20, 'bebidas');
const arroz = new Producto('XX92LKI', 'Arroz', 7, 'alimentos', 20);
const fideos = new Producto('UI999TY', 'Fideos', 5, 'alimentos');
const lavandina = new Producto('RT324GD', 'Lavandina', 9, 'limpieza');
const shampoo = new Producto('OL883YE', 'Shampoo', 3, 'higiene', 50);
const jabon = new Producto('WE328NJ', 'Jabon', 4, 'higiene', 3);

// Genero un listado de productos. Simulando base de datos
const productosDelSuper = [queso, gaseosa, cerveza, arroz, fideos, lavandina, shampoo, jabon];

// Cada cliente que venga a mi super va a crear un carrito
class Carrito {
    productos;      // Lista de productos agregados
    categorias;     // Lista de las diferentes categorías de los productos en el carrito
    precioTotal;    // Lo que voy a pagar al finalizar mi compra

    // Al crear un carrito, empieza vacío
    constructor() {
        this.precioTotal = 0;
        this.productos = [];
        this.categorias = [];
    }

    /**
     * función que agrega @{cantidad} de productos con @{sku} al carrito
     */
    async agregarProducto(sku, cantidad) {
        console.log(`Agregando ${cantidad} ${sku}`);

        // Busco el producto en la "base de datos"
        try {
            const producto = await findProductBySku(sku);

            console.log("Producto encontrado", producto);

            // Verifico si el producto ya existe en el carrito
            const productoExistente = this.productos.find((producto) => producto.sku === sku);
            if (productoExistente) {
                productoExistente.cantidad += cantidad;
            } else {
                // Creo un nuevo producto en el carrito
                const nuevoProducto = new ProductoEnCarrito(sku, producto.nombre, cantidad);
                this.productos.push(nuevoProducto);
            }

            this.precioTotal += producto.precio * cantidad;

            // Actualizo la lista de categorías solo si la categoría no está presente
            if (!this.categorias.includes(producto.categoria)) {
                this.categorias.push(producto.categoria);
            }
        } catch (error) {
            console.log(error);
        }
    }

   
/**
     * función que agrega @{cantidad} de productos con @{sku} al carrito
     */
async agregarProducto(sku, cantidad) {
    console.log(`Agregando ${cantidad} ${sku}`);

    // Busco el producto en la "base de datos"
    try {
        const producto = await findProductBySku(sku);

        console.log("Producto encontrado", producto);

        // Verifico si el producto ya existe en el carrito
        const productoExistente = this.productos.find((producto) => producto.sku === sku);
        if (productoExistente) {
            productoExistente.cantidad += cantidad;
        } else {
            // Creo un nuevo producto en el carrito
            const nuevoProducto = new ProductoEnCarrito(sku, producto.nombre, cantidad);
            this.productos.push(nuevoProducto);
        }

        this.precioTotal += producto.precio * cantidad;

        // Actualizo la lista de categorías solo si la categoría no está presente
        if (!this.categorias.includes(producto.categoria)) {
            this.categorias.push(producto.categoria);
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * función que elimina @{cantidad} de productos con @{sku} del carrito
 */
eliminarProducto(sku, cantidad) {
    return new Promise((resolve, reject) => {
        console.log(`Eliminando ${cantidad} ${sku}`);

        const productoIndex = this.productos.findIndex((producto) => producto.sku === sku);
        if (productoIndex !== -1) {
            const productoExistente = this.productos[productoIndex];
            if (cantidad < productoExistente.cantidad) {
                productoExistente.cantidad -= cantidad;
            } else {
                this.productos.splice(productoIndex, 1);
            }

            this.precioTotal -= productoExistente.precio * cantidad;

            resolve();
        } else {
            reject(`Product ${sku} not found in the cart`);
        }
    });
}
}

// Cada producto que se agrega al carrito es creado con esta clase
class ProductoEnCarrito {
sku;       // Identificador único del producto
nombre;    // Su nombre
cantidad;  // Cantidad de este producto en el carrito

constructor(sku, nombre, cantidad) {
    this.sku = sku;
    this.nombre = nombre;
    this.cantidad = cantidad;
}
}

// Función que busca un producto por su sku en "la base de datos"
function findProductBySku(sku) {
return new Promise((resolve, reject) => {
    setTimeout(() => {
        const foundProduct = productosDelSuper.find((product) => product.sku === sku);
        if (foundProduct) {
            resolve(foundProduct);
        } else {
            reject(`Product ${sku} not found`);
        }
    }, 1500);
});
}

const carrito = new Carrito();
carrito.agregarProducto('WE328NJ', 2)
.then(() => {
    console.log(carrito);
    return carrito.agregarProducto('WE328NJ', 2);
})
.then(() => {
    console.log(carrito);
    return carrito.eliminarProducto('WE328NJ', 1);
})
.then(() => {
    console.log(carrito);
    return carrito.eliminarProducto('WE328NJ', 3);
})
.catch((error) => {
    console.log(error);
});