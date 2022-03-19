const router = require("express").Router();
const studentCtrl = require("../controllers/studentCtrl");
const uploadController = require("../controllers/upload");
const upload = require("../middleware/upload");
const profileCtrl = require("../controllers/profileCtrl");

router.post("/student", studentCtrl.addStudent);
router.get("/student", studentCtrl.getAllStudent);
router.get("/student/:id", studentCtrl.getStudent);
router.put("/student/:id", studentCtrl.updateStudent);
router.delete("/student/:id", studentCtrl.deleteStudent);
// router.get("/profile/upload", studentCtrl.getProfile);

router.put("/upload", upload.single("file"), uploadController.uploadFiles);
router.get("/upload/:id", profileCtrl.getProfile);
module.exports = router;
