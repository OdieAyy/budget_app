const router = require('express').Router()
const { GetAllExpenses, AddExpense } = require('../models')


router.get('/main', async (req, res) => {

  if(!req.session.uid) {
    res.redirect(401, '/login')
  }

  // remove this 
  const uid = req.session.uid

  GetAllExpenses(uid)
  .then(result => {


    if (result.length == 0) {
      res.json({message: 'No data returned'})
    } else{
      res.json(result)
    }

  })
  .catch(err => {
    console.log(err)
    res.json({message: 'sever error'})

  })
  
})

router.post('/main/add', async (req, res) => {
  
  if(!req.session.uid) {
    res.redirect(401, '/login')
  }
  
  AddExpense({
  
    uid: req.session.uid,
    name: req.body.name,
    descrip: req.body.descrip,
    amount: req.body.amount 
  
  }).then(result => {

    res.redirect(201, '/main')

  })
  .catch(err => {
    
    res.json({body: 'Status 500/Sever error'})
  
  })

})


module.exports = router