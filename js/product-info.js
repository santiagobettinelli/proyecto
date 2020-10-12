var commentsData = [];
var products = [];
var usuario = JSON.parse(localStorage.getItem("usu"));

var parametro = new URLSearchParams(location.search);
var nombreproducto = parametro.get("producto");

function showProductInfo(producto){
    var picstoappend = "";
    var indicatorstoappend = "";
    var hmtltoappend = 
    `<h2>`+nombreproducto+`</h2>
     <hr>
     <p>`+producto.description+`</p>
     <h4> PRECIO: `+producto.currency+` `+producto.cost+`</h4>
     <div>
     <div id="carouselpic" class="carousel slide" data-ride="carousel">
        <ol id="carind" class="carousel-indicators">
        </ol>
        <div id="inner" class="carousel-inner">
        </div>
        <a class="carousel-control-prev" href="#carouselpic" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselpic" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
     </div>
       `;
       hmtltoappend+=`
    <div id="botoncomentarios" >
        <input type="button" id="showcomments" value="Mostrar/Ocultar comentarios y puntuaciones" onclick="spoiler()" >
    </div>
        <div id="toappendcomments" class= "container p-5" style="display: none;">
        </div>
    </div>
    <h3 id="vea"> Vea también</h3>
    <div id="relatedproducts" >
    </div>
    
    `;
    document.getElementById("toappend").innerHTML=hmtltoappend;
    
    for (let i = 0; i < producto.images.length; i++) {
        if (i==0){
           indicatorstoappend=`
           <li data-target="#carouselpic" data-slide-to="0" class="active"></li>
           `
        }else {
            indicatorstoappend+=`
            <li data-target="#carouselpic" data-slide-to="`+i+`"></li>
            `
        }
    };
    for (let i = 0; i < producto.images.length; i++) {
        let imagen = producto.images[i];
        if (i==0){
           picstoappend =`
            <div class="carousel-item active">
                <img src="`+imagen+`" class="d-block w-100" >
            </div>
           ` 
        }else {
            picstoappend+=`
            <div class="carousel-item">
                <img src=`+imagen+` class="d-block w-100">
            </div>
            `
        }
    };
    document.getElementById("carind").innerHTML=indicatorstoappend;
    document.getElementById("inner").innerHTML=picstoappend;
    
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
    let htmltoappend="";
    let related = productdata.relatedProducts;
    for (let i = 0; i < related.length; i++) {
        const element = related[i];
        const producto = relproducts[element];
        htmltoappend +=`
        <a href ="product-info.html?producto=`+producto.name+`">
            <div>
                <div>
                    <p>`+producto.name+`</p>
                    <img src="`+producto.imgSrc+`" class="img-fluid img-thumbnail">
                    <p>`+producto.currency+``+producto.cost+`</p> 
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
    getJSONData(PRODUCT_INFO_URL)
    .then(resultObj => {
        showProductInfo(resultObj.data)
        return resultObj.data
    }) 
    .then(productinfo => {

        getJSONData(PRODUCT_INFO_COMMENTS_URL)
        .then(resultObj => {
            commentsData= resultObj.data;
            showComents(commentsData)
        });
        return productinfo;
    })
    .then(productinfo => {
        getJSONData(PRODUCTS_URL)
        .then(resultObj => {
            showrelatedproducts(resultObj.data, productinfo);
            hideSpinner();
        })
    })
});
