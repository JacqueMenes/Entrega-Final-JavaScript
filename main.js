//Clase constructora
class Prenda {
    constructor(id, articulo, color, precio, imagen){
        //propiedades o atributos de nuestra clase
        this.id = id,
        this.articulo = articulo,
        this.color = color,
        this.precio = precio,
        this.imagen = imagen
    }
    //métodos
    mostrarData(){
   }
}

//Instanciación de objetos -- respetamos orden y cantidad de atributos

const prenda1 = new Prenda(1,"Campera de Jean","azul", 5000, "camperaJean.png")

const prenda2 = new Prenda(2,"Cartera de ecocuero","Violeta", 4500, "cartera.png")

const prenda3 = new Prenda(3,"Pantalon de Jeans", "Celeste", 3500, "jeans.png")

const prenda4 = new Prenda(4,"Musculosa Deportiva","Negra", 700, "musculosaNegra.png")

const prenda5 = new Prenda(5,"Remera manga corta", "Roja", 1000, "remeraRoja.png")

const prenda6 = new Prenda(6,"Saquito de hilo", "Rosa", 2000, "sacoRosa.png")

const prenda7 = new Prenda(7,"Cadena con Dijes", "Dorado", 2800, "cadenaDije.png")

const prenda8 = new Prenda(8,"Zapatos Carrie", "Azul", 15000, "zapatos.png")

//DESESTRUCTURACION CON ALIAS
let {articulo:article, precio:price} = prenda2


let productosEnCarrito = JSON.parse(localStorage.getItem("catalogo")) || []
let catalogo = []
//Guardar carrito en el Storage
//Revisa si existe en el local y lo trae 

//Operador ternario
localStorage.getItem("catalogo") ? catalogo = JSON.parse(localStorage.getItem("catalogo")) : catalogo.push(prenda1, prenda2, prenda3, prenda4, prenda5, prenda6, prenda7, prenda8), localStorage.setItem("catalogo", JSON.stringify(catalogo))


let divProductos = document.getElementById("productos")
function mostrarCatalogo(array){
    divProductos.innerHTML = ""
    array.forEach((prenda)=>{
        let nuevoProducto = document.createElement("div")
        nuevoProducto.setAttribute("class", "col")
        nuevoProducto.innerHTML = `<div id="${prenda.id}" class="card" style="width: 18rem;">
                                    <img class="card-img-top" style="height: 250px;" src="assets/${prenda.imagen}" alt="${prenda.articulo} de ${prenda.color}">
                                    <div class="card-body">
                                        <h4 class="card-title">${prenda.articulo}</h4>
                                        <p>Color: ${prenda.color}</p>
                                        <p class="">Precio: ${prenda.precio}</p>
                                        <button id="agregarBtn${prenda.id}" class="btn btn-outline-success btnComprar">Agregar al carrito</button>
                                    </div>
        </div>`
        divProductos.append(nuevoProducto)
        let btnAgregar = document.getElementById(`agregarBtn${prenda.id}`)
        btnAgregar.addEventListener("click", ()=>{
            agregarAlCarrito(prenda)
        })
    })
}

function agregarAlCarrito(prenda){
    productosEnCarrito.push(prenda)
    localStorage.setItem("tienda", JSON.stringify(productosEnCarrito))
}

function botonOcultar(){
    divProductos.innerHTML = ""
} 

//function nuevaPrenda actualiza a inputs!
function nuevaPrenda(array){
    let articuloInput = document.getElementById("articuloInput")
    let colorInput = document.getElementById("colorInput")
    let precioInput = document.getElementById("precioInput")
    let prendaCreada = new Prenda (array.length+1, articuloInput.value, colorInput.value, parseInt(precioInput.value), "nuevaImagen.jpg")
    array.push(prendaCreada)
    //Actualizamos Storage
    localStorage.setItem("tienda", JSON.stringify(array))
    //DESESTRUCTURACION
    let {id, articulo, color, precio} = prendaCreada

    //Provisorio resetear form
    articuloInput.value = ""
    colorInput.value = ""
    precioInput.value = ""
    mostrarCatalogo(array)
}

let lineaFinal = document.getElementById("lineaFinal")

//btnGuardar adjuntamos evento
let btnGuardar = document.getElementById("botonAgregar")
btnGuardar.addEventListener("click", ()=>{
    nuevaPrenda(catalogo),
    window.location.href ="#lineaFinal",
      Swal.fire({
        icon: 'warning',
        title: 'Producto Agregado con Exito',
        text: 'Podra verlo al final del catalogo'     
      })

})

//BtnMostrarCatalogo adjuntamos evento
let btnMostrarCatalogo = document.getElementById("botonMostrar")
btnMostrarCatalogo.addEventListener("click", ()=>{
    mostrarCatalogo(catalogo)    
    Swal.fire({
        icon: 'success',
        title: 'Your Style',
        text: 'A continuacion podra ver nuestro catalogo',
        showConfirmButton: false,
        timer: 2000
        })	
})


//Boton ocultar catalogo adjuntamos evento
let btnOcultarCatalogo = document.getElementById("botonOcultar")
btnOcultarCatalogo.onclick = botonOcultar

//DOM CARRITO
let botonCarrito = document.getElementById("btnCarrito")
let modalBody = document.getElementById("modal-body")
let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")
let parrafoCompra = document.getElementById("precioTotal")


botonCarrito.addEventListener("click", ()=>{
    cargarProductosCarrito(productosEnCarrito)
})
function cargarProductosCarrito(array){


    array.forEach((productoCarrito)=>{ // OPERADOR ++
        modalBody.innerHTML += ` 
        <div class="card border-primary sm-2" id ="productoCarrito${productoCarrito.id}" style="max-width: 350px;">
        <img class="card-img-top" src="assets/${productoCarrito.imagen}" alt="${productoCarrito.articulo}">
        <div class="card-body">
                <h4 class="card-title">${productoCarrito.articulo}</h4>
                <p class="card-text">${productoCarrito.color}</p>
                <p class="card-text">$${productoCarrito.precio}</p> 
                <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
        </div>    
    </div>`
    })
    //calcular el total
    compraTotal(array)

//Boton eliminar producto del carrito
array.forEach((productoCarrito, indice)=>{
    document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click",()=>{
        array.splice(indice, 1)
        //eliminarlo del storage
        localStorage.setItem("tienda", JSON.stringify(array))
        //eliminarlo del DOM
        let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
        cardProducto.remove()
        //Recalcula total
        compraTotal(array)
        // cargarProductosCarrito(array)

    })

})    
}

function compraTotal(array){
    let acumulador = 0
    acumulador = array.reduce((acumulador, productoCarrito)=>{
        return acumulador + productoCarrito.precio
    },0)
    //OPERADOR TERNARIO
    acumulador == 0 ? parrafoCompra.innerHTML = `<strong>No hay productos en el carrito</strong>` : parrafoCompra.innerHTML = `El total de su carrito es ${acumulador}`
}
