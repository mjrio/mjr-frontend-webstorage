import Datastore from 'nedb-promise'

// initialize
const db = new Datastore({ filename: 'users', autoload: true })
console.log(db)

queryDb(db)

async function queryDb(db) {
  const userCount = await db.count({})
  if (!userCount) {
    await addUsers(db)
  }
  const users = await db.find({ })
  console.table(users)

  // get, modify and update
  // const user = await db.findOne({ age: 52 })
  // user.age = 53
  // db.update({ _id: user._id }, user)

  // query and update
  // db.update({ age: 53 }, { $set: { age: 55 } })
}

async function addUsers(db) {
  const users = [
    { name: 'John', age: 52 },
    { name: 'Jane', age: 23 },
    { name: 'Zoe', age: 13 },
  ]
  return db.insert(users)
}
