const router = require("express").Router();
const Image = require("./image-model.js");

router.get("/", (req, res) => {
  Image.find(req.query)
    .then((images) => {
      res.status(200).json(images);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get images" });
    });
});

router.put("/:id", (req, res) => {
  Image.update(req.params.id, req.body)
    .then((image) => {
      res.status(200).json(image);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to update image" });
    });
});

module.exports = router;
