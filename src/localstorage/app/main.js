const nameInput = document.getElementById('name');
const valueInput = document.getElementById('value');

const setButton = document.getElementById('set');
const getButton = document.getElementById('get');
const removeButton = document.getElementById('remove');
const clearButton = document.getElementById('clear');

const eventsArea = document.getElementById('events');

setButton.onclick = function(e){
    if(!nameInput.value){
        alert('Name is required');
    }

    window.localStorage.setItem(nameInput.value, valueInput.value);
}

removeButton.onclick = function(e){
    if(!nameInput.value){
        alert('Name is required');
    }

    window.localStorage.removeItem(nameInput.value);
}

getButton.onclick = function(e){
    if(!nameInput.value){
        alert('Name is required');
    }

    alert(window.localStorage.getItem(nameInput.value));
}

clearButton.onclick = function(e){
    if(!nameInput.value){
        alert('Name is required');
    }

    window.localStorage.clear;
}

window.addEventListener('storage', e => {
    debugger;
    var value = `Storage: ${e.storageArea} - key: ${e.key} (newValue: ${e.newValue}, oldValue: ${e.oldValue}) \n\r`;
    eventsArea.value = value + eventsArea.value;
});