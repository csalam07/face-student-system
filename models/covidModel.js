const db = require("../config/db");

class Covid {
  constructor(usn, vaccine1, vaccine2, vaccine_name) {
    this.usn = usn;
    this.vaccine1 = vaccine1;
    this.vaccine2 = vaccine2;
    this.vaccine_name = vaccine_name;
  }

  create() {
    let sql = `INSERT INTO covid (usn, vaccine1, vaccine2, vaccine_name) VALUES ('${this.usn}','${this.vaccine1}', '${this.vaccine2}', '${this.vaccine_name}');`;
    return db.execute(sql);
  }
  static update(usn, vaccine1, vaccine2, vaccine_name) {
    let sql = `UPDATE covid SET usn='${usn}', vaccine1 = '${vaccine1}', vaccine2 = '${vaccine2}', vaccine_name = '${vaccine_name}' WHERE usn = '${usn}';`;
    return db.execute(sql);
  }

  static delete(usn) {
    let sql = `DELETE FROM covid WHERE usn = '${usn}';`;
    return db.execute(sql);
  }

  static findByUsn(usn) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM new_student WHERE usn = '${usn}';`)
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
}
module.exports = Covid;
