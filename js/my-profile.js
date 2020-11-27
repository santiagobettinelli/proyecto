//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let imagen = document.getElementById("imagen");
var storageimagen = JSON.parse(localStorage.getItem("IMAGEN"))
console.log(storageimagen)
if (storageimagen === null){
    imagen.addEventListener("load", function(){
        imagen.crossOrigin ="anonymous"
        imgCanvas = document.createElement("canvas");
        imgContext = imgCanvas.getContext("2d");
        imgCanvas.width = imagen.width;
        imgCanvas.height = imagen.height;
        imgContext.drawImage(imagen, 0, 0, imagen.width, imagen.height);
        localStorage.setItem("IMAGEN", JSON.stringify(imgCanvas.toDataURL("image/png")));
        console.log(JSON.parse(localStorage.getItem("IMAGEN")));
        
    

})
} else {
    imagen.setAttribute("src",storageimagen)
};
function spoiler(){
    if(document.getElementById("modificarperfil").style.display=="none"){
        document.getElementById("modificarperfil").style.display="";
    } else {
            document.getElementById("modificarperfil").style.display="none";
        }
};
function cambiarDatos(event){
    event.preventDefault()
    let nombrei = document.getElementById("nombreinput").value;
    let apellidoi = document.getElementById("apellidoinput").value;
    let edadi = document.getElementById("edadinput").value;
    let emaili = document.getElementById("emailinput").value;
    let telefonoi = document.getElementById("telefonoinput").value;

    let datausuario = JSON.parse(localStorage.getItem("DATAUSU")); 
    if (datausuario === null){
        datausuario = {
            nombre : nombrei,
            apellido : apellidoi,
            edad : edadi,
            email : emaili,
            telefono : telefonoi
        };
        document.getElementById("nombre").innerHTML ="Nombre: " + datausuario.nombre;
        document.getElementById("apellido").innerHTML ="Apellidos: " + datausuario.apellido;
        document.getElementById("edad").innerHTML ="Edad: " + datausuario.edad;
        document.getElementById("email").innerHTML ="Email: " + datausuario.email;
        document.getElementById("telefono").innerHTML ="Telefono: " + datausuario.telefono;
        


    }else {
        if(nombrei !== ""){
            datausuario.nombre = document.getElementById("nombreinput").value;
            document.getElementById("nombre").innerHTML = datausuario.nombre;
        };
        if(apellidoi !== ""){
            datausuario.apellido = document.getElementById("apellidoinput").value;
            document.getElementById("apellido").innerHTML = datausuario.apellido;
        };
        if(edadi !==""){
            datausuario.edad = document.getElementById("edadinput").value;
            document.getElementById("edad").innerHTML = datausuario.edad;
        };
        if(emaili !==""){
            datausuario.email = document.getElementById("emailinput").value;
            document.getElementById("email").innerHTML = datausuario.email;
        };
        if(telefonoi !==""){
            datausuario.telefono = document.getElementById("telefonoinput").value;
            document.getElementById("telefono").innerHTML = datausuario.telefono;
        }
    };
    localStorage.setItem("DATAUSU", JSON.stringify(datausuario));
    location.reload();
};

document.addEventListener("DOMContentLoaded", function (e) {
    let datausuario = JSON.parse(localStorage.getItem("DATAUSU")); 
    if(datausuario!== null){
        document.getElementById("nombre").innerHTML ="Nombre: " + datausuario.nombre;
        document.getElementById("apellido").innerHTML ="Apellidos: " + datausuario.apellido;
        document.getElementById("edad").innerHTML ="Edad: " + datausuario.edad;
        document.getElementById("email").innerHTML ="Email: " + datausuario.email;
        document.getElementById("telefono").innerHTML ="Telefono: " + datausuario.telefono;

    }

});