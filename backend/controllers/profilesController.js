const Profile = require("../models/Profile");

exports.createProfile = async (req, res) => {
  try {
    const { name, bio, skills, experience, projects } = req.body;

    const newProfile = new Profile({
      user: req.user.id,
      name,
      bio,
      skills,
      experience,
      projects,
      profileImage: req.file ? req.file.filename : null,
    });

    await newProfile.save();

    res.status(201).json(newProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllProfiles = async (req, res) => {
try {
  const search = req.query.search || "";
  const profiles = await Profile.find({
    name:{
      $regex:search,
      $options:"i"
    },

  }).populate("user","email")
  
  res.status(200).json(profiles)
} catch (error) {
  res.status(500).json({message:error.message})
  
}
};

exports.getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateProfiles = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(401).json({ message: "Profile not found" });
    }

    if (profile.user.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Not Authorized" });
    }
    const updateData = {
      name: req.body.name,
      bio: req.body.bio,
      skills: req.body.skills,
      experience: req.body.experience,
      projects: req.body.projects,
    };
    if (req.file) {
      updateData.profileImage = req.file.filename;
    }
    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true },
    );
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
};

exports.DeleteProfiles = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: "profile not found" });
    }
    if (profile.user.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "not authorized" });
    }

    await Profile.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Delete Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
