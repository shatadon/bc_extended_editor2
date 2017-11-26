//No click event


if (jQuery('input[type="hidden"][name="product_id"]').length === 0) {
  //Do nothing
} else {


    $.get(chrome.extension.getURL('templates/modal_popup.html'), function(data) {

        // Or if you're using jQuery 1.8+:
        $($.parseHTML(data)).prependTo('body');
    });
    get_product();

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
            var data = response.data;
              $("#pop-up-container").append('<div class="col-sm-4 col-md-2"><label>Name:</label><input id="name" type="text" value="' + data.name +'" /></div>');
               $("#pop-up-container").append('<div class="col-sm-4 col-md-2"><label>Sku:</label><input id="sku" type="text" value="' + data.sku +'" /></div>');
               $("#pop-up-container").append('<div class="col-sm-4 col-md-2"><label data-toggle="tooltip" title="The price of the product">Price:</label><input id="price" type="number" min="0" step="0.01" data-number-to-fixed="2" data-number-stepfactor="100" value="' + data.price +'"/></div>');
               $("#pop-up-container").append('<div class="col-sm-4 col-md-2"><label>Retail Price:</label><input id="retail_price" type="number" min="0" step="0.01" data-number-to-fixed="2" data-number-stepfactor="100" value="' + data.retail_price +'"/></div>');
               $("#pop-up-container").append('<div class="col-sm-4 col-md-2"><label>Sale Price:</label><input id="sale_price" type="number" min="0" step="0.01" data-number-to-fixed="2" data-number-stepfactor="100" value="' + data.sale_price +'"/></div>');
               $("#pop-up-container").append('<div class="col-sm-4 col-md-2"><label>Description:</label><textarea id="desc">'+ data.description +'</textarea></div>');
               $("#pop-up-container").append('<div class="col-sm-4 col-md-2"><label>Type:</label><select id="type"><option value="physical">Physical</option><option value="digital">Digital</option></select></div>');
               $("select#type").val(data.type);
               $("#pop-up-container").append('<div class="col-sm-4 col-md-2"><label>Weight:</label><input id="weight" type="text" value="' + data.weight +'"/></div>');
               $("#pop-up-container").append('<div class="col-sm-4 col-md-2"><label>Height:</label><input id="height" type="text" value="' + data.height +'"/></div>');
               $("#pop-up-container").append('<div class="col-sm-4 col-md-2"><label>Width:</label><input id="width" type="text" value="' + data.width +'"/></div>');
               $("#pop-up-container").append('<div class="col-sm-4 col-md-2"><label>Depth:</label><input id="depth" type="text" value="' + data.depth +'"/></div>');
               $("#pop-up-container").append('<div class="col-sm-4 col-md-2"><label>Product Visible:</label><select id="isVisible"><option value="true">True</option><option value="false">False</option></select></div>');
               $("select#isVisible").val(data.is_visible);
               $("#pop-up-container").append('<div class="col-sm-4 col-md-2"><label>Featured:</label><select id="isFeatured"><option value="true">True</option><option value="false">False</option></select></div>');
               $("select#isFeatured").val(data.is_featured);
               $("#pop-up-container").append('<div class="col-sm-4 col-md-2"><label>Warranty:</label><textarea id="warranty">'+ data.warranty +'</textarea></div>');
               $("#pop-up-container").append('<div class="col-sm-4 col-md-2"><label>Bin Picking Number:</label><input id="bin" type="text" value="' + data.bin_picking_number +'"/></div>');
               $("#pop-up-container").append('<div class="col-sm-4 col-md-2"><label>UPC:</label><input id="upc" type="text" value="' + data.upc +'"/></div>');
               $("#pop-up-container").append('<div class="col-sm-4 col-md-2"><label>Availability:</label><select id="availability"><option value="available">Available</option><option value="disabled">Disabled</option><option value="preorder">Preorder</option></select></div>');
               $("select#availability").val(response.availability);
               $("#pop-up-container").append('<div class="col-sm-4 col-md-2"><label>Availability Description:</label><input id="avail_desc" type="text" value="' + data.availability_description +'"/></div>');
               $("#pop-up-container").append('<div class="col-sm-4 col-md-2"><label>Show Condition:</label><select id="showCondition"><option value="true">True</option><option value="false">False</option></select></div>');
               $("select#showCondition").val(data.is_condition_shown );
               $("#pop-up-container").append('<div class="col-sm-4 col-md-2"><label>Condition:</label><select id="condition"><option value="New">New</option><option value="Used">Used</option><option value="Refurbished">Refurbished</option></select></div>');
               $("select#condition").val(response.condition);
               $("#pop-up-container").append('<div class="col-sm-4 col-md-2"><label>Min Order Qty:</label><input id="min_qty" type="text" value="' + data.order_quantity_minimum +'"/></div>');
               $("#pop-up-container").append('<div class="col-sm-4 col-md-2"><label>Max Order Qty:</label><input id="max_qty" type="text" value="' + data.order_quantity_maximum +'"/></div>');








              //cancel changes
              // jQuery('.close, .closeBottom').on('click', cancel_edit);

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
          // define product data
         var name = jQuery('input#name').prop("value");
         var sku = jQuery('input#sku').prop("value");
          var price = jQuery('input#price').prop("value");
          var retail_price = jQuery('input#retail_price').prop("value");
          var sale_price = jQuery('input#sale_price').prop("value");
          var desc = jQuery('textarea#desc').html();

    var data = JSON.stringify({
  "name": name,
  "sku": sku
});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("PUT", "https://api.bigcommerce.com/stores/8316qn/v3/catalog/products/2");
xhr.setRequestHeader("x-auth-client", "pkdj66fxj2obi15e794gwa31vgt7j1c");
xhr.setRequestHeader("x-auth-token", "at7y5ayx1vx3b7yrc87n2ecqo24phwc");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("cache-control", "no-cache");
xhr.setRequestHeader("postman-token", "b1f6a5b4-0940-3623-9ac3-b0357287bc88");

xhr.send(data);

//     chrome.storage.sync.get({
//       'client_ID':'',
//       'auth_Token':'',
//   		'store_Hash':''
//     }, function(items) {
//       var productID = jQuery('input[type="hidden"][name="product_id"]').val();
//       var apiURL = "https://api.bigcommerce.com/stores/" + items.store_Hash + "/v3/catalog/products/" + productID;
//
//       // define product data
//      var name = jQuery('input#name').prop("value");
//       var sku = jQuery('input#sku').prop("value");
//       var price = jQuery('input#price').prop("value");
//       var retail_price = jQuery('input#retail_price').prop("value");
//       var sale_price = jQuery('input#sale_price').prop("value");
//       var desc = jQuery('textarea#desc').html();
//       var type = jQuery('select#type option:selected').prop("value");
//       var weight = jQuery('input#weight').prop("value");
//       var height = jQuery('input#height').prop("value");
//       var width = jQuery('input#width').prop("value");
//       var depth = jQuery('input#depth').prop("value");
//       var isVisible = jQuery('select#isVisible option:selected').prop("value");
//       var isFeatured = jQuery('select#isFeatured option:selected').prop("value");
//       var warranty = jQuery('textarea#warranty').html();
//       var bin = jQuery('input#bin').prop("value");
//       var upc = jQuery('input#upc').prop("value");
//       var availability = jQuery('select#availability option:selected').prop("value");
//       var avail_desc = jQuery('input#avail_desc').prop("value");
//       var showCondition = jQuery('select#showCondition option:selected').prop("value");
//       var condition = jQuery('select#condition option:selected').prop("value");
//       var min_qty = jQuery('input#min_qty').prop("value");
//       var max_qty = jQuery('input#max_qty').prop("value");
//       var invTracking = jQuery('select#invTracking option:selected').prop("value");
//       var inv_Warning = jQuery('input#inv_Warning').prop("value");
//       var inv_Level = jQuery('input#inv_Level').prop("value");
//       var settings = {
//   "async": true,
//   "crossDomain": true,
//   "url": "https://api.bigcommerce.com/stores/8316qn/v3/catalog/products/2",
//   "method": "PUT",
//   "headers": {
//     "x-auth-client": "pkdj66fxj2obi15e794gwa31vgt7j1c",
//     "x-auth-token": "at7y5ayx1vx3b7yrc87n2ecqo24phwc",
//     "cache-control": "no-cache",
//     "postman-token": "cd1e3308-1433-bc63-f77f-e2805eaabc95"
//   },
//
// }
//
// $.ajax(settings).done(function (response) {
//   console.log(response);
// });
//       var settings = {
//         "async": true,
//         "crossDomain": true,
//         "url": apiURL,
//         "context": document.body,
//         "method": "PUT",
//         "headers": {
//             "x-auth-token": items.auth_Token,
//             "x-auth-client": items.client_ID,
//             "cache-control": "no-cache"
//           },
//         "body": {
//             "name": name,
//             "type": type,
//             "sku": sku,
//             "description": desc,
//             "weight": weight,
//             "width": width,
//             "depth": depth,
//             "height": height,
//             "price": price,
//             "retail_price": retail_price,
//             "sale_price": sale_price,
//             "inventory_level": inv_Level,
//             "inventory_warning_level": inv_Warning,
//             "inventory_tracking": invTracking,
//             "is_visible": isVisible,
//             "is_featured": isFeatured,
//             "warranty": warranty,
//             "bin_picking_number": bin,
//             "upc": upc,
//             "availability": availability,
//             "availability_description": avail_desc,
//             "condition": condition,
//             "is_condition_shown": showCondition,
//             "order_quantity_minimum": min_qty,
//             "order_quantity_maximum": max_qty
//           }
//
//       }; //end settings variable
//       $.ajax(settings).done(function (response) {
//           console.log(name);
//           console.log(apiURL)
//
//             console.log("Success: " + response.data);
//             var updateStatus = jQuery('.modal-body.container');
//             jQuery(updateStatus).html("<h1 style='color:green;'>Product Updated Successfully!</h1>");
//             setTimeout(function() {
//               // cancel_edit();
//             }, 750);
//       }).fail(function (response) {
//             console.log("Fail Reason: " + response.error);
//       }); //end response ajax
//
//     }); // end Storage get function

} // end update product function


//
// function cancel_edit() {
//   $('#pop-up-container').remove();
// }


jQuery('#editor-btn').on('click', get_product);




// //Click Event
// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     if( request.message === "clicked_browser_action" ) {
//
//     }
//   }
// );
