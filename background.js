chrome.runtime.onInstalled.addListener(function () {
    console.log("Cookiekeeper installed");
  });

chrome.webNavigation.onCompleted.addListener(function (details) {
    chrome.storage.sync.get('loadedCookies', function (result) {
        var storedCookies = result.loadedCookies || [];
        storedCookies.forEach(function (cookie) {
            if (details.url.includes(cookie.siteUrl)){
                chrome.cookies.set({
                    "name": cookie.name,
                    "url": cookie.siteUrl,
                    "value": cookie.value
                },function (cookie) {
                    console.log("applied cookie")
                    console.log(JSON.stringify(cookie));
                    console.log(chrome.extension.lastError);
                    console.log(chrome.runtime.lastError);
                })
            }
       });
      });
  });


 

