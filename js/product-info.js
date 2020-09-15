
var productData = undefined;
var commentsData = [];
var products = [];
var usuario = JSON.parse(localStorage.getItem("usu"));

const nombreproducto = decodeURI(window.location.search.substring(1));

function showProductInfo(producto){
    let hmtltoappend = 
    `<h3>`+nombreproducto+`</h3>
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
    <div  class="container p-5">
        <input type="button" id="showcomments" value="Mostrar/Ocultar comentarios y puntuaciones" onclick="spoiler()" >
    </div>
        <div id="toappendcomments" class= "container p-5" style="display: none;">
        </div>
    </div>
    <div id="relatedproducts" class="row text-center text-lg-left pt-2">
    </div>
    `;
    document.getElementById("toappend").innerHTML=hmtltoappend;
};
function crearhora(){
    var date = new Date();
    if(date.getMonth()<10){
        if (date.getDate()<10){
            date = date.getFullYear() +"-"+ "0" + (date.getMonth()+1)+"-"+ "0"+ date.getDate()+" "+ date.getHours()+":"+date.getMinutes()+ ":" +date.getSeconds();    
        } else {
            date = date.getFullYear() +"-"+ "0" + (date.getMonth()+1)+"-"+ date.getDate()+" "+ date.getHours()+":"+date.getMinutes()+ ":" +date.getSeconds();
        }
    } else if(date.getDate()<10){
        date = date.getFullYear() +"-"+(date.getMonth()+1)+"-"+ "0"+ date.getDate()+" "+ date.getHours()+":"+date.getMinutes()+ ":" +date.getSeconds();
            } else   {
                date = date.getFullYear() +"-"+(date.getMonth()+1)+"-"+ date.getDate()+" "+ date.getHours()+":"+date.getMinutes()+ ":" +date.getSeconds();
            };
    return date;
}

function tomardatos(event){
    event.preventDefault();
    const diahora = crearhora(); 
    nuevocomentario ={
        score: document.getElementById("puntuacion").value,
        description: document.getElementById("description").value,
        user: usuario.nombre,
        dateTime: diahora
    };
    commentsData.push(nuevocomentario);
    showComents(commentsData);

}
function spoiler(){
    if(document.getElementById("toappendcomments").style.display=="none"){
        document.getElementById("toappendcomments").style.display="";
    } else {
            document.getElementById("toappendcomments").style.display="none";
        }
};

function showComents(comentarios){
    document.getElementById("toappendcomments").innerHTML="";
    let htmltoappend = "";
    for (let i = 0; i < comentarios.length; i++) {
        const element = comentarios[i];
        htmltoappend +=`
        <div class="comentario">
            <h3>Usuario: `+element.user+`</h3>
            <p>`+element.description+`</p>
            <p>`+element.dateTime+`</p>
            <h3>Puntuacion: `+element.score+`<h3>
        </div>
        `
    }
    htmltoappend +=
    `<h3> Deja un comentario sobre el producto</h3>
    <form action="">
    <fieldset>
        <label for ="description">Comentario</label>
        <input type="text" name ="desctiption" id="description">
    </fieldset>
    <fieldset>
        <label for ="puntuacion">Puntuacion: </label>
        <input type="number" name="puntuacion" id="puntuacion" min="0" max="5" required>
    </fieldset>
    <fieldset>
        <input id ="tomar" type="button" onclick="tomardatos(event)" value ="Enviar">
    </form>`
 
    document.getElementById("toappendcomments").innerHTML+=htmltoappend;
}

function showrelatedproducts(relproducts,productdata){
    htmltoappend= "";
    let related = productData.relatedProducts;
    for (let i = 0; i < related.length; i++) {
        const element = related[i];
        const producto = relproducts[element];
        htmltoappend +=`
        <a href ="product-info.html?`+producto.name+`">
            <div class="col-lg-3 col-md-4 col-6">
                <div class="d-block mb-4 h-100">
                    <p>`+producto.name+`</p>
                    <img src="`+producto.imgSrc+`" class="img-fluid img-thumbnail">
                </div>
            </div>    
        </a>
        `
    };
    document.getElementById("relatedproducts").innerHTML+=htmltoappend;
};



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    showSpinner();
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        productData = resultObj.data;
        getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
            if(resultObj.status=="ok"){    
                commentsData= resultObj.data;
            };
            getJSONData(PRODUCTS_URL).then(function(resultObj){
                if(resultObj.status=="ok"){    
                    products = resultObj.data;
                    showProductInfo(productData);
                    showComents(commentsData);
                    showrelatedproducts(products, productData);
                }});
        });
        hideSpinner();
    });
});