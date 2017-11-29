//Recall Dasher
function recallDasher() {
  var thisStore = sessionStorage.getItem("dasher-store");
  if(thisStore === "" || thisStore === null || thisStore === undefined) {
    //Do nothing
  } else {
    chrome.runtime.sendMessage({method: "getStatus"}, function(tab) {
      //console.log(response.status);
    });
  }
}
recallDasher();
