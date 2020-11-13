const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send({ serverStatus: "halt" });
});

module.exports = router;
