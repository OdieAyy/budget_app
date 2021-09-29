const express = require('express')
const router = express.Router()
const { RegisterUser, getUser } = require('../auth')
const Bcrypt = require('bcrypt')


router.get('/register', (req, res) => {
  res.render('register')
})


router.post('/register', async (req, res) => {

  console.log(req.body.username)

  if (req.body.username == '' || req.body.password == '') {
    return res.json({message: 'Username/password cannot be blank'})
  }

  const user = await getUser(req.body.username)

  if (user.length > 0) {
    return res.json({message: 'User already exists'})
  } 

  await RegisterUser(req.body).then(
    res.json({message: 'user created'})
  )

})


router.post('/login', async (req, res) => {
  
  const data = {
    username: req.body.username,
    password: req.body.password
  }

  getUser(data)
  .then(user => {
    Bcrypt.compare(password, user[0].password, 
      (error, result) => {
        if(error) {
          console.log(err)
          res.status(500).json( 
            {message: 'Sever error'} 
          )  
        }
        
        req.session.uid = user[0].id
        req.session.isAuth = true
        res.redirect(201, '/main')

      })
    }  
  )
  .catch(err => {
    console.log(err)
    res.status(500).json(
      {message: 'Sever error'}
    )
  })
  
})

module.exports = router
