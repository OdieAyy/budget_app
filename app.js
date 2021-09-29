const express = require('express')
const cookieSession = require('cookie-session')
const db = require('./backend/db/dbConf')
const ejs = require('ejs')
const authRoutes = require('./backend/auth/routes/routes')
const appRoutes = require('./backend/app/routes/routes')



const port = 3000
const app = express()


// session config - move this to controller 
app.use(cookieSession({
  name: 'session',
  keys: ['12345', 'thiskeyshouldbechanged']
}))

app.set('view engine', 'ejs')

app.use(express.urlencoded())

// auth routes
app.use(authRoutes)
// main application routes
app.use(appRoutes)

db.connect((err) => {
  if(err) throw err
  console.log('DB connected')
})

app.listen(port, () => {
  console.log('server running')
})