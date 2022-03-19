const Student = require("../models/studentModel");
const Marks = require("../models/marksModel");
const Covid = require("../models/covidModel");
const Profile = require("../models/profileModel");

const studentCtrl = {
  addStudent: async (req, res) => {
    try {
      const {
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
        vaccine1,
        vaccine2,
        vaccine_name,
        sem1,
        sem2,
        sem3,
        sem4,
        sem5,
        sem6,
        sem7,
        sem8,
        photo_sample,
      } = req.body;
      const [st_email, _] = await Student.findByEmail(email);
      if (st_email)
        return res.status(400).json({ msg: "This student already exist" });

      const new_student = new Student(
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
      );
      await new_student.create();
      console.log(new_student);

      const new_covid = new Covid(usn, vaccine1, vaccine2, vaccine_name);
      await new_covid.create();
      console.log(new_covid);

      const new_semmarks = new Marks(
        usn,
        sem1,
        sem2,
        sem3,
        sem4,
        sem5,
        sem6,
        sem7,
        sem8
      );
      await new_semmarks.create();
      console.log(new_semmarks);
      whatGender = gender === "Male" ? true : false;
      console.log(whatGender);
      let imgsrc;
      if (whatGender) {
        imgsrc =
          "https://res.cloudinary.com/csalam07/image/upload/v1647537326/nobita_xzhvzc.png";
      } else {
        imgsrc =
          "https://res.cloudinary.com/csalam07/image/upload/v1647537414/sizuka_fia19w.png";
      }
      const new_profile = new Profile(usn, imgsrc);
      await new_profile.create();

      res.json({ msg: "Student added successfully" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAllStudent: async (req, res) => {
    try {
      const [students, _] = await Student.fetch();
      res.json(students);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getStudent: async (req, res) => {
    try {
      const { id } = req.params;
      const [student, _] = await Student.getByUsn(id);
      if (!student) return res.status(400).json({ msg: "No student found" });
      res.json(student);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateStudent: async (req, res) => {
    try {
      const {
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
        vaccine1,
        vaccine2,
        vaccine_name,
        sem1,
        sem2,
        sem3,
        sem4,
        sem5,
        sem6,
        sem7,
        sem8,
        photo_sample,
      } = req.body;

      const { id } = req.params;
      const [student, _] = await Student.getByUsn(id);
      if (!student) return res.status(400).json({ msg: "No student found" });

      await Covid.update(usn, vaccine1, vaccine2, vaccine_name);
      await Marks.update(usn, sem1, sem2, sem3, sem4, sem5, sem6, sem7, sem8);

      await Student.update(
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
      );

      res.json({
        msg: `Student having ${usn} and name ${student_name} upadted successfully`,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteStudent: async (req, res) => {
    try {
      const { id } = req.params;

      const [student, _] = await Student.getByUsn(id);
      if (!student) return res.status(400).json({ msg: "No student found" });

      await Student.delete(id);
      await Covid.delete(id);
      await Marks.delete(id);
      await Profile.delete(id);

      res.json({ msg: `Student having usn ${id} deleted successfully` });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = studentCtrl;
