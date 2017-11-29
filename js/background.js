// background.js

// chrome.browserAction.onClicked.addListener(function (tab) { //Fired when User Clicks ICON
//      // Inspect whether the place where user clicked matches with our list of URL
//      chrome.tabs.insertCSS(tab.id, {"file": "css/jquery-ui.min.css"});
//      chrome.tabs.insertCSS(tab.id, {"file": "css/bootstrap.min.css"});
//      chrome.tabs.insertCSS(tab.id, {"file": "editor/summernote-bs4.css"});
//      chrome.tabs.insertCSS(tab.id, {"file": "css/styles.css"});
//      chrome.tabs.executeScript(tab.id, {"file": "js/jquery-3.2.1.min.js"});
//      chrome.tabs.executeScript(tab.id, {"file": "js/tether.min.js"});
//      chrome.tabs.executeScript(tab.id, {"file": "js/bootstrap.min.js"});
//      chrome.tabs.executeScript(tab.id, {"file": "editor/summernote-bs4.js"});
//      chrome.tabs.executeScript(tab.id, {"file": "js/content.js"});
// });

chrome.runtime.onMessage.addListener(function(request) {
    if (request.method == "getStatus") {
        chrome.tabs.insertCSS(null, {"file": "css/jquery-ui.min.css"});
        chrome.tabs.insertCSS(null, {"file": "css/bootstrap.min.css"});
        chrome.tabs.insertCSS(null, {"file": "editor/summernote-bs4.css"});
        chrome.tabs.insertCSS(null, {"file": "css/styles.css"});
        chrome.tabs.executeScript(null, {"file": "js/jquery-3.2.1.min.js"});
        chrome.tabs.executeScript(null, {"file": "js/tether.min.js"});
        chrome.tabs.executeScript(null, {"file": "js/bootstrap.min.js"});
        chrome.tabs.executeScript(null, {"file": "editor/summernote-bs4.js"});
        chrome.tabs.executeScript(null, {"file": "js/content.js"});
    }  else {
      sendResponse({}); // snub them.
    }
});

// "default_icon": "bc_logo.png",
// "default_popup": "options.html"
// "content_scripts":[ {
//    "css": ["css/jquery-ui.min.css","css/bootstrap.min.css","editor/summernote-bs4.css","css/styles.css"],
//    "js": ["js/jquery-3.2.1.min.js","js/tether.min.js","js/bootstrap.min.js","editor/summernote-bs4.js","js/content.js"],
//     "matches": ["<all_urls>"]
// }],

// // Handle requests for passwords
// chrome.runtime.onMessage.addListener(function(request, sender) {
//     if (request.type === 'edit_product') {
//         chrome.tabs.create({
//             url: chrome.extension.getURL('../product.html'),
//             active: false
//         }, function(tab) {
//             // After the tab has been created, open a window to inject the tab
//             chrome.windows.create({
//                 tabId: tab.id,
//                 type: 'popup',
//                 focused: true
//                 // incognito, top, left, ...
//             });
//         });
//     }
// });
