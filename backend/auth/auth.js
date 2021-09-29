// Bcrypt
const Bcrypt = require('bcrypt')
const db = require('../db/dbConf')

async function CreateHash (password) {

  const saltRounds = 10

  const hashedPassword = await new Promise ((resolve, reject) => {
      Bcrypt.hash(password, saltRounds, (error, result) => {
          if (!error) {
            console.log(error)
          }
          resolve (result)
        } 
      )
    }
  )

  return hashedPassword

}

async function RegisterUser (user) {

  const hashPassword = await CreateHash(user.password)

  const data = {
    username: user.username,
    password: hashPassword
  }

  const insertStatement = 'INSERT INTO User SET ?'

  return new Promise((resolve, reject) => {
      db.query(insertStatement, data, (error, result) => {
          if (error) {
              return reject(error)
            }
          return resolve(result)
        } 
      )
    }
  )

} 

function getUser (user) {

  console.log(user)

  const fetchStatement = `SELECT * FROM User WHERE username = ?`

  return new Promise((resolve, reject) => {
    db.query(fetchStatement, user, (error, result) => {
      if (error) {
        return reject(error)
      }
      if (result[0] == []) {
        console.log(result)
        return {username: ''}
      }
      console.log(result)
      return resolve(result)
    })
  })
}

module.exports = { RegisterUser, getUser }