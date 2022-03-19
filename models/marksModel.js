const db = require("../config/db");

class Marks {
  constructor(usn, sem1, sem2, sem3, sem4, sem5, sem6, sem7, sem8) {
    this.usn = usn;
    this.sem1 = sem1;
    this.sem2 = sem2;
    this.sem3 = sem3;
    this.sem4 = sem4;
    this.sem5 = sem5;
    this.sem6 = sem6;
    this.sem7 = sem7;
    this.sem8 = sem8;
  }

  create() {
    let sql = `INSERT INTO sem_marks (usn, sem1, sem2, sem3, sem4, sem5, sem6, sem7, sem8) VALUES('${this.usn}','${this.sem1}','${this.sem2}','${this.sem3}','${this.sem4}','${this.se5}','${this.sem6}','${this.sem7}','${this.sem8}');`;
    return db.execute(sql);
  }

  static update(usn, sem1, sem2, sem3, sem4, sem5, sem6, sem7, sem8) {
    let sql = `UPDATE sem_marks SET usn='${usn}', sem1 = '${sem1}', sem2 = '${sem2}', sem3 = '${sem3}', sem4 = '${sem4}', sem5 = '${sem5}', sem6 = '${sem6}', sem7 = '${sem7}', sem8 = '${sem8}' WHERE usn = '${usn}';`;
    return db.execute(sql);
  }

  static delete(usn) {
    let sql = `DELETE FROM sem_marks WHERE usn = '${usn}';`;
    return db.execute(sql);
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM new_student WHERE id = '${id}';`)
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
module.exports = Marks;
