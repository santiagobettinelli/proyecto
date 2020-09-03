
let productdata = undefined;

function showProductInfo(producto){
    let hmtltoappend = 
    `<h3>`+producto.name+`</h3>
     <hr>
     <p>`+producto.description+`</p>
     <h4>`+producto.currency+` `+producto.cost+`</h4>
     <div class="row text-center text-lg-left pt-2">
       `
    for (let i = 0; i < producto.images.length; i++) {
        imagen = producto.images[i];
        hmtltoappend +=`
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imagen + `" alt="">
            </div>
        </div>
        `
    }
    hmtltoappend+=`
    </div>
    `;
    document.getElementById("toappend").innerHTML=hmtltoappend;
};

function showComents(comentarios){
    htmltoappend = "";
    for (let i = 0; i < comentarios.length; i++) {
        const element = comentarios[i];
        htmltoappend +=`
        <h3>Usuario: `+element.user+`</h3>
        <p>`+element.description+`</p>
        <p>`+element.dateTime+`</p>
        <h2>Puntuacion: `+element.score+`<h2>
        <br>
        `
    }
    document.getElementById("toappendcomments").innerHTML+=htmltoappend;
}
function noInfo(){
    document.getElementById("toappendcomments").innerHTML="";
    var parrafo = document.createElement("h3");
    parrafo.appendChild(document.createTextNode("Lo sentimos pero no hay informacion de ese producto"));
    document.getElementById("toappend").appendChild(parrafo); 
}

// function noInfo(){
//     htmltoappend =`
//     <h3>Lo sentimos pero no hay informacion de ese producto</h3>
//     <a href="products.html"><h5> PRESIONE AQUÍ PARA VOLVER A LOS PRODUCTOS</h5></a>`;
//     document.getElementById("toappendcomments").innerHTML=htmltoappend;
// }
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    if(location.href.endsWith("ChevroletOnixJoy")){
        getJSONData(PRODUCT_INFO_URL).then(result => {
            productdata = result.data
            console.log(productdata)
            showProductInfo(productdata);
            });
        document.getElementById("showcomments").addEventListener("click",function(){
            getJSONData(PRODUCT_INFO_COMMENTS_URL).then(result => showComents(result.data))
        });
    } else noInfo();
});