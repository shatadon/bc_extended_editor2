//No click event
if (jQuery('input[type="hidden"][name="product_id"]').length === 0) {
  //Do nothing
} else {
  jQuery("body").addClass("bc-editor");
  jQuery(".bc-editor").prepend("<button type='button' id='editor-btn' class='btn btn-primary' data-toggle='modal' data-target='#exampleModalLong'><i class='fa fa-pencil-square-o' aria-hidden='true'></i><img class='hilogo' src='http://35.196.61.186/wp-content/uploads/2017/10/hiintel2.png'/>&nbsp;Edit This Product</button>");
}  //end If statement

function get_product() {
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
              '<button id="save_changes_header" class="btn btn-secondary saveProduct">save changes</button>'
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
              '<button type="button" class="btn btn-primary saveProduct">Save changes</button>'
              +
              '</div></div></div></div></div>'); //end create modal

              // Tab content Block
              $(".modal-body").append('<div id="details" class="tabContent active"></div>');
              $(".modal-body").append('<div id="media" class="tabContent"></div>');
              $(".modal-body").append('<div id="inventory" class="tabContent"></div>');
              $(".modal-body").append('<div id="other" class="tabContent"></div>');

              // content for Details Tab
              $("#details").append('<div class="col-sm-4 col-md-2"><label>Name:</label><input id="name" type="text" value="' + response.data.name +'"/></div>');
              $("#details").append('<div class="col-sm-4 col-md-2"><label>Sku:</label><input id="sku" type="text" value="' + response.data.sku +'"/></div>');
              $("#details").append('<div class="col-sm-4 col-md-2"><label data-toggle="tooltip" title="The price of the product">Price:</label><input id="price" type="number" min="0" step="0.01" data-number-to-fixed="2" data-number-stepfactor="100" value="' + response.data.price +'"/></div>');
              $("#details").append('<div class="col-sm-4 col-md-2"><label>Retail Price:</label><input id="retail_price" type="number" min="0" step="0.01" data-number-to-fixed="2" data-number-stepfactor="100" value="' + response.data.retail_price +'"/></div>');
              $("#details").append('<div class="col-sm-4 col-md-2"><label>Sale Price:</label><input id="sale_price" type="number" min="0" step="0.01" data-number-to-fixed="2" data-number-stepfactor="100" value="' + response.data.sale_price +'"/></div>');
              $("#details").append('<div class="col-sm-4 col-md-2"><label>Description:</label><textarea id="desc">'+ response.data.description +'</textarea></div>');
              $("#details").append('<div class="col-sm-4 col-md-2"><label>Type:</label><select id="type"><option value="physical">Physical</option><option value="digital">Digital</option></select></div>');
              $("select#type").val(response.data.type);
              $("#details").append('<div class="col-sm-4 col-md-2"><label>Weight:</label><input id="weight" type="text" value="' + response.data.weight +'"/></div>');
              $("#details").append('<div class="col-sm-4 col-md-2"><label>Height:</label><input id="height" type="text" value="' + response.data.height +'"/></div>');
              $("#details").append('<div class="col-sm-4 col-md-2"><label>Width:</label><input id="width" type="text" value="' + response.data.width +'"/></div>');
              $("#details").append('<div class="col-sm-4 col-md-2"><label>Depth:</label><input id="depth" type="text" value="' + response.data.depth +'"/></div>');
              $("#details").append('<div class="col-sm-4 col-md-2"><label>Product Visible:</label><select id="isVisible"><option value="true">True</option><option value="false">False</option></select></div>');
              $("select#isVisible").val(response.data.is_visible);
              $("#details").append('<div class="col-sm-4 col-md-2"><label>Featured:</label><select id="isFeatured"><option value="true">True</option><option value="false">False</option></select></div>');
              $("select#isFeatured").val(response.data.is_featured);
              $("#details").append('<div class="col-sm-4 col-md-2"><label>Warranty:</label><textarea id="warranty">'+ response.data.warranty +'</textarea></div>');
              $("#details").append('<div class="col-sm-4 col-md-2"><label>Bin Picking Number:</label><input id="bin" type="text" value="' + response.data.bin_picking_number +'"/></div>');
              $("#details").append('<div class="col-sm-4 col-md-2"><label>UPC:</label><input id="upc" type="text" value="' + response.data.upc +'"/></div>');
              $("#details").append('<div class="col-sm-4 col-md-2"><label>Availability:</label><select id="availability"><option value="available">Available</option><option value="disabled">Disabled</option><option value="preorder">Preorder</option></select></div>');
              $("select#availability").val(response.availability);
              $("#details").append('<div class="col-sm-4 col-md-2"><label>Availability Description:</label><input id="avail_desc" type="text" value="' + response.data.availability_description +'"/></div>');
              $("#details").append('<div class="col-sm-4 col-md-2"><label>Show Condition:</label><select id="showCondition"><option value="true">True</option><option value="false">False</option></select></div>');
              $("select#showCondition").val(response.data.is_condition_shown );
              $("#details").append('<div class="col-sm-4 col-md-2"><label>Condition:</label><select id="condition"><option value="New">New</option><option value="Used">Used</option><option value="Refurbished">Refurbished</option></select></div>');
              $("select#condition").val(response.condition);
              $("#details").append('<div class="col-sm-4 col-md-2"><label>Min Order Qty:</label><input id="min_qty" type="text" value="' + response.data.order_quantity_minimum +'"/></div>');
              $("#details").append('<div class="col-sm-4 col-md-2"><label>Max Order Qty:</label><input id="max_qty" type="text" value="' + response.data.order_quantity_maximum +'"/></div>');



              //Media Tab content
              $("#media").append('<div class="col-sm-4 col-md-2"><label>Images:</label><img src="'+response.data.variants[0].image_url+'"/><label>Upload Images:</label><input id="img_files" type="file" multiple/></div>');




              //Inventory Tab content
              $("#inventory").append('<div class="col-sm-4 col-md-2"><label>Inventory Tracking:</label><select id="invTracking"><option value="none">None</option><option value="product">Product</option></select></div>');
              $("select#invTracking").val(response.data.inventory_tracking);
              $("#inventory").append('<div class="col-sm-4 col-md-2"><label>Inventory Warning Level:</label><input id="inv_Warning" type="text" value="'+ response.data.inventory_warning_level +'"/></div>');
              $("#inventory").append('<div class="col-sm-4 col-md-2"><label>Inventory Level:</label><input id="inv_Level" type="text" value="'+ response.data.inventory_level +'"/></div>');





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

              //Save Button Action
              jQuery('.saveProduct').on('click', update_product);

          }); //end response ajax

        }); // end Storage get function

} // end get product function


function update_product() {
    chrome.storage.sync.get({
      'client_ID':'',
      'auth_Token':'',
  		'store_Hash':''
    }, function(items) {
      var productID = jQuery('input[type="hidden"][name="product_id"]').val();
      var apiURL = "https://api.bigcommerce.com/stores/" + items.store_Hash + "/v3/catalog/products/" + productID;

      // define product data
      var name = jQuery('input#name').val();
      var sku = jQuery('input#sku').val();
      var price = jQuery('input#price').val();
      var retail_price = jQuery('input#retail_price').val();
      var sale_price = jQuery('input#sale_price').val();
      var desc = jQuery('textarea#desc').html();
      var type = jQuery('select#type option:selected').val();
      var weight = jQuery('input#weight').val();
      var height = jQuery('input#height').val();
      var width = jQuery('input#width').val();
      var depth = jQuery('input#depth').val();
      var isVisible = jQuery('select#isVisible option:selected').val();
      var isFeatured = jQuery('select#isFeatured option:selected').val();
      var warranty = jQuery('textarea#warranty').html();
      var bin = jQuery('input#bin').val();
      var upc = jQuery('input#upc').val();
      var availability = jQuery('select#availability option:selected').val();
      var avail_desc = jQuery('input#avail_desc').val();
      var showCondition = jQuery('select#showCondition option:selected').val();
      var condition = jQuery('select#condition option:selected').val();
      var min_qty = jQuery('input#min_qty').val();
      var max_qty = jQuery('input#max_qty').val();
      var invTracking = jQuery('select#invTracking option:selected').val();
      var inv_Warning = jQuery('input#inv_Warning').val();
      var inv_Level = jQuery('input#inv_Level').val();

      var settings = {
        "async": true,
        "crossDomain": true,
        "url": apiURL,
        "method": "PUT",
        "headers": {
            "x-auth-token": items.auth_Token,
            "x-auth-client": items.client_ID,
            "cache-control": "no-cache"
          },
        "body": {
            "name": name,
            "type": type,
            "sku": sku,
            "description": desc,
            "weight": weight,
            "width": width,
            "depth": depth,
            "height": height,
            "price": price,
            "retail_price": retail_price,
            "sale_price": sale_price,
            "inventory_level": inv_Level,
            "inventory_warning_level": inv_Warning,
            "inventory_tracking": invTracking,
            "is_visible": isVisible,
            "is_featured": isFeatured,
            "warranty": warranty,
            "bin_picking_number": bin,
            "upc": upc,
            "availability": availability,
            "availability_description": avail_desc,
            "condition": condition,
            "is_condition_shown": showCondition,
            "order_quantity_minimum": min_qty,
            "order_quantity_maximum": max_qty
          }

      }; //end settings variable
      $.ajax(settings).done(function (response) {
            console.log("Success: " + response);
            var updateStatus = jQuery('.modal-body.container');
            jQuery(updateStatus).html("<h1 style='color:green;'>Product Updated Successfully!</h1>");
            setTimeout(function() {
              cancel_edit();
            }, 750);
      }).fail(function (response) {
            console.log("Fail Reason: " + response);
      }); //end response ajax

    }); // end Storage get function

} // end update product function

function cancel_edit() {
  $('#pop-up-container').remove();
}

jQuery('#editor-btn').on('click', get_product);




// //Click Event
// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     if( request.message === "clicked_browser_action" ) {
//
//     }
//   }
// );
