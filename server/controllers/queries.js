const Query = require("../models/Query");

exports.findQueries = async (req, res) => {
  const queries = await Query.find();
  res.send({ data: queries });
};

exports.createQuery = async (req, res) => {
  const query = new Query(req.body);
  await query.save();
  res.send({ data: query });
};

exports.findQuery = async (req, res) => {
  try {
    const query = await Query.findById(req.params.id);
    res.send({ data: query });
  } catch {
    res.status(404).send({ error: "Query is not found!" });
  }
};
