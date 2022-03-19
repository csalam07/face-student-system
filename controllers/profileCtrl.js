const Profile = require("../models/profileModel");

const profileCtrl = {
  getProfile: async (req, res) => {
    try {
      const { id } = req.params;
      const [profile, _] = await Profile.getByUsn(id);
      if (!profile) return res.status(400).json({ msg: "No profile found" });

      res.status(200).json(profile);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = profileCtrl;
