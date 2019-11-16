var items = [];

var serverURL = "http://restclass.azurewebsites.net";

function getCatalogFromServer(){
 
     $.ajax({
         url: serverURL + "/API/points",
         type: "GET",
         success: function(res) {
             console.log("Server responded OK", res);

              for (var i=0; i<res.length; i++){
                var theItem = res[i];

                if (theItem.user == "Martin"){
                    
                    items.push(theItem);
                }
                }
            
                displayCatalog();
            },

         error: function(error){
             console.log("error on request", error)
         }


     });
}
function displayCatalog() {


     for(var i=0; i<items.length; i++){
         var product = items[i];

        displayItem(product);
        
     }
}

function displayItem(product){

    var pLayout = `<div class="item">
    <img src="images/${product.image}"> 
    <h4>${product.title}</h4>
    <h6>${product.price}</h6>
    <p>${product.description}</p>
    <button class="btn btn-sm btn-info">Add to cart</button>
    </div>`; 

    $("#catalog").append(pLayout);

}


function search(){
    var txtSearch = $("#txtSearch").val();

    $("#catalog").html("");

     for(var i=0; i<items.length; i++){
         var product = items[i];
      
         if(
             product.title.toLowerCase().includes(txtSearch.toLowerCase())
             || product.price.toLowerCase().includes(txtSearch.toLowerCase())
             || product.description.toLowerCase().includes(txtSearch.toLowerCase())
             ) {
            displayItem(product);
         }
     }
}

function init() {
    console.log("catalog page");

    $("#btnSearch").click(search);
    $("#txtSearch").keypress(function(e){
        if(e.key == "Enter"){
            search();
            e.preventDefault(); 
            
        }
    })
    getCatalogFromServer();
 
}
window.onload = init;