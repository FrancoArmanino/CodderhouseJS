/* Esta función se encarga de crear HTML para agregar un producto a la interfaz. Se debe proporcionar el nombre, precio y la ruta de la imágen del producto
 */




function addProd(nombre, precio, img){
    
    img = `<img class=new-prod src="${img}">`;
    nombre = `<h2>${nombre}</h2>`;
    precio = `<p>${precio}</p>`;  

    return [img,nombre,precio];
}

class usuario {
    
    constructor (nombre,apellido,email,total=0) {
        this.nombre = nombre
        this.apellido = apellido
        this.email = email
        this.carrito = []
        this.total = total
    }
}

const checkUser = () => { //Chequear si hay algun usuario logueado o compra sin finalizar
    let currentUser = localStorage.getItem("currentUser")  

    if (currentUser === "Null") {
        return false
    }
    return currentUser
}

const cartOperation = (obj,currentUser) =>{
    total += parseInt(obj.value)
    id = obj.id
    currentUser.carrito.push(nombre[id])
    currentUser.total = total
    localStorage.setItem("currentUser", JSON.stringify(currentUser))

    Swal.fire({
        title: `${nombre[id]} añadido al carrito!`,
        text: `El total es: USD$${total}`,
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Seguir Comprando!',
        cancelButtonText: 'Finalizar Compra'
    }).then((result) => {
        if (!result.isConfirmed) {
            Swal.fire(`El total de la compra es USD$${total}`)
            total = 0
            localStorage.clear()
        }
    })
    

}

const addToCart = function(){

    let currentUser = checkUser()
    obj = this
    if (currentUser) {
        currentUser = JSON.parse(currentUser)
        cartOperation(obj,currentUser)
    
    }else {
            (async () => {

                const { value: formValues } = await Swal.fire({
                    title: 'Registro de Usuario',
                    html:
                    '<input id="swal-input1" class="swal2-input" placeholder="Nombre">' +
                    '<input id="swal-input2" class="swal2-input" placeholder="Apellido">' +
                    '<input id="swal-input3" class="swal2-input" placeholder="Email">',
                    focusConfirm: false,
                    preConfirm: () => {
                        return [
                            document.getElementById('swal-input1').value,
                            document.getElementById('swal-input2').value,
                            document.getElementById('swal-input3').value
                        ]
                    }
                })

                currentUser = new usuario(formValues[0],formValues[1],formValues[2])
                localStorage.setItem("currentUser", JSON.stringify(currentUser))
                cartOperation(obj,currentUser)
            })()
        }

}

function moverseA(idElemento) {
    location.hash = "#" + idElemento;
  }

function captura(){  //captura del elemento buscado
    let prodSearch = document.getElementById("busqueda").value
    prodSearch = prodSearch.toLowerCase()
    if (nombreModif.some( (nomb) => nomb == prodSearch)){
        let prodId = nombreModif.indexOf(prodSearch)
        let seleccionado = document.getElementById(prodId)
        moverseA(prodId)
    }else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ese producto no existe',
            timer: 5000
          })
          moverseA("nav")
    }
}


const contenedor = document.querySelector(".prod-grid") //contenedor donde se arma el grid de productos
let documentFragment = document.createDocumentFragment();
let nombre = ["Nike","Adidas", "Jordan", "Topper", "Puma", "Reebok"];
let nombreModif = nombre.map( (nomb) => nomb.toLowerCase())
let total = 0

let busqueda = document.getElementById("btn-busqueda")


for(let i = 0; i<nombre.length; i++){
    let precioAleatorio = Math.round(Math.random()*100 + 200);
    let prod = null

    if(precioAleatorio<240){ //Si el precio es menor a 240 se coloca un cartel de oferta
        prod = addProd(nombre[i], `<b>USD $${precioAleatorio} SALE!!</b>`,`./img/zapatilla${i}.png`);
    }else {
        prod = addProd(nombre[i], `USD $${precioAleatorio}`,`./img/zapatilla${i}.png`);
    }

    let buyBotton = `<button id=${i} type="submit" class="btn-mine3 addprod" value=${precioAleatorio}> + Add to Cart</button>`
    let div = document.createElement("DIV");
    div.classList.add(`item-${i}`,`item`);
    div.innerHTML = prod[0] + prod[1] + prod[2] + buyBotton;
    documentFragment.appendChild(div);
}

contenedor.append(documentFragment);


const botones = document.querySelectorAll(".addprod");

botones.forEach(boton => {
    boton.addEventListener("click", addToCart);
});

busqueda.onclick = captura







