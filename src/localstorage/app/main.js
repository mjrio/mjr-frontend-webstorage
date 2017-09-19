const txtName = document.getElementById('txtName');
const txtValue = document.getElementById('txtValue');
const txtResult = document.getElementById('txtResult');

const btnSet = document.getElementById('btnSet');
const btnGet = document.getElementById('btnGet');
const btnGetAll = document.getElementById('btnGetAll');
const btnRemove = document.getElementById('btnRemove');
const btnClear = document.getElementById('btnClear');

function getStorage(){
    return window.localStorage;
    //return window.sessionStorage;
}


btnSet.onclick = e => {
    if(!txtName.value){
        alert('Name is required');
        return;
    }
    clearResult();

    getStorage().setItem(txtName.value, txtValue.value);
}

btnRemove.onclick = e => {
    if(!txtName.value){
        alert('Name is required');
        return;
    }
    clearResult();

    getStorage().removeItem(txtName.value);
}

btnGet.onclick = e => {
    if(!txtName.value){
        alert('Name is required');
        return;
    }
    clearResult();

    let value = getStorage().getItem(txtName.value);
    txtResult.value = `Key: ${txtName.value}, Value: ${value}`;
}

btnGetAll.onclick = e => {
    clearResult();
    for(let i = 0; i < getStorage().length; i++){
        let key = getStorage().key(i);
        let value = getStorage().getItem(key);
        txtResult.value += `Key: ${key}, Value: ${value}\n\r`;
    }
}

btnClear.onclick = e => {
    clearResult();
    getStorage().clear();
}

function clearResult(){
    txtResult.value = "";
}

window.addEventListener('storage', e => {
    console.log(`Storage: ${e.storageArea} - key: ${e.key} (newValue: ${e.newValue}, oldValue: ${e.oldValue}) \n\r`, e);
});