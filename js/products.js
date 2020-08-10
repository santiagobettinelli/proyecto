var categoriesArray = [];

function showCategoriesList(array){
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let category = array[i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + category.imgSrc + `" alt="` + category.name + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h3 class="mb-1">`+ category.name +`</h3>
                        <small class="text-muted">` + category.soldCount + ` artículos</small>
                    </div>
                    <p>`+category.description + `</p> 
                    <h3>`+category.currency+` `+category.cost+` 
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
            categoriesArray = resultObj.data;
            //Muestro las categorías ordenadas
            showCategoriesList(categoriesArray);
        }
        hideSpinner();
    })
});