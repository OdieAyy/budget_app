CREATE TABLE User (
  id INT NOT NULL PRIMARY KEY,
  username NOT NULL VARCHAR(255),
  password NOT NULL VARCHAR(255)
);
CREATE TABLE Expense_Item (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  descrip VARCHAR(255),
  amount INT NOT NULL,
  uid INT,
  FOREIGN KEY (uid) REFERENCES User(id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE Expense_Frequency (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  frequency VARCHAR(1),
  eid INT NOT NULL,
  FOREIGN KEY (eid) REFERENCES Expense_Item(id) ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO
  Expense_Frequency (id, frequency, eid)
VALUES
  (?, ?, ?);
UPDATE
  Expense_Item
SET
  name = 'TestingUpdate',
  Amount = ?
WHERE
  id = ?;
SELECT
  Expense_Item.id,
  Expense_Item.name,
  Expense_Item.amount,
  Expense_Item.uid,
  Expense_Frequency.frequency,
  Expense_Frequency.eid
FROM
  Expense_Item
  LEFT JOIN Expense_Frequency ON Expense_Item.id = Expense_Frequency.eid
WHERE
  Expense_Item.uid = ?