const db = require("../config/db");

class Student {
  constructor(
    department,
    course,
    year,
    semester,
    vaccinated,
    student_name,
    section,
    usn,
    gender,
    dob,
    email,
    phone,
    address,
    teacher_name,
    photo_sample
  ) {
    this.department = department;
    this.course = course;
    this.year = year;
    this.semester = semester;
    this.vaccinated = vaccinated;
    this.student_name = student_name;
    this.section = section;
    this.usn = usn;
    this.gender = gender;
    this.dob = dob;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.teacher_name = teacher_name;
    this.photo_sample = photo_sample;
  }

  create() {
    let sql = `INSERT INTO new_student (department, course, year, semester, vaccinated, student_name, section, usn, gender, dob, email, phone, address, teacher_name, photo_sample) VALUES ('${this.department}', '${this.course}', '${this.year}', '${this.semester}', '${this.vaccinated}', '${this.student_name}', '${this.section}', '${this.usn}', '${this.gender}', '${this.dob}', '${this.email}', '${this.phone}', '${this.address}', '${this.teacher_name}','${this.photo_sample}');`;
    return db.execute(sql);
  }

  static fetch() {
    let sql = `select s.student_name, s.usn, s.semester, s.section, s.department, s.course, s.year, s.gender, s.dob, s.email, s.phone, s.address, s.vaccinated, s.teacher_name, s.photo_sample, c.vaccine1, c.vaccine2, c.vaccine_name, sm.sem1, sm.sem2, sm.sem3,sm.sem4, sm.sem5, sm.sem6, sm.sem6, sm.sem7, sm.sem8, sf.file_src from new_student s join covid c on s.usn = c.usn join sem_marks sm on s.usn = sm.usn join student_file sf on s.usn = sf.usn;`;
    return db.execute(sql);
  }

  static update(
    department,
    course,
    year,
    semester,
    vaccinated,
    student_name,
    section,
    usn,
    gender,
    dob,
    email,
    phone,
    address,
    teacher_name,
    photo_sample
  ) {
    let sql = `UPDATE new_student SET department='${department}', course='${course}', year='${year}', semester='${semester}', vaccinated='${vaccinated}',student_name='${student_name}',section='${section}',usn='${usn}', gender='${gender}', dob='${dob}', email='${email}', phone='${phone}',address='${address}',teacher_name='${teacher_name}',photo_sample='${photo_sample}' WHERE usn='${usn}';`;
    return db.execute(sql);
  }

  static delete(usn) {
    let sql = `DELETE FROM new_student WHERE usn = '${usn}';`;
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
  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT email FROM new_student WHERE email = '${email}';`)
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
  static getByUsn(id) {
    return new Promise((resolve, reject) => {
      db.query(
        `select s.student_name, s.usn, s.semester, s.section, s.department, s.course, s.year, s.gender, s.dob, s.email, s.phone, s.address, s.vaccinated, s.teacher_name, s.photo_sample,
c.vaccine1, c.vaccine2, c.vaccine_name, 
sm.sem1, sm.sem2, sm.sem3,sm.sem4, sm.sem5, sm.sem6, sm.sem6, sm.sem7, sm.sem8, sf.file_src
from new_student s 
join covid c on s.usn = c.usn 
join sem_marks sm on s.usn = sm.usn
join student_file sf on s.usn = sf.usn
where s.usn= '${id}';`
      )
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
module.exports = Student;
