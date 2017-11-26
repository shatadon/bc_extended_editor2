function update_product() {
    chrome.storage.sync.get({
      'client_ID':'',
      'auth_Token':'',
  		'store_Hash':''
    }, function(items) {
      var productID = jQuery('input[type="hidden"][name="product_id"]').val();
      var apiURL = "https://api.bigcommerce.com/stores/" + items.store_Hash + "/v3/catalog/products/" + productID;

      // define product data
      var name = jQuery('input#name').prop("value");
      var sku = jQuery('input#sku').prop("value");
      var price = jQuery('input#price').prop("value");
      var retail_price = jQuery('input#retail_price').prop("value");
      var sale_price = jQuery('input#sale_price').prop("value");
      var desc = jQuery('textarea#desc').html();
      var type = jQuery('select#type option:selected').prop("value");
      var weight = jQuery('input#weight').prop("value");
      var height = jQuery('input#height').prop("value");
      var width = jQuery('input#width').prop("value");
      var depth = jQuery('input#depth').prop("value");
      var isVisible = jQuery('select#isVisible option:selected').prop("value");
      var isFeatured = jQuery('select#isFeatured option:selected').prop("value");
      var warranty = jQuery('textarea#warranty').html();
      var bin = jQuery('input#bin').prop("value");
      var upc = jQuery('input#upc').prop("value");
      var availability = jQuery('select#availability option:selected').prop("value");
      var avail_desc = jQuery('input#avail_desc').prop("value");
      var showCondition = jQuery('select#showCondition option:selected').prop("value");
      var condition = jQuery('select#condition option:selected').prop("value");
      var min_qty = jQuery('input#min_qty').prop("value");
      var max_qty = jQuery('input#max_qty').prop("value");
      var invTracking = jQuery('select#invTracking option:selected').prop("value");
      var inv_Warning = jQuery('input#inv_Warning').prop("value");
      var inv_Level = jQuery('input#inv_Level').prop("value");


      var settings = {
        "async": true,
        "crossDomain": true,
        "url": apiURL,
        "method": "PUT",
        "headers": {
            "x-auth-token": items.auth_Token,
            "x-auth-client": items.client_ID,
            "cache-control": "no-cache"
          }


      }; //end settings variable
      $.ajax(settings).success(function (response) {
            console.log("Success: " + response.data);
            var updateStatus = jQuery('.modal-body.container');
            jQuery(updateStatus).html("<h1 style='color:green;'>Product Updated Successfully!</h1>");
            setTimeout(function() {
              // cancel_edit();
            }, 750);
      }).fail(function (response) {
            console.log("Fail Reason: " + response.error);
      }); //end response ajax

    }); // end Storage get function

} // end update product function
