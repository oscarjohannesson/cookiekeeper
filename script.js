
document.getElementById('id_button_load').onclick = () => {
  chrome.storage.sync.get(['cookie'], function(items) {
    console.log('Cookie loaded retrieved', items);
    document.getElementById('id_cookiestring').value = document.cookie = items.cookie
  });
}

document.getElementById('id_button_save').onclick = () => {
  let value = document.getElementById('id_cookiestring').value;
  chrome.storage.sync.set({'cookie':  document.cookie = value}, function() {
    console.log('Settings saved', );
  });
}

document.getElementById('id_button_apply').onclick = () => {
  let value = document.getElementById('id_cookiestring').value;
  console.log('Applying cookie:', document.cookie = value);
  chrome.cookies.set(document.cookie = value)
}

