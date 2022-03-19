const db = require("../config/db");

class Profile {
  constructor(usn, file_src) {
    this.usn = usn;
    this.file_src = file_src;
  }

  create() {
    let sql = `INSERT INTO student_file (usn, file_src) VALUES ('${this.usn}', '${this.file_src}');`;
    return db.execute(sql);
  }

  static update(usn, file_src) {
    let sql = `UPDATE student_file SET file_src = '${file_src}' WHERE usn = '${usn}';`;
    return db.execute(sql);
  }

  static delete(id) {
    let sql = `DELETE FROM student_file WHERE usn = '${id}';`;
    return db.execute(sql);
  }

  static getByUsn(usn) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT file_src FROM student_file WHERE usn = '${usn}';`)
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
module.exports = Profile;
