var btnDelete = document.getElementById('delete');
var btnRotate = document.getElementById('rotate');
var btnMove = document.getElementById('move');


btnDelete.addEventListener('click', deletePressed);
btnRotate.addEventListener('click', rotatePressed);
btnMove.addEventListener('click', movePressed);

function deletePressed() {
    estado=1;  
}
function rotatePressed() {
    estado=2;
}
function movePressed() {
    estado=0;  
}
