const dbName = "DataStore";
const objectStoreName = "store";
const btnOpenDb = document.getElementById('btnOpenDb');
const btnDeleteDb = document.getElementById('btnDeleteDb');
const btnGetAll = document.getElementById('btnGetAll');

function openDb(){
    var request = window.indexedDB.open(dbName);  
    
    request.onupgradeneeded = e => {
        console.log(`${e.type}: oldVersion ${e.oldVersion} newVersion: ${e.newVersion}`);
        var objectStore = request.transaction.db.createObjectStore(objectStoreName);
        objectStore.add("test1", 1);
        objectStore.add("test2", 2);
        objectStore.add("test3", 3);
        objectStore.add("test4", 4);
        objectStore.add("test5", 5);
        objectStore.add("test6", 6);
        objectStore.add("test7", 7);
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
btnGetAll.onclick = e => {
    var request = window.indexedDB.open(dbName);  
    request.onsuccess = e => {
        let transaction = request.result.transaction([objectStoreName]);
        let objectStore = transaction.objectStore(objectStoreName);
        var getAllRequest = objectStore.getAll();
        getAllRequest.onerror = e => {
            console.log(`Error: ${getAllRequest.error}`);
            request.result.close();
        }
        getAllRequest.onsuccess = e => {
            console.log(`All data`, getAllRequest.result);
            request.result.close();
        }
    }
    request.onerror = e => {
        console.log(request.error);
    }
}
