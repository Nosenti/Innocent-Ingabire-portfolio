import Profile from "./../models/Profile";

// exports.updateProfile = async (req, res) => {
//   try {
//     let profile = await Profile.findById(req.params.id);
//     Object.assign(profile, req.body);
//     profile.save();
//     res.status(200).send({ data: profile });
//   } catch (error) {
//     res.status(404).send(console.error(error));
//   }
// };
exports.readProfile = async (req, res) => {
  try {
    const profile = await Profile.find();
    res.status(200).send({ data: profile });
  } catch (error) {
    res.send(console.error(error));
  }
};
exports.createProfile = async (req, res) => {
  const profile = new Profile(req.body);
  await profile.save();
  res.status(200).send({ data: profile });
};
exports.createProject = async (req, res) => {
  const { title, description } = req.body;
  const newProject = {
    title,
    description,
  };
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.projects.unshift(newProject);
    await profile.save();
    res.status(200).send({ message: "Added a project" });
  } catch (error) {
    console.error(error.message);
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // get remove index
    const removeIndex = profile.projects
      .map((item) => item.id)
      .indexOf(req.params.pro_id);
    profile.projects.splice(removeIndex, 1);
    await profile.save();
    res.status(200).send({
      status: 200,
      message: "Deleted a project",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      status: 500,
      message: "server Error",
    });
  }
};