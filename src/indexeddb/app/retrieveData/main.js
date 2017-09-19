const dbName = "DataStore";
const objectStoreName = "store";
const createdByIndexName = "createdByIndex";
const ageIndexName = "ageIndex";
const btnOpenDb = document.getElementById('btnOpenDb');
const btnDeleteDb = document.getElementById('btnDeleteDb');
const btnGetAll = document.getElementById('btnGetAll');
const btnGetById = document.getElementById('btnGetById');
const btnGetByAge = document.getElementById('btnGetByAge');
const btnGetByCreatedBy = document.getElementById('btnGetByCreatedBy');
const btnGetAdultsByAge = document.getElementById('btnGetAdultsByAge');

function openDb(){
    let request = window.indexedDB.open(dbName);  
    
    request.onupgradeneeded = e => {
        console.log(`${e.type}: oldVersion ${e.oldVersion} newVersion: ${e.newVersion}`);
        let objectStore = request.transaction.db.createObjectStore(objectStoreName, { keyPath: 'id' });
        objectStore.createIndex(createdByIndexName, "audit.createdBy");
        objectStore.createIndex(ageIndexName, "age");
        for (let i = 1; i <= 10; i++){
            objectStore.add(generateObject(i));
        }
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
    let request = window.indexedDB.deleteDatabase(dbName);  
    
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
    let request = window.indexedDB.open(dbName);  
    request.onsuccess = e => {
        let transaction = request.result.transaction([objectStoreName]);
        let objectStore = transaction.objectStore(objectStoreName);
        let getAllRequest = objectStore.getAll();
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

btnGetById.onclick = e => {
    let id = parseInt(prompt("Id", "1"),10);

    if(!id || isNaN(id)){
        return;
    }

    let request = window.indexedDB.open(dbName);  
    request.onsuccess = e => {
        let transaction = request.result.transaction([objectStoreName]);
        let objectStore = transaction.objectStore(objectStoreName);
        let getAllRequest = objectStore.get(id);
        getAllRequest.onerror = e => {
            console.log(`Error: ${getAllRequest.error}`);
            request.result.close();
        }
        getAllRequest.onsuccess = e => {
            console.log(`Data for id ${id}`, getAllRequest.result);
            request.result.close();
        }
    }
    request.onerror = e => {
        console.log(request.error);
    }
}

btnGetByCreatedBy.onclick = e => {
    let createdBy = prompt("Created by", "me");

    if(!createdBy){
        return;
    }

    let request = window.indexedDB.open(dbName);  
    request.onsuccess = e => {
        let transaction = request.result.transaction([objectStoreName]);
        let objectStore = transaction.objectStore(objectStoreName);
        let index = objectStore.index(createdByIndexName);
        let getRequest = index.getAll(createdBy);
        getRequest.onerror = e => {
            console.log(`Error: ${getRequest.error}`);
            request.result.close();
        }
        getRequest.onsuccess = e => {
            console.log(`All data createdBy ${createdBy}`, getRequest.result);
            request.result.close();
        }
    }
    request.onerror = e => {
        console.log(request.error);
    }
}

btnGetByAge.onclick = e => {
    let age = parseInt(prompt("Minimal age?", "41"),10);

    if(!age || isNaN(age)){
        return;
    }

    let request = window.indexedDB.open(dbName);  
    request.onsuccess = e => {
        let transaction = request.result.transaction([objectStoreName]);
        let objectStore = transaction.objectStore(objectStoreName);
        let index = objectStore.index(ageIndexName);
        let getRequest = index.getAll(IDBKeyRange.lowerBound(age));
        getRequest.onerror = e => {
            console.log(`Error: ${getRequest.error}`);
            request.result.close();
        }
        getRequest.onsuccess = e => {
            console.log(`All data with an age higher or equal than ${age}`, getRequest.result);
            request.result.close();
        }
    }
    request.onerror = e => {
        console.log(request.error);
    }
}

btnGetAdultsByAge.onclick = e => {
    let age = parseInt(prompt("Maximal age?", "41"),10);

    if(!age || isNaN(age)){
        return;
    }

    let request = window.indexedDB.open(dbName);  
    request.onsuccess = e => {
        let transaction = request.result.transaction([objectStoreName]);
        let objectStore = transaction.objectStore(objectStoreName);
        let index = objectStore.index(ageIndexName);
        let cursorRequest = index.openCursor(IDBKeyRange.bound(18, age), "prev");

        cursorRequest.onerror = e => {
            console.log(`Error: ${cursorRequest.error}`);
            request.result.close();
        }
        cursorRequest.onsuccess = e => {
            let cursor = cursorRequest.result;
            if(cursor){
                console.log(`cursor data with an age between 18 and ${age}`, cursor.value);
                cursor.continue();
            }
            else {
                request.result.close();
            }
        }
    }
    request.onerror = e => {
        console.log(request.error);
    }
}



function generateObject(id){
    return {
        id,
        name: `test${id}`,
        age: id * 10,
        audit: {
            createdOn: new Date(),
            createdBy: id % 2 ? "me" : "you"
        }
    }
}