//variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciaCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargaEventListerners();

function cargaEventListerners() {

    //Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //Eliminar curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar Carrito de Compras
    vaciaCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // reseteamos el arreglo
        
        LimpiarHTML(); // Eliminamos todo el HTML
    });
}

//funciones
function agregarCurso(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado);
    }
    
}

function eliminarCurso(e){
    
    if(e.target.classList.contains('borrar-curso')){
        const cursoID = e.target.getAttribute('data-id');

        //Elimina del arreglo de articulos del carrito por el data-id
        articulosCarrito = articulosCarrito.filter((curso ) => curso.id !== cursoID);

        carritoHTML();// Iterar sobre el carrito y mostrar su HTML


    }
}

//lee el contenido del HTML al que le demos click y extrae la informacion del curso

function leerDatosCurso(curso){
    //console.log(curso);

    //Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1

    }
    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
        if(existe){
            //Actualizamos la cantidad
            const cursos = articulosCarrito.map(curso => {
                if(curso.id === infoCurso.id){
                    curso.cantidad++;
                    return curso; // retorno el objeto actualizado
                }else {
                    return curso; // retorna los objetos que no son duplicados
                }
            });
            articulosCarrito=[...cursos];
        }else{
            //agrega elementos al arreglo de carrito
            articulosCarrito =[...articulosCarrito, infoCurso]
        }    


    //Agregar elementos al arreglo de carrito de compras
    //articulosCarrito =[...articulosCarrito, infoCurso];
    console.log(articulosCarrito);

    carritoHTML();  
}  

function carritoHTML() {

    //Limpiar el HTML 
    LimpiarHTML();   

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso; 
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td> 
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}" > X </a>
            </td>
            `;

        //Agrega el HtMl del carrito en el body
        contenedorCarrito.appendChild(row);    
    })
}

//Elimina los cursos del tbody
function LimpiarHTML() {

    //Forma Lenta
    //contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

