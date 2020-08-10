//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function verificacion(){
    if (document.getElementById("nombreusuario").value!="" && document.getElementById("password").value!=""){
        sessionStorage.setItem("visitado","true");
        window.location.href="index.html";
    }
};
document.addEventListener("DOMContentLoaded", function(e){
    

});