if (confirm('You sure you want to edit this product?'))
    chrome.runtime.sendMessage({type:'edit_product'});
