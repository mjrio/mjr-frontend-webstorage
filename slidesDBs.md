# Modern Web Storage

<img src="./images/web-storage.png" width="400px" /><br>
<small>by Kristof Degrave & Peter Cosemans </small>

---

# A DB in your browser
> More then just LocalStorage

----

## Why a database in your javascript

- Light weight node application (zeit/pkg)
- Electron app
- Progressive Web App
- Hybrid app (cordova, Ionic)
- Offline support in your web app

----

## Overview

KeyValue
- LocalForage (9211 Stars, 10KB/gzip, 73 StackOverflow)

NoSQL
- LokiJS (3344 Stars, 20kb/gzip, 76 StackOverflow)
- NeDB (6545 Stars, 29kb/gzip, 78 StackOverflow)
- PouchDB (8910 Stars, 48KB/gzip, 922 StackOverflow)

---

## PouchDB

- NodeJS, Electron, Browser & Cordova
- Support for
    + indexeddb
    + fallback to WebSQL
    + levelDB on NodeJS
    + adaptor for SQLite (for Cordova)
    + adaptor for ReactNative
    + adaptor for NativeScript
- Auto sync with CouchDB

---

## LokiDB

- NodeJS, Electron, Browser & Cordova
- By default runs in memory
- Super fast
- Diff export
- MongoDB lite API
- Support for
    + Localstorage (max 5 MB)
    + Indexeddb (50Mb - 500MB) with fallback to WebSQL
    + adaptor for File System (for Cordova & NodeJS)
    + adaptor for Nativescript
    + adaptor for ReactNative

----

## LokiDB

```js
const db = new Loki('./data/demo.json')
const users = db.getCollection('users')
const user = users.findOne({ firstName: 'Peter' })  // mongodb queries
user.company = 'euricom'
users.update(user)  // update the index
```

---

## NeDb

- NodeJS, Electron, Browser
- DB is kept in memory
- MongoDB lite API
- Support for
    + File System
    + indexeddb, WebSQL or localStorage (auto fallback)
- Not for
    + NavtiveScript
    + ReactNative
    + Cordova

https://github.com/louischatriot/nedb
http://stackabuse.com/nedb-a-lightweight-javascript-database/

---

## Specials

LocalStorage
- Lockr: Simple easy local storage wrapper
- Store.js: Idem as lockr with deep browser support (IE6, IE7)
- Lscache: Simplied local storage with cache expire features
- Lsbridge: Messaging between browser tabs
- SecStore.js: Encrypted local storage
- Barn: Redis-like API to local storage
- Basil.js: Unified API for local storage, session storage and cookie

IndexedDB
- Dexie.js: A Minimalistic Wrapper for IndexedDB
- LocalForage: LocalStorage key/value on top of Indexeddb, WebSQL or local storage

Angular
- ng2-webstorage: Session and Local storage with decorators and observables
- ngRx/db: RxJS powered IndexedDB for Angular apps (beta)

VueJS
- vuex-persistedstate: Persist vuex store to localstorage
- vue-localforage: Localforage integration with vuejs

Redux
- https://github.com/prateekbh/redux-storage-engine-indexed-db
- https://github.com/mathieudutour/redux-storage-engine-localforage

---

## Resources

- https://nolanlawson.com/2015/09/29/indexeddb-websql-localstorage-what-blocks-the-dom/
- https://www.html5rocks.com/en/tutorials/offline/quota-research/
- https://nolanlawson.github.io/database-comparison/
- http://www.i-programmer.info/news/84-database/9894-lokijs-reaches-14.html

Video
- https://www.youtube.com/watch?v=jgW23Uo-XZ8

