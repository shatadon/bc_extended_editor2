//No click event
if (jQuery('input[type="hidden"][name="product_id"]').length === 0) {
  //Do nothing
} else {


    $.get(chrome.extension.getURL('templates/modal_popup.html'), function(data) {
        // Or if you're using jQuery 1.8+:
        $($.parseHTML(data)).prependTo('body');
    });

  jQuery("body").addClass("bc-editor");
  // jQuery(".bc-editor").prepend("<button type='button' id='editor-btn' class='btn btn-primary' data-toggle='modal' data-target='#editorPopup'><i class='fa fa-pencil-square-o' aria-hidden='true'></i><img class='hilogo' src='http://35.196.61.186/wp-content/uploads/2017/11/dasher_white.png'/> &nbsp;Edit This Product</button>");
jQuery(".bc-editor").prepend("<header id='editor-btn' data-toggle='modal' data-target='#editorPopup'><i class='fa fa-pencil-square-o' aria-hidden='true'></i><img class='hilogo' src='http://35.196.61.186/wp-content/uploads/2017/11/dasher_white.png'/><button class='btn btn-secondary'>Edit This Product</button> <button class='btn btn-secondary'> Create a product</button></header>");



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
            $(".modal-body").append('<div id="details" class="tabContent active"></div>');
            $(".modal-body").append('<div id="media" class="tabContent"></div>');
            $(".modal-body").append('<div id="inventory" class="tabContent"></div>');
            $(".modal-body").append('<div id="other" class="tabContent"></div>');
            $("#dasher_popup_header_title").text(data.name);

            // content for Details Tab
            $("#details").append('<div class="col-sm-6 col-md-4"><label>Name:</label><input id="name" type="text" value="' + response.data.name +'" /></div>');
            $("#details").append('<div class="col-sm-6 col-md-4"><label>Sku:</label><input id="sku" type="text" value="' + response.data.sku +'" /></div>');
            $("#details").append('<div class="col-sm-6 col-md-4"><label data-toggle="tooltip" title="The price of the product">Price:</label><input id="price" type="number" min="0" step="0.01" data-number-to-fixed="2" data-number-stepfactor="100" value="' + response.data.price +'"/></div>');
            $("#details").append('<div class="col-sm-6 col-md-4"><label>Retail Price:</label><input id="retail_price" type="number" min="0" step="0.01" data-number-to-fixed="2" data-number-stepfactor="100" value="' + response.data.retail_price +'"/></div>');
            $("#details").append('<div class="col-sm-6 col-md-4"><label>Sale Price:</label><input id="sale_price" type="number" min="0" step="0.01" data-number-to-fixed="2" data-number-stepfactor="100" value="' + response.data.sale_price +'"/></div>');
            $("#details").append('<div class="col-sm-12 col-md-12 description_container"><label>Description:</label><textarea id="desc">'+ response.data.description +'</textarea></div>');
            $("#details").append('<div class="col-sm-6 col-md-4"><label>Type:</label><select id="type"><option value="physical">Physical</option><option value="digital">Digital</option></select></div>');
            $("select#type").val(response.data.type);
            $("#details").append('<div class="col-sm-6 col-md-4"><label>Weight:</label><input id="weight" type="text" value="' + response.data.weight +'"/></div>');
            $("#details").append('<div class="col-sm-6 col-md-4"><label>Height:</label><input id="height" type="text" value="' + response.data.height +'"/></div>');
            $("#details").append('<div class="col-sm-6 col-md-4"><label>Width:</label><input id="width" type="text" value="' + response.data.width +'"/></div>');
            $("#details").append('<div class="col-sm-6 col-md-4"><label>Depth:</label><input id="depth" type="text" value="' + response.data.depth +'"/></div>');
            $("#details").append('<div class="col-sm-6 col-md-4"><label>Product Visible:</label><select id="isVisible"><option value="true">True</option><option value="false">False</option></select></div>');
            $("select#isVisible").val(response.data.is_visible);
            $("#details").append('<div class="col-sm-6 col-md-4"><label>Featured:</label><select id="isFeatured"><option value="true">True</option><option value="false">False</option></select></div>');
            $("select#isFeatured").val(response.data.is_featured);
            $("#details").append('<div class="col-sm-6 col-md-4"><label>Warranty:</label><textarea id="warranty">'+ response.data.warranty +'</textarea></div>');
            $("#details").append('<div class="col-sm-6 col-md-4"><label>Bin Picking Number:</label><input id="bin" type="text" value="' + response.data.bin_picking_number +'"/></div>');
            $("#details").append('<div class="col-sm-6 col-md-4"><label>UPC:</label><input id="upc" type="text" value="' + response.data.upc +'"/></div>');
            $("#details").append('<div class="col-sm-6 col-md-4"><label>Availability:</label><select id="availability"><option value="available">Available</option><option value="disabled">Disabled</option><option value="preorder">Preorder</option></select></div>');
            $("select#availability").val(response.availability);
            $("#details").append('<div class="col-sm-6 col-md-4"><label>Availability Description:</label><input id="avail_desc" type="text" value="' + response.data.availability_description +'"/></div>');
            $("#details").append('<div class="col-sm-6 col-md-4"><label>Show Condition:</label><select id="showCondition"><option value="true">True</option><option value="false">False</option></select></div>');
            $("select#showCondition").val(response.data.is_condition_shown );
            $("#details").append('<div class="col-sm-6 col-md-4"><label>Condition:</label><select id="condition"><option value="New">New</option><option value="Used">Used</option><option value="Refurbished">Refurbished</option></select></div>');
            $("select#condition").val(response.condition);
            $("#details").append('<div class="col-sm-6 col-md-4"><label>Min Order Qty:</label><input id="min_qty" type="text" value="' + response.data.order_quantity_minimum +'"/></div>');
            $("#details").append('<div class="col-sm-6 col-md-4"><label>Max Order Qty:</label><input id="max_qty" type="text" value="' + response.data.order_quantity_maximum +'"/></div>');

            $('#dasher_editor_pop-up-container input#name').keyup(function() {
                $('h5#dasher_popup_header_title').text($(this).val());
            });


            //Media Tab content
            $("#media").append('<div class="col-sm-6 col-md-4"><label>Images:</label></br><img src="'+response.data.variants[0].image_url+'"/></div>');
            $("#media").append('<div class="col-sm-6 col-md-4"><label>Upload New Images:</label></br><input id="img_files" type="file"/></div></br><img id="img_preview" src="#" height="200" style="display:none" alt="Image preview...">');


            //Inventory Tab content
            $("#inventory").append('<div class="col-sm-6 col-md-4"><label>Inventory Tracking:</label><select id="invTracking"><option value="none">None</option><option value="product">Product</option></select></div>');
            $("select#invTracking").val(response.data.inventory_tracking);
            $("#inventory").append('<div class="col-sm-6 col-md-4"><label>Inventory Warning Level:</label><input id="inv_Warning" type="text" value="'+ response.data.inventory_warning_level +'"/></div>');
            $("#inventory").append('<div class="col-sm-6 col-md-4"><label>Inventory Level:</label><input id="inv_Level" type="text" value="'+ response.data.inventory_level +'"/></div>');


            $("textarea").summernote();

            //Actions
            jQuery('.close, .closeBottom').on('click', cancel_edit);

            jQuery('#dasher_editor_pop-up-container ul.nav.nav-tabs li a').click(function(){
                var tab_id = jQuery(this).parent('li').attr('data-tab');
                jQuery('#dasher_editor_pop-up-container ul.nav.nav-tabs li a').removeClass('active');
                jQuery('#dasher_editor_pop-up-container div.tabContent').removeClass('active');
                jQuery(this).addClass('active');
                jQuery("#"+tab_id).addClass('active');
            });

            //Save Button Action
            jQuery('.saveProduct').on('click', update_product);

            //Image Selected
            $("#img_files").on("change",function(){
                previewFile();
            });


        }); //end response ajax

    }); // end Storage get function

} // end get product function

function cancel_edit() {
  $('#dasher_editor_pop-up-container').remove();
}

function update_product() {
    // define product data
    var name = jQuery('input#name').prop("value");
    var sku = jQuery('input#sku').prop("value");
    var price = jQuery('input#price').prop("value");
    var retail_price = jQuery('input#retail_price').prop("value");
    var sale_price = jQuery('input#sale_price').prop("value");
    var desc = jQuery('textarea#desc').prop("value");
    var image = jQuery('#img_files').prop("value");
    var data = JSON.stringify({
        "name": name,
        "sku": sku,
        "price": price,
        "sale_price": sale_price,
        "description": desc
    });
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
         if (this.readyState === 4 && xhr.status == 200) {
             // console.log(this.responseText);
             update_image();
         }
    });
    chrome.storage.sync.get({
        'client_ID':'',
        'auth_Token':'',
    		'store_Hash':''
    }, function(items) {
        var productID = jQuery('input[type="hidden"][name="product_id"]').val();
        xhr.open("PUT", "https://api.bigcommerce.com/stores/"+items.store_Hash+"/v3/catalog/products/"+productID);
        xhr.setRequestHeader("x-auth-client", items.client_ID);
        xhr.setRequestHeader("x-auth-token", items.auth_Token);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("cache-control", "no-cache");
        xhr.send(data);
    });
} // end Update function

function update_image() {
    // define product image data
    var image = jQuery('#img_preview').attr("src");
    var data = JSON.stringify({
        "image_file": image,
        "image_url": ""
    });
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
         if (this.readyState === 4 && xhr.status == 200) {
             // console.log(this.responseText);
             location.reload();
         }
    });
    chrome.storage.sync.get({
        'client_ID':'',
        'auth_Token':'',
    		'store_Hash':''
    }, function(items) {
        var productID = jQuery('input[type="hidden"][name="product_id"]').val();
        xhr.open("POST", "https://api.bigcommerce.com/stores/"+items.store_Hash+"/v3/catalog/products/"+productID+"/images");
        xhr.setRequestHeader("x-auth-client", items.client_ID);
        xhr.setRequestHeader("x-auth-token", items.auth_Token);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("cache-control", "no-cache");
        xhr.send(data);
    });
} // end Update IMAGES function

//Image upload
function previewFile() {
    var preview = jQuery('#img_preview');
    var file    = jQuery('input#img_files').get(0).files[0];
    var reader  = new FileReader();

    reader.addEventListener("load", function () {
      $("#img_preview").attr('src', reader.result).show();
    }, false);

    //if (file) {
      reader.readAsDataURL(file);
  //  }
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
