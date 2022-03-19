const fs = require("fs");
const db = require("../config/db");
const Profile = require("../models/profileModel");
const path = require("path");

const uploadFiles = async (req, res) => {
  try {
    console.log(req.file);
    const { usn } = req.body;
    console.log(usn);
    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }
    // const imgsrc =
    //   path.join(__dirname, "../public/uploads/") + req.file.filename;
    const imgsrc = "http://localhost:5000/uploads/" + req.file.filename;
    console.log(imgsrc);
    await Profile.update(usn, imgsrc);

    return res.send(imgsrc);
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};
module.exports = {
  uploadFiles,
};
