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


function sortProducts( sortcriteria,array){
    let result = array;
    if (sortcriteria == descendenterelevancia){
        result.sort(function(a,b){
            if (a.soldCount > b.soldCount ){
            return -1;
            }else if (a.soldcount < b.soldcount){
            return 1;
            }else return 0;
        });
        return result;
    } else if ( sortcriteria == ascendenteprecio){
        result.sort(function(a,b){
            if (a.cost > b.cost){
                return  1;
            } else if (a.cost < b.cost){
                return -1;
            } else return 0;
        });
        return result
    } else if (sortcriteria == descendenteprecio){
        result.sort(function(a,b){
            if (a.cost > b.cost){
                return -1;
            } else if (a.cost < b.cost){
                return 1;
            } else return 0;
        })
        return result;
    };
};





function showProductsList(array){
    let htmlContentToAppend = "";
    let arraycopia = array;
    if (minprecio!= undefined && maxprecio != undefined){
        arraycopia = arraycopia.filter( producto =>
            (producto.cost >= minprecio && producto.cost <= maxprecio));
    }else if (minprecio != undefined || maxprecio != undefined){
         arraycopia = arraycopia.filter( producto =>
            ((minprecio != undefined && producto.cost >= minprecio) || (maxprecio != undefined && producto.cost <=maxprecio)))
    };  
    if (arraycopia.length != 0){
        for(let i = 0; i < arraycopia.length; i++){
            let product = arraycopia[i];

            htmlContentToAppend += `
            <div class="col-12 col-sm-6 col-md-4">
                <div class="card">
                    <a href="product-info.html?producto= `+ product.name +`" class="list-group-item list-group-item-action">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `"class="card-img-top">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name +`</h4>
                            <small class="text-muted">` + product.cost + " " + product.currency + ` </small>
                        </div>
                        <p class="mb-1">` + product.description + `</p>
                        <span class="align-bottom">` +"Total vendidos:"+" "+ product.soldCount + `</span>
                    </a>
                </div>
            </div>
           `
            ;
        };
        document.getElementById("fila").innerHTML = htmlContentToAppend;
    } else {
        document.getElementById("fila").innerHTML = "";
    }
};
function showPoductsByLetter(){
    var htmlContentToAppend="";
    var word = document.getElementById("buscador").value;
    for (let index = 0; index < productsArray.length; index++) {
        const product = productsArray[index];
        const productname = product.name.toLowerCase();
        if (productname.search(word.toLowerCase())!==-1){
             htmlContentToAppend += `
             <div class="col-12 col-sm-6 col-md-4">
                <div class="card">
                    <a href="product-info.html?producto= `+ product.name +`" class="list-group-item list-group-item-action">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `"class="card-img-top">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name +`</h4>
                            <small class="text-muted">` + product.cost + " " + product.currency + ` </small>
                        </div>
                        <p class="mb-1">` + product.description + `</p>
                        <span class="align-bottom">` +"Total vendidos:"+" "+ product.soldCount + `</span>
                    </a>
                </div>
            </div>`
                
          
            ;
            
        } 
    };
    document.getElementById("fila").innerHTML = htmlContentToAppend;
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    showSpinner();
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if(resultObj.status=="ok"){
            productsArray = resultObj.data;
            showProductsList(sortProducts(descendenteprecio,productsArray));
        }
        hideSpinner();
    })

    document.getElementById("sortAscPrecio").addEventListener("click", function(){
        showProductsList(sortProducts(ascendenteprecio, productsArray))
    });

    document.getElementById("sortDescPrecio").addEventListener("click", function(){
        showProductsList(sortProducts(descendenteprecio, productsArray))
    });
    
    document.getElementById("sortPorRelevancia").addEventListener("click", function(){
        showProductsList(sortProducts(descendenterelevancia, productsArray))
    });
    

    document.getElementById("borrarRangoFiltrado").addEventListener("click", function (){
        minprecio = undefined;
        maxprecio = undefined;
        document.getElementById("filtradoPrecioMinimo").value = "";
        document.getElementById("filtradoPrecioMaximo").value = "";
        showProductsList(productsArray);
    });
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
    });
    document.getElementById("buscador").addEventListener("keyup", (event) => {
        showPoductsByLetter();
    } );
    document.getElementById("buscador").addEventListener("input", (event) => {
        if ( document.getElementById("buscador").value ==""){
            showProductsList(productsArray);
        };
    });


});