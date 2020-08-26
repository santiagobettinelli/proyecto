var productsArray = [];

var showSpinner = function(){
    document.getElementById("spinner-wrapper").style.display = "block";
  }
  
  var hideSpinner = function(){
    document.getElementById("spinner-wrapper").style.display = "none";
  }

function showProductsList(array){
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let product = array[i];

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
});