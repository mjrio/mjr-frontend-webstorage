import Loki from 'lokijs'
import LokiIndexedAdapter from 'lokijs/src/loki-indexed-adapter'


// initialize
const idbAdapter = new LokiIndexedAdapter('myApp')
const db = new Loki('main', {
  adapter: idbAdapter,
  autosave: true,
  autosaveInterval: 1000,
  env: 'BROWSER',
})

db.loadDatabase({}, (error) => {
  if (error) {
    console.log('Failed to load database')
    return
  }

  // get user collection
  const userCol = getUserCollection(db)

  // query db
  const users = userCol.find({})
  console.table(users)
})

function getUserCollection(db) {
  let userCollection = db.getCollection('users')
  if (userCollection === null) {
    console.log('Initializing new database')
    userCollection = db.addCollection('users')
    userCollection.insert({ name: 'John', age: 52 })
    userCollection.insert({ name: 'Jane', age: 13 })
    userCollection.insert({ name: 'Zoe', age: 5 })
  } else {
    console.log('Found existing database', db)
  }
  return userCollection
}
