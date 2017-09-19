const dbName = "DataStore";
const objectStoreName = "store";
const btnOpenDb = document.getElementById('btnOpenDb');
const btnDeleteDb = document.getElementById('btnDeleteDb');
const btnAddData = document.getElementById('btnAddData');
const btnPutData = document.getElementById('btnPutData');
const addData = {
    id: 1,
    name: "test",
    audit: {
        createdOn: new Date(),
        createdBy: "add"
    }
}
const putData = {
    id: 2,
    name: "test",
    audit: {
        createdOn: new Date(),
        createdBy: "put"
    }
}

function openDb(){
    var request = window.indexedDB.open(dbName);  
    
    request.onupgradeneeded = e => {
        console.log(`${e.type}: oldVersion ${e.oldVersion} newVersion: ${e.newVersion}`);
        request.transaction.db.createObjectStore(objectStoreName);
    }
    request.onsuccess = e => {
        console.log(`Db opened: ${request.result.name} (v${request.result.version})`);
        request.result.close();
    }  
    request.onerror = e => {
        console.log(`Error: ${request.error}`);
    }
    request.onblocked = e => {
        // Occures when a connection is open and you open the database with a higher version.
        console.log("Blocked");
    } 
}
function deleteDb(){
    var request = window.indexedDB.deleteDatabase(dbName);  
    
    request.onsuccess = e => {
        console.log("Db deleted");
        // Successfully closed
    }  
    request.onerror = e => {
        console.log(request.error);
    }
    request.onblocked = e => {
        // Occures when a connection is still open.
        console.log("Blocked");
    } 
}
 
btnOpenDb.onclick = e => {
    openDb();
}
btnDeleteDb.onclick = e => {
    deleteDb();
}
btnAddData.onclick = e => {
    var request = window.indexedDB.open(dbName);  
    request.onsuccess = e => {
        let transaction = request.result.transaction([objectStoreName], "readwrite");
        let objectStore = transaction.objectStore(objectStoreName);
        var addRequest = objectStore.add(addData, 1);
        addRequest.onerror = e => {
            console.log(`Error: ${addRequest.error}`);
            request.result.close();
        }
        addRequest.onsuccess = e => {
            console.log(`Data added with key ${addRequest.result}`);
            request.result.close();
        }
    }
    request.onerror = e => {
        console.log(request.error);
    }
}
btnPutData.onclick = e => {
    var request = window.indexedDB.open(dbName);  
    request.onsuccess = e => {
        let transaction = request.result.transaction([objectStoreName], "readwrite");
        let objectStore = transaction.objectStore(objectStoreName);
        var putRequest = objectStore.put(putData, 1);
        putRequest.onerror = e => {
            console.log(`Error: ${putRequest.error}`);
            request.result.close();
        }
        putRequest.onsuccess = e => {
            console.log(`Data added with key ${putRequest.result}`);
            request.result.close();
        }
    }
    request.onerror = e => {
        console.log(request.error);
    }
}
