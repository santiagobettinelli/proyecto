var productsArray = [];
var currentsortcriteria = undefined;
var minprecio = undefined;
var maxprecio = undefined;
const ascendenteprecio = "AC-P";
const descendenteprecio = "DC-P";
const descendenterelevancia = "DC-R";


var showSpinner = function(){
    document.getElementById("spinner-wrapper").style.display = "block";
};
  
var hideSpinner = function(){
    document.getElementById("spinner-wrapper").style.display = "none";
};


// function sortProducts( sortcriteria,array){
//     let result = [];
//     if ()
// }





function showProductsList(array){
    let htmlContentToAppend = "";
    let arraycopia = array
    if (minprecio!= undefined && maxprecio != undefined){
        arraycopia = arraycopia.filter( producto =>
            (producto.cost >= minprecio && producto.cost <= maxprecio));
    }else if (minprecio != undefined || maxprecio != undefined){
         arraycopia = arraycopia.filter( producto =>
            ((minprecio != undefined && producto.cost >= minprecio) || (maxprecio != undefined && producto.cost <=maxprecio)))
    };  

    for(let i = 0; i < arraycopia.length; i++){
        let product = arraycopia[i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.name + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h3 class="mb-1">`+ product.name +`</h3>
                        <small>` + product.soldCount + ` artículos</small>
                    </div>
                    <p>`+product.description + `</p> 
                    <div style="text-align:right;"> 
                    <h3>`+product.currency+` `+product.cost+` </h3>
                    </div>
                </div>
                
            </div>
        </div>`
        ;

        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
    }
};

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    showSpinner();
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if(resultObj.status=="ok"){
            productsArray = resultObj.data;
            //Muestro las categorías ordenadas
            showProductsList(productsArray);
        }
        hideSpinner();
    })

    document.getElementById("borrarRangoFiltrado").addEventListener("click", function (){
        minprecio = undefined;
        maxprecio = undefined;
        document.getElementById("filtradoPrecioMinimo").value = "";
        document.getElementById("filtradoPrecioMaximo").value = "";
        showProductsList(productsArray);
    })
    document.getElementById("filtradoPrecio").addEventListener("click",function (){
        minprecio = document.getElementById("filtradoPrecioMinimo").value;
        maxprecio = document.getElementById("filtradoPrecioMaximo").value;
        if ((minprecio != undefined && minprecio != "")&& parseInt(minprecio)>=0){
            minprecio = parseInt(minprecio);
        }else {
            minprecio = undefined;
        };
        if ((maxprecio != undefined && maxprecio != "")&& parseInt(maxprecio)>=0){
            maxprecio = parseInt(maxprecio);
        }else {
            maxprecio = undefined;
        }

        showProductsList(productsArray);
    })

});