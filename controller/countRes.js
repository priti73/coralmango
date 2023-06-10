const Sequelize = require("sequelize");
//const sequelize = require('../util/database');
const Restaurant = require("../models/restaurant");
const Review = require("../models/review");

exports.analytics = async (req, res) => {
  try {
    const data = await Restaurant.findAll({
      attributes: [
        ["id", "ID"],
        ["name", "Restaurant Name"],
        [Sequelize.fn("COUNT", Sequelize.col("reviews.id")), "Total Reviews"],
      ],
      include: [
        {
          model: Review,
          as: "reviews",
          attributes: [],
        },
      ],
      group: ["restaurant.id"],
    });

    res.status(200).json({ data: data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Error" });
  }
};
