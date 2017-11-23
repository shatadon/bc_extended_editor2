var productID = jQuery('input[type="hidden"][name="product_id"]').val();
var host = window.location.hostname;
var editURL = "https://" + host + "/admin/index.php?ToDo=editProduct&productId=" + productID;
alert(editURL);
