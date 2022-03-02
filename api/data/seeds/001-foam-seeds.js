const foamImageData = require("../foam-image-data.js");

exports.seed = async function (knex) {
  const imageSeedData = [];

  // seeding with max 500 images due to sqlite3 limit
  for (let i = 0; i < 500; i++) {
    imageSeedData.push({
      url: foamImageData[i].url,
      foam: false,
      lastModified: foamImageData[i].lastModified,
    });
  }
  await knex("images").insert(imageSeedData);
};
