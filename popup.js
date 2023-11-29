document.addEventListener('DOMContentLoaded', function () {
    var loadCookieButton = document.getElementById('loadCookie');
    var loadedCookiesList = document.getElementById('loadedCookies');
  
    // Load cookies from local storage when the popup is opened
    loadCookiesFromStorage();
  
    loadCookieButton.addEventListener('click', function () {
      var cookieName = document.getElementById('cookieName').value;
      var cookieValue = document.getElementById('cookieValue').value;
      var siteUrl = document.getElementById('siteUrl').value;
  
      if (cookieName && cookieValue && siteUrl) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          
  
          // Display the loaded cookie in the list with remove button
          var listItem = document.createElement('li');
          listItem.className = 'cookieItem';
          listItem.innerHTML = `
            <span>${cookieName}=${cookieValue} (Site: ${siteUrl})</span>
            <button class="removeButton" data-name="${cookieName}">Remove</button>
          `;
          loadedCookiesList.appendChild(listItem);
  
          // Save the loaded cookie to local storage
          saveCookieToStorage(cookieName, cookieValue, siteUrl);
  
          // Add event listener to the remove button
          var removeButton = listItem.querySelector('.removeButton');
          removeButton.addEventListener('click', function () {
            listItem.remove();
            // Remove the cookie from local storage
            removeCookieFromStorage(cookieName);
          });
        });
        document.getElementById('cookieName').value = ''; // Clear the input
        document.getElementById('cookieValue').value = ''; // Clear the input
        document.getElementById('siteUrl').value = ''; // Clear the input
      } else {
        alert('Please enter cookie name, value, and site URL.');
      }
    });
  
    function loadCookiesFromStorage() {
        chrome.storage.sync.get('loadedCookies', function (result) {
          var storedCookies = result.loadedCookies || [];
          storedCookies.forEach(function (cookie) {
            var listItem = document.createElement('li');
            listItem.className = 'cookieItem';
            listItem.innerHTML = `
              <span>${cookie.name}=${cookie.value} (Site: ${cookie.siteUrl})</span>
              <button class="removeButton" data-name="${cookie.name}">Remove</button>
            `;
            loadedCookiesList.appendChild(listItem);
    
            // Add event listener to the remove button
            var removeButton = listItem.querySelector('.removeButton');
            removeButton.addEventListener('click', function () {
              listItem.remove();
              // Remove the cookie from storage
              removeCookieFromStorage(cookie.name);
            });
          });
        });
      }
  
    function saveCookieToStorage(name, value, siteUrl) {
        chrome.storage.sync.get('loadedCookies', function (result) {
          var storedCookies = result.loadedCookies || [];
          storedCookies.push({ name: name, value: value, siteUrl: siteUrl });
          chrome.storage.sync.set({ 'loadedCookies': storedCookies });
        });
      }
  
      function removeCookieFromStorage(name) {
        chrome.storage.sync.get('loadedCookies', function (result) {
          var storedCookies = result.loadedCookies || [];
          var updatedCookies = storedCookies.filter(function (cookie) {
            return cookie.name !== name;
          });
          chrome.storage.sync.set({ 'loadedCookies': updatedCookies });
        });
      }
    });