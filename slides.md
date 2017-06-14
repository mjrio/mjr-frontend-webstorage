# Modern Web Storage

<img src="./images/web-storage.png" width="400px" /><br>
<small>by Kristof Degrave & Peter Cosemans </small>

Note:

### About

T.B.D

---

# mjr

https://github.com/mjrio/mjr-frontend-webstorage


---

# Webstorage
<img src="./images/webstorage.jpg" /><br>

----

## Structure

- localstorage
- sessionstorage

- Data storage
    + name/value pairs
- Querying
    + get data by name

Note:
 Data stored in sessionStorage gets cleared when the page session ends. A page session lasts for as long as the browser is open and survives over page reloads and restores. Opening a page in a new tab or window will cause a new session to be initiated.
 SessionStorage is limited to a single tab or page. Localstorage shares data over multiple. (respecting the origin)
 https://www.w3.org/TR/webstorage/

- Durable data
    + data still exists after page refresh
    + stays on the client (not transmitted to server like cookies)
    
----

## API

```js
interface Storage {
  readonly long length;
  DOMString? key(unsigned long index);
  DOMString? getItem(DOMString key);
  void setItem(DOMString key, DOMString value);
  void removeItem(DOMString key);
  void clear();
};
```
Note:
- length: returns the number of pairs present in the storage object.
- key: returns the key present at the provided index.
- getItem: retrieves an item with a given key, returns null if not found.
- setItem: sets the value for a given key, if the key exists, the value is overwritten, otherwise it's added.
- removeItem: removes an item for a given key.
- clear: removes all pairs present in the storage object.

----

## Quota

- limit:
    + 5mb 
    + increase (optional and browser dependend)

Note:
- 5mb is recommended by the specs 
    + this is per origin

----

## Browser support

<img src="./images/webstorage-support.png" /><br>
<a href="http://caniuse.com/#feat=namevalue-storage" target="_blank">http://caniuse.com/#feat=namevalue-storage</a>
<!--<iframe src="http://caniuse.com/#feat=namevalue-storage" width="1000px" height="600px;" onerror="alert('error')" ></iframe>-->

----

## Resources

- http://caniuse.com/#feat=namevalue-storage
- https://www.w3.org/TR/webstorage/

---

# indexedDB
<img src="./images/indexeddb.png" /><br>
