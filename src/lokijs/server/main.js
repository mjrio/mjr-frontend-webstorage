import Loki from 'lokijs'
import LokiFSStructuredAdapter from 'lokijs/src/loki-fs-structured-adapter'
import { rawUsers } from './seedData'

// open DB
const options = {
  env: 'NODEJS',
  autosave: true,
  adapter: new LokiFSStructuredAdapter(),
  disableChangesApi: false,
}
const db = new Loki('./data/demo.json', options)

// create db with users
// const usersCollection = db.addCollection('users')
// usersCollection.insert(rawUsers)
// db.saveDatabase(err => console.log(err))

db.loadDatabase(null, () => {
  console.log('Opened DB')
  const users = db.getCollection('users')
  users.setChangesApi(true)

  console.log('Query Db')
  // log total number of users
  const totalUsers = users.count()
  console.log('  count', totalUsers)

  // query users
  // const result = users.find({ firstName: 'Daphne' })
  // const result = users.find({ age: { $gt: 20 } })
  // const result = users.find({ tags: { $contains: 'js' } })
  // const result = users.find({ tags: { $containsAny: ['js', 'es6'] } })
  // const result = users.where((doc) => {
  //   return doc.lastName.includes('John')
  // })

  // sorting & paging
  const result = users.chain()
    .find({ age: { $gt: 20 } })
    .simplesort('firstName')
    .offset(2)
    .limit(2)
    .data()
  console.log('  result:\n', result)

  // update user
  const updatedUser = users.findOne({ _id: '592ad075e6b154fdff1d80fb' })
  updatedUser.firstName = 'Peter'
  users.update(updatedUser)  // update index only

  // delete user
  const deletedUser = users.findOne({ firstName: 'Jo' })
  console.log('  deletedUser:\n', deletedUser)
  if (deletedUser) {
    users.remove(deletedUser)
  }

  // change API
  const changes = db.serializeChanges()
  console.log('changes', changes)
  db.clearChanges()

  db.saveDatabase(err => console.log('saved', err))

  console.log('Press any key to exit')
})

process.stdin.resume()
process.stdin.on('data', process.exit.bind(process, 0))






