const dbName = "Database name";
const btnCreateDb = document.getElementById('btnCreateDb');
const btnOpenDb = document.getElementById('btnOpenDb');
const btnDeleteDb = document.getElementById('btnDeleteDb');
const btnOpenConnection = document.getElementById('btnOpenConnection');
const btnCloseConnection = document.getElementById('btnCloseConnection');
let version = 0;
let connection = null;

function openDb(version){
    var request = window.indexedDB.open(dbName, version);  
    
    request.onupgradeneeded = e => {
        console.log(`${e.type}: oldVersion ${e.oldVersion} newVersion: ${e.newVersion}`);
        //request.transaction.db.createObjectStore(objectStoreName);
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
 
btnCreateDb.onclick = e => {
    version = parseInt(window.prompt("Version", `${version}`), 10);

    openDb(isNaN(version) ? undefined : version);
}
btnOpenDb.onclick = e => {
    openDb();
}
btnDeleteDb.onclick = e => {
    deleteDb();
}
btnOpenConnection.onclick = e => {
    var request = window.indexedDB.open(dbName);  
    request.onsuccess = e => {
        console.log(`Db opened: ${request.result.name} (v${request.result.version})`);
        console.log("connection open");
        connection = request.result;
        btnCloseConnection.disabled = false;
    }
}
btnCloseConnection.onclick = e => {
    if(connection){
        connection.close();
        connection = undefined;
        console.log("connection closed");
        btnCloseConnection.disabled = true;
    }
}
btnCloseConnection.disabled = true;