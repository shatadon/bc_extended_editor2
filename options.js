// Saves options to chrome.storage
function save_options() {

	var clientID  = document.getElementById("client_id").value;
	var authToken = document.getElementById("auth_token").value;
  var apiPath   = document.getElementById("store_hash").value;
  var storeHash = apiPath.split("/")[4];
  chrome.storage.sync.set({
    client_ID: clientID,
    auth_Token: authToken,
		store_Hash: storeHash
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status'); 
    status.textContent = 'Store settings saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}


// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    'client_ID':'',
    'auth_Token':'',
		'store_Hash':''
  }, function(items) {
		//alert(items.client_ID);
		document.getElementById("client_id").value = items.client_ID;
	 	document.getElementById("auth_token").value = items.auth_Token;
		document.getElementById("store_hash").value = items.store_Hash;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
jQuery('#save').on('click', save_options);
//document.getElementById('save').addEventListener('click', save_options);
