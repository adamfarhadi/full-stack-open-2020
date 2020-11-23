const mongoose = require('mongoose')

if ((process.argv.length !== 4) && (process.argv.length !== 6)) {
  console.log('Usage: node mongo.js <username> <password> <name> <number>')
  process.exit(1)
}
const username = process.argv[2]
const password = process.argv[3]
const url = `mongodb+srv://${username}:${password}@cluster0.stg43.mongodb.net/phonebook?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 4) {
  Person.find({}).then(result => {
    console.log("phonebook:")
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length === 6) {
  personName = process.argv[4]
  personNumber = process.argv[5]

  const person = new Person({
    name: personName,
    number: personNumber
  })

  person.save().then(result => {
    console.log(`added ${personName} with number ${personNumber} to phonebook`)
    mongoose.connection.close()
  })
}

