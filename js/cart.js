
function showProductsInCart(articulos){
    var htmltoappend = "";
    var totalsinenvio = 0;
    for (let i = 0; i< articulos.length; i++) {
        const articulo = articulos[i];
        htmltoappend+=`
        <div class="articulo">
            <img class="imagenarticulo" src=`+articulo.src+`>
            <div class ="titulocantidad">
                <p>`+articulo.name+`<p/>
                <select class="cantidadarticulo" name="cantidad" id="cantidad`+i+`" value="5">
                    `;
        for (let i = 1; i < 11; i++) {
            if (i == articulo.count){
                htmltoappend+=`
                <option value="`+i+`"selected>`+i+`</option>`
            }else{
                htmltoappend+=`
            <option value="`+i+`">`+i+`</option>`;
            }    
        };
        if(articulo.currency ==="UYU"){
        htmltoappend+=`
                </select>
            </div>
            <div id="precios">
            <pid="precioarticulo`+i+`">Precio unitario: UYU `+articulo.unitCost+`</p>
            <p id="precioxcantidad`+i+`">Precio total del producto: UYU `+articulo.unitCost*articulo.count+`</p>
            </div>
        </div>`
        totalsinenvio+= articulo.unitCost*articulo.count*0.025;
        } else {
            htmltoappend+=`
            </select>
            </div>
            <div id="precios">
            <pid="precioarticulo`+i+`">Precio unitario: USD `+articulo.unitCost+`</p>
            <p id="precioxcantidad`+i+`">Precio total del producto: USD `+articulo.unitCost*articulo.count+`</p>
            </div>
        </div>`
        totalsinenvio+= articulo.unitCost*articulo.count;
        }
        
    };
    document.getElementById("productos").innerHTML=htmltoappend;
    document.getElementById("subtotal").innerHTML+=" USD "+totalsinenvio ;

}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){
    showSpinner();
    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function(resultObj){
        var articulos = resultObj.data.articles;
        showProductsInCart(articulos);
        hideSpinner();
        for (let i = 0; i < articulos.length; i++) {
            const element = articulos[i];
            document.getElementById("cantidad"+i).addEventListener("change",function(){
                var cantidadnueva = document.getElementById("cantidad"+i).value;
                if(element.currency==="USD"){
                    document.getElementById("precioxcantidad"+i).innerHTML="Precio total del producto: USD "+cantidadnueva*element.unitCost   
                } else {
                    document.getElementById("precioxcantidad"+i).innerHTML="Precio total del producto: UYU "+cantidadnueva*element.unitCost
                }
                
                var platatotal = 0;
                for ( let j = 0; j < articulos.length; j++ ){
                    const articulo = articulos[j]
                    if(articulo.currency === "UYU"){
                        platatotal += articulo.unitCost*document.getElementById("cantidad"+j).value*0.025
                    } else {
                        platatotal += articulo.unitCost*document.getElementById("cantidad"+j).value;
                    }
                }
                document.getElementById("subtotal").innerHTML="Sub Total:  USD "+platatotal
        })
        }
    })



    
});