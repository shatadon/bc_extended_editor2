//No click event
if (jQuery('input[type="hidden"][name="product_id"]').length === 0) {
  //Do nothing
} else {
  jQuery("body").addClass("bc-editor");
  jQuery(".bc-editor").prepend("<button type='button' id='editor-btn' class='btn btn-primary' data-toggle='modal' data-target='#exampleModalLong'><i class='fa fa-pencil-square-o' aria-hidden='true'></i><img class='hilogo' src='http://35.196.61.186/wp-content/uploads/2017/10/hiintel2.png'/>&nbsp;Edit This Product</button>");
}  //end If statement

function get_products() {
    chrome.storage.sync.get({
      'client_ID':'',
      'auth_Token':'',
  		'store_Hash':''
    }, function(items) {
      var productID = jQuery('input[type="hidden"][name="product_id"]').val();
      var apiURL = "https://api.bigcommerce.com/stores/" + items.store_Hash + "/v3/catalog/products/" + productID + "?include=variants,custom_fields";
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": apiURL,
        "method": "GET",
        "headers": {
            "x-auth-token": items.auth_Token,
            "x-auth-client": items.client_ID,
            "cache-control": "no-cache"
          }
        };
        $.ajax(settings).done(function (response) {
            // console.log(response.data);
            // TODO : Seperate the returned sections values into tabs the same way you would see it in the control panel

            jQuery('body').prepend(
              '<div id="pop-up-container">'
              +
              '<div tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">'
              +
              '<div class="modal-dialog" role="document"><div class="modal-content">'
              +
              '<div class="modal-header">'
              +
              '<button id="save_changes_header" class="btn btn-secondary">save changes</button>'
              +
              '<h5 class="Product Name" id="exampleModalLongTitle">'+response.data.name+'</h5>'
              +
              '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'
              +
              '<span aria-hidden="true">&times;</span>'
              +
              '</button></div>'
              +
              '<div class="modal-body container"><ul class="nav nav-tabs">'
              +
              '<li role="presentation" class="active" data-tab="details"><a href="#">Details</a></li>'
              +
              '<li role="presentation" data-tab="media"><a href="#">Images and videos</a></li>'
              +
              '<li role="presentation" data-tab="inventory"><a href="#">Inventory</a></li>'
              +
              '<li role="presentation" data-tab="other"><a href="#">Other details</a></li>'
              +
              '</ul></div>'
              +
              '<div class="modal-footer">'
              +
              '<button type="button" id="closeBottom" class="btn btn-secondary closeBottom" data-dismiss="modal">Close</button>'
              +
              '<button type="button" class="btn btn-primary">Save changes</button>'
              +
              '</div></div></div></div></div>'); //end create modal

              // Tab content Block
              $(".modal-body").append('<div id="details" class="tabContent active"></div>');
              $(".modal-body").append('<div id="media" class="tabContent"></div>');
              $(".modal-body").append('<div id="inventory" class="tabContent"></div>');
              $(".modal-body").append('<div id="other" class="tabContent"></div>');

              // content for Details Tab
              $("#details").append('<div class="col-sm-4 col-md-2"><label>Name:</label><input type="text" value="' + response.data.name +'"/></div>');
              $("#details").append('<div class="col-sm-4 col-md-2"><label>Sku:</label><input type="text" value="' + response.data.sku +'"/></div>');
              $("#details").append('<div class="col-sm-4 col-md-2"><label>Price:</label><input type="text" value="' + response.data.price +'"/></div>');
              $("#details").append('<div class="col-sm-4 col-md-2"><label>Description:</label><textarea id="desc">'+ response.data.description +'</textarea></div>');

              //Media Tab content
              $("#media").append('<div class="col-sm-4 col-md-2"><label>Images:</label><img src="'+response.data.variants[0].image_url+'"/></div>');

              //Inventory Tab content
              $("#inventory").append('<div class="col-sm-4 col-md-2"><label>Inventory Tracking:</label><select id="invTracking"><option value="none">None</option><option value="product">Product</option></select></div>');
              $("select#invTracking").val(response.data.inventory_tracking);
              $("#inventory").append('<div class="col-sm-4 col-md-2"><label>Inventory Warning Level:</label><input type="text" value="'+ response.data.inventory_warning_level +'"/></div>');
              $("#inventory").append('<div class="col-sm-4 col-md-2"><label>Inventory Level:</label><input type="text" value="'+ response.data.inventory_level +'"/></div>');


              //cancel changes
              jQuery('.close, .closeBottom').on('click', cancel_edit);

              //control Tab click
              jQuery('#pop-up-container ul.nav.nav-tabs li a').click(function(){
            		var tab_id = jQuery(this).parent('li').attr('data-tab');
            		jQuery('#pop-up-container ul.nav.nav-tabs li').removeClass('active');
            		jQuery('#pop-up-container div.tabContent').removeClass('active');
            		jQuery(this).addClass('active');
            		jQuery("#"+tab_id).addClass('active');
            	});

          }); //end response ajax
        }); // end Storage get function

} // end get product function

function cancel_edit() {
  $('#pop-up-container').remove();
}

function cancel_edit() {
  $('#pop-up-container').remove();
}
document.getElementById('editor-btn').addEventListener('click', get_products);




// //Click Event
// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     if( request.message === "clicked_browser_action" ) {
//
//     }
//   }
// );
