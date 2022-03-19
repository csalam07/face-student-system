const db = require("../config/db");

class User {
  constructor(
    fname,
    lname,
    contact,
    email,
    address,
    dept,
    securityQ,
    securityA,
    password
  ) {
    this.fname = fname;
    this.lname = lname;
    this.contact = contact;
    this.email = email;
    this.securityQ = securityQ;
    this.securityA = securityA;
    this.password = password;
    this.dept = dept;
    this.address = address;
  }

  create() {
    let sql = `INSERT INTO register (fname, lname, contact, email, securityQ, securityA, password) VALUES('${this.fname}', '${this.lname}', '${this.contact}','${this.email}', '${this.securityQ}','${this.securityA}', '${this.password}');`;
    return db.execute(sql);
  }

  save() {
    let sql = `INSERT INTO teacher (firstname, surname, email, dept, address, contact) VALUES('${this.fname}', '${this.lname}', '${this.email}','${this.dept}', '${this.address}','${this.contact}');`;
    return db.execute(sql);
  }
  static findAll() {
    let sql = "SELECT * FROM register;";
    return db.execute(sql);
  }

  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT email FROM register WHERE email = '${email}';`)
        .then((result) => {
          if (result.length > 0) {
            return resolve(result[0]);
          } else {
            return reject(null);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static getUserByEmail(email) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM register WHERE email = '${email}';`)
        .then((result) => {
          if (result.length > 0) {
            resolve(result[0]);
          } else {
            reject(null);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static updatePassword(email, password) {
    let sql = `UPDATE register SET password = '${password}' WHERE email = '${email}';`;
    return db.execute(sql);
  }
}

module.exports = User;
