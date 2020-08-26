//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function verificacion(){
    if (document.getElementById("nombreusuario").value!="" && document.getElementById("password").value!=""){
        let usuario = {
            nombre: document.getElementById("nombreusuario").value,
            password: document.getElementById("password").value
        };
        let usuarioString = JSON.stringify(usuario);
        localStorage.setItem("usu", usuarioString);
        sessionStorage.setItem("visitado","true");
        window.location.replace("index.html");
    }
};

document.addEventListener("DOMContentLoaded", function(e){
    

});

