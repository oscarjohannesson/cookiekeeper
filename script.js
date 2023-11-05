
document.getElementById('id_button_load').onclick = () => {
  chrome.storage.sync.get(['cookie'], function(items) {
    console.log('Settings retrieved', items);
    let value = document.getElementById('id_cookiestring').value = items
  });
}

document.getElementById('id_button_save').onclick = () => {
  let value = document.getElementById('id_cookiestring').value;
  cookie = document.cookie = value
  chrome.storage.sync.set({'cookie': cookie}, function() {
    console.log('Settings saved', );
  });
}

document.getElementById('id_button_set').onclick = () => {
  let value = document.getElementById('id_cookiestring').value;
  cookie = document.cookie = value
  chrome.cookies.set(cookie)
}

