const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];
cargarEventListeners();

function cargarEventListeners() {
    carrito.addEventListener('click', eliminarCurso);
        vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        // console.log(articulosCarrito);
        console.log(JSON.parse(localStorage.getItem('carrito')))
        // Cuando se elimina un curso del carrito
     
        carritoHTML();
   });


}
function eliminarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar-curso')) {
         // e.target.parentElement.parentElement.remove();
         const cursoId = e.target.getAttribute('data-id')

         // Eliminar del arreglo del carrito
         articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

         carritoHTML();
    }
}
function carritoHTML() {

    vaciarCarrito();
    articulosCarrito.forEach(curso => {
         const row = document.createElement('tr');
         row.innerHTML = `
              <td>${curso.titulo}</td>
              <td>${curso.precio}</td>
              <td>${curso.cantidad} </td>
              <td>
                   <a href="#" class="borrar-curso" data-id="${curso.id}">x</a>
              </td>
         `;
         contenedorCarrito.appendChild(row);
    });

    // NUEVO:
    sincronizarStorage();

}
// NUEVO: 
function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// Elimina los cursos del carrito en el DOM
function vaciarCarrito() {
    // forma rapida (recomendada)
    while(contenedorCarrito.firstChild) {
         contenedorCarrito.removeChild(contenedorCarrito.firstChild);
     }
}