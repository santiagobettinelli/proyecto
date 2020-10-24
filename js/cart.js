const toUSD = 0.025;
const toUYU = 40;
const standard = 0.05;
const express = 0.07;
const premium = 0.15;
const regxtarjbody = /^\d{4}-?\d{4}-?\d{4}-?\d{4}$/;
const regxtarjcodseg = /^\d{3,4}$/;
const regxmonth = /^\d{2}\/\d{2}$/;
const regxtransfer = /^\d{10,20}$/;
function showProductsInCart(articulos, coleccion){
    var htmltoappend = "";
    let nohayarticulos = false;
    for (let index = 0; index < coleccion.cantidades.length; index++) {
        const element = coleccion.cantidades[index];
        if(element !== 0){
            nohayarticulos = false;
            break;
        }else {
            nohayarticulos = true;
        }
        
    }
    if(nohayarticulos){
        let algo =document.getElementsByClassName("carrito");
        htmltoappend = `
        <h3> Tu carrito esta VACIO </h3>`
        algo[0].innerHTML=htmltoappend;
    }else {
        for (let i = 0; i< articulos.length; i++) {
            // las cantidades se utilizan como una bandera booleana, si estan en 0 significa
            // que el valor fue borrado y se debe saltear
            if(coleccion.cantidades[i]!==0){
                const articulo = articulos[i];
            htmltoappend+=`
            <div class="articulo">
                <img class="imagenarticulo" src=`+articulo.src+`>
                <div class ="titulocantidad">
                    <p>`+articulo.name+`<p/>
                    <select class="cantidadarticulo" name="cantidad" id="cantidad`+i+`" value="5">
                        `;
            for (let j = 1; j < 11; j++) {
                if (j == coleccion.cantidades[i]){
                    htmltoappend+=`
                    <option value="`+j+`"selected>`+j+`</option>`
                }else{
                    htmltoappend+=`
                <option value="`+j+`">`+j+`</option>`;
                }    
            };
            if(articulo.currency ==="UYU"){
            htmltoappend+=`
                    </select>
                </div>
                <div id="precios">
                <pid="precioarticulo`+i+`">Precio unitario: UYU `+articulo.unitCost+`</p>
                <p id="precioxcantidad`+i+`">Precio total del producto: UYU `+articulo.unitCost*coleccion.cantidades[i]+`</p>
                </div>
                <input type="button" value ="X" id="borrar`+i+`">
            </div>`
            coleccion.platatotal+= articulo.unitCost*coleccion.cantidades[i]*toUSD;
            } else {
                htmltoappend+=`
                </select>
                </div>
                <div id="precios">
                <pid="precioarticulo`+i+`">Precio unitario: USD `+articulo.unitCost+`</p>
                <p id="precioxcantidad`+i+`">Precio total del producto: USD `+articulo.unitCost*coleccion.cantidades[i]+`</p>
                </div>
                <input type="button" value ="X" id="borrar`+i+`">
            </div>`
            coleccion.platatotal+= articulo.unitCost*coleccion.cantidades[i];
            }
            }
            
            
        };
        document.getElementById("productos").innerHTML=htmltoappend;
        document.getElementById("subtotal").innerHTML="Sub Total:  USD "+coleccion.platatotal ;
        document.getElementById("precioenvio").innerHTML="Precio de envio: USD " + (coleccion.platatotal*standard);
        document.getElementById("totalapagar").innerHTML="Precio Final: USD "+ (coleccion.platatotal*standard + coleccion.platatotal);
        
    }
     
    

}

let radios = document.getElementsByName("tipopago");
radios[0].addEventListener("click", function(){
    document.getElementById("tbank").setAttribute("disabled","");
    document.getElementById("tarjetacuerpo").removeAttribute("disabled")
    document.getElementById("codigoseg").removeAttribute("disabled")
    document.getElementById("month").removeAttribute("disabled");
});
radios[1].addEventListener("click", function(){
    document.getElementById("tbank").removeAttribute("disabled")
    document.getElementById("tarjetacuerpo").setAttribute("disabled","");
    document.getElementById("codigoseg").setAttribute("disabled","");
    document.getElementById("month").setAttribute("disabled","");
})
// funcion de verificación que se ejecuta al apretar el boton Comprar 
function verifypurchase(event){
   
    let faltainfo = true;
    let radios = document.getElementsByName("tipopago");
    let numtarjeta = document.getElementById("tarjetacuerpo").value;
    let codigosegtarjeta = document.getElementById("codigoseg").value;
    let mes = document.getElementById("month").value;
    let transfer = document.getElementById("tbank").value;
    let calle = document.getElementById("calle");
    let numpuerta = document.getElementById("numerop");
    let esquina = document.getElementById("esquina");
    let pais = document.getElementById("pais");
    if(calle.value!=="" && numpuerta.value!==""&&esquina.value!==""&& pais.value!==""){
        if(radios[0].checked){
            if(regxtarjbody.test(numtarjeta) && regxtarjcodseg.test(codigosegtarjeta)&& regxmonth.test(mes)){
                faltainfo=false
            }
        }else if( radios[1].checked){
            if(regxtransfer.test(transfer)){
                faltainfo =false
            }
          
        };
    } 
    if(!faltainfo){
        getJSONData(CART_BUY_URL)
        .then(datos => {
            console.log("aqui llegue");
            console.log(datos.data.msg)
            alert(datos.data.msg);
        })
    } else {
        event.preventDefault();
        alert("Faltan llenar datos claves, por favor intente de nuevo");
    }

}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){
    showSpinner();
    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function(resultObj){
        var articulos = resultObj.data.articles;
        // defino un objeto que tiene 2 propiedades, un array que son las cantidades de los objetos del carrito 
        // y platatotal que es el valor de todos los productos por sus cantidades
        var coleccion = {
            cantidades:[],
            platatotal : 0
        };
        for (let index = 0; index < articulos.length; index++) {
            const element = articulos[index];
            coleccion.cantidades.push(element.count)
            
        };
        showProductsInCart(articulos, coleccion);
        hideSpinner();
        //en esta funcion se preparan los addEventListeners para los cambios en la cantidad y para borrar objetos 
        function prepararEventos(){
            for (let i = 0; i < articulos.length; i++) {
                // las cantidades se utilizan como una bandera booleana, si estan en 0 significa
                // que el valor fue borrado y se debe saltear
                if(coleccion.cantidades[i]!==0){
                    const element = articulos[i];
                document.getElementById("cantidad"+i).addEventListener("change",function(){
                    coleccion.cantidades[i]=parseInt(document.getElementById("cantidad"+i).value)
                    if(element.currency==="USD"){
                        document.getElementById("precioxcantidad"+i).innerHTML="Precio total del producto: USD "+coleccion.cantidades[i]*element.unitCost   
                    } else {
                        document.getElementById("precioxcantidad"+i).innerHTML="Precio total del producto: UYU "+coleccion.cantidades[i]*element.unitCost
                    }
                    
                    coleccion.platatotal=0
                    for ( let j = 0; j < articulos.length; j++ ){
                        const articulo = articulos[j];
                        if(articulo.currency === "UYU"){
                            coleccion.platatotal += articulo.unitCost*coleccion.cantidades[j]*toUSD
                        } else {
                            coleccion.platatotal += articulo.unitCost*coleccion.cantidades[j];
                        }
                    }
                    document.getElementById("subtotal").innerHTML="Sub Total:  USD "+coleccion.platatotal;
            });
                document.getElementById("borrar"+i).addEventListener("click", function(){
                    coleccion.platatotal=0;
                    coleccion.cantidades[i]=0;
                    showProductsInCart(articulos,coleccion);
                    prepararEventos();
                })        
            };
                }
                
        };
        prepararEventos();
        var radiostipoenvio = document.getElementsByName("tipoenvio");
        radiostipoenvio.forEach(radio => radio.addEventListener("change", () => {
            if( radio.value === "s" ){
                document.getElementById("precioenvio").innerHTML="Precio de envio: USD " + (coleccion.platatotal*standard);
                document.getElementById("totalapagar").innerHTML="Precio Final: USD "+ (coleccion.platatotal*standard + coleccion.platatotal);
            }else if(radio.value=== "e"){
                document.getElementById("precioenvio").innerHTML="Precio de envio: USD " + (coleccion.platatotal*express);
                document.getElementById("totalapagar").innerHTML="Precio Final: USD "+ (coleccion.platatotal*express + coleccion.platatotal);
            }else {
                document.getElementById("precioenvio").innerHTML="Precio de envio: USD " + (coleccion.platatotal*premium);
                document.getElementById("totalapagar").innerHTML="Precio Final: USD "+ (coleccion.platatotal*premium + coleccion.platatotal);
            }
        })  

        );
    });
   
});