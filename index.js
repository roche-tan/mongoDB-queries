const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to database");

    const restaurantSchema = new mongoose.Schema({
      address: {
        building: String,
        coord: [Number],
        street: String,
        zipcode: String,
      },
      borough: String,
      cuisine: String,
      grades: [
        {
          date: Date,
          grade: String,
          score: Number,
        },
      ],
      name: String,
      restaurant_id: String,
    });

    // Crea un modelo Mongoose a partir del esquema definido.
    const Restaurant = mongoose.model(
      "Restaurant",
      restaurantSchema,
      "restaurant_list"
    );

    const queries = [
      {
        query: {}, fields: null
      },
      {
        query: {}, fields: { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 },
      },
      {
        query: {}, fields: { _id: 0, restaurant_id: 1, name: 1, borough: 1, cuisine: 1 },
      },
      {
        query: {}, fields: { _id: 0, restaurant_id: 1, name: 1, borough: 1, "address.zipcode": 1},
      },
      {
        query: { borough: "Bronx" }, fields: null
      },
      {
        query: { borough: "Bronx" }, fields: null, limit: 5
      },
      {
        query: { borough: "Bronx" }, fields: null, skip: 5, limit: 5
      },
      {
        query: { borough: "Bronx" }, fields: null, skip: 5, limit: 5
      },
      {
        query: { borough: "Bronx" }, fields: null, skip: 5, limit: 5
      },
      {
        query: { "grades.score": { $gt: 90 }}, fields: null
      },
      {
        query: { "grades.score": { $gt: 80, $lt: 100 }}, fields: null
      },
      {
        query: { "address.coord.0": { $lt: -95.754168 }}, fields: null
      },
      {
        query: { cuisine: { $ne: "American " }, "grades.score": { $gt: 70 }, "address.coord.0": { $lt: -65.754168 }}, fields: null
      },
      {
        query: { cuisine: { $ne: "American " }, "grades.score": { $gt: 70 }, "address.coord.0": { $lt: -65.754168 }}, fields: null,
      },
      {
        query: { cuisine: { $ne: "American " }, "grades.score": { $gt: 70 }, "address.coord.0": { $lt: -65.754168 } }, fields: null, sort: { cuisine: -1 },
      },
      {
        query: { name: /^Wil/ }, fields: { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }},
      {
        query: { name: /ces$/ }, fields: { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }
      },
      {
        query: { name: /Reg/ }, fields: { restaurant_id: 1, name: 1, borough: 1, cuisine: 1}
      },
      {
        query: { borough: "Bronx", cuisine: { $in: ["American ", "Chinese"] }}, fields: null
      },
      {
        query: { borough: { $in: ["Staten Island", "Queens", "Bronx", "Brooklyn"] }}, fields: { restaurant_id: 1, name: 1, borough: 1, cuisine: 1}
      },
      {
        query: { borough: { $nin: ["Staten Island", "Queens", "Bronx", "Brooklyn"] }}, fields: { restaurant_id: 1, name: 1, borough: 1, cuisine: 1}
      },
      {
        query: { "grades.score": { $lt: 10 } }, fields: { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 },
      },
      {
        query: { cuisine: "seafood", cuisine: { $nin: ["American", "Chinese"] }, name: { $not: /^Wil/ }}, fields: { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }},
      {
        query: { grades: { $elemMatch: { grade: "A", score: 11, date: new Date("2014-08-11T00:00:00Z")}}}, fields: { restaurant_id: 1, name: 1, grades: 1, },
      },
      {
        query: { "grades.1": { grade: "A", score: 9, date: new Date("2014-08-11T00:00:00Z")}}, fields: { restaurant_id: 1, name: 1, grades: 1}
      },
      {
        query: { "address.coord.1": { $gte: 42, $lte: 52 }}, fields: { restaurant_id: 1, name: 1, address: 1}
      },
      {
        query: {}, fields: null, sort: { name: 1 },
      },
      {
        query: {}, fields: null, sort: { name: -1 },
      },
      {
        query: {}, fields: null, sort: { cuisine: 1, borough: -1 },
      },
      {
        query: { "address.street": { $exists: true }}, fields: null,
      },
      {
        query: { "address.coord": { $type: "double" }}, fields: null
      },
      {
        query: { "grades.score": { $mod: [7, 0] }}, fields: { restaurant_id: 1, name: 1, grades: 1 }
      },
      {
        query: { name: /mon/ }, fields: { name: 1, borough: 1, "address.coord": 1, cuisine: 1 }
      },

      {
        query: { name: /^Mad/ }, fields: { name: 1, borough: 1, "address.coord": 1, cuisine: 1 }
      },
    ];

    for (const [index, q] of queries.entries()) {
      let resultQuery = Restaurant.find(q.query, q.fields);

      if (q.skip) {
        resultQuery = resultQuery.skip(q.skip);
      }
      if (q.limit) {
        resultQuery = resultQuery.limit(q.limit);
      }
      if (q.sort) {
        resultQuery = resultQuery.sort(q.sort);
      }

      const results = await resultQuery;
      console.log(`Query ${index + 1}:`, results);
    }
  } catch (err) {
    console.error("An error occurred while connecting to database", err);
  }
}

connectDB();
