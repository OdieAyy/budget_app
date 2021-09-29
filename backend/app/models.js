const db = require('../db/dbConf');

function GetAllExpenses(uid) {

  const user = uid

  // In future, name tables better - if used incorrectly, id', and uid's do not show up. 
  // Likely a naming confilict. 
  const query = `SELECT Expense_Item.id, Expense_Item.name, Expense_Item.amount, Expense_Item.uid, 
                 Expense_Frequency.frequency, Expense_Frequency.eid FROM Expense_Item 
                 LEFT JOIN Expense_Frequency 
                 ON Expense_Item.id = Expense_Frequency.eid
                 WHERE Expense_Item.uid = ?`

  return new Promise((resolve, reject) => {
    db.query(query, user, (err, result) => {
      if (err) {
        return reject(err)
      }
      console.log(result)
      return resolve(result)
    })
  })

}

function AddExpense(data) {

  const query = 'INSERT INTO Expense_Item SET ?'

  return new Promise((resolve, reject) => {
    return db.query(query, data, (err, result) => {
      if (err) {
        return reject(err)
      } 
      return resolve(result)
    })
  })

}

function AddFrequency(freq, uid){
  
  const query = `INSERT INTO Expense_Frequency (id, frequency, eid)
                 VALUES (?, ?)`
  
  return new Promise ((resolve, reject) => {
    db.query(query, [freq, uid], (err, result) => {
      if (err) {
        return reject(err)
      } 
      return resolve(result)
    })
  })
}


module.exports = {GetAllExpenses, AddExpense, AddFrequency}