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

    // //1. consulta para todos los documentos
    // const allRestaurants = await Restaurant.find({});
    // console.log(allRestaurants);

    // // 2. Mostrar campos restaurant_id, name, borough i cuisine
    // const specificFields = await Restaurant.find(
    //   {},
    //   { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }
    // );
    // console.log("Restaurants with specific fields:", specificFields);

    // // 3. monstrar campos name, borough i cuisine menos restaurant_id,
    // const specificNoId = await Restaurant.find(
    //   {},
    //   {_id: 0, restaurant_id:1, name: 1, borough: 1, cuisine: 1 }
    // );
    // console.log(specificNoId);

    // // 4.  restaurant_id, name, borough i zip code, però excloent el camp _id
    // const withZipcodeNoId = await Restaurant.find(
    //   {},
    //   { _id: 0, restaurant_id: 1, name: 1, borough: 1, "address.zipcode": 1 }
    // );
    // console.log(withZipcodeNoId);

    // // 5. mostrar tots els restaurants que estan en el Bronx.
    // const bronxRestaurants = await Restaurant.find({ borough: "Bronx" });
    // console.log(bronxRestaurants);

    //     // 6. mostrar els primers 5 restaurants que estan en el Bronx.
    //     const bronxFirstFive = await Restaurant.find({ borough: "Bronx" }).limit(5);
    // console.log(bronxFirstFive);

    // // 7. mostrar els 5 restaurants després de saltar els primers 5 que siguin del Bronx.
    // const skipbronxFirstFive = await Restaurant.find({ borough: "Bronx" })
    //   .skip(5)
    //   .limit(5);
    // console.log(skipbronxFirstFive);

    // // 8. restaurants que tenen algun score més gran de 90.
    // const moreScore = await Restaurant.find({ "grades.score": { $gt: 90 } });
    // console.log(moreScore);

    // // 9. restaurants que tenen un score més gran que 80 però menys que 100.
    // const scoreBetween = await Restaurant.find({
    //   "grades.score": { $gt: 80, $lt: 100 },
    // });
    // console.log(scoreBetween);

    // // 10.  restaurants que estan situats en una longitud inferior a -95.754168.
    // const restaurantWithLongitude = await Restaurant.find({ "address.coord.0": { $lt: -95.754168 }})
    // console.log(restaurantWithLongitude);

    // // 11. restaurants que no cuinen menjar 'American ' i tenen algun score superior a 70 i longitud inferior a -65.754168.
    // const withAndLongitudNoAmerican = await Restaurant.find({
    //   $and: [
    //     { cuisine: { $ne: "American " } },
    //     { "grades.score": { $gt: 70 } },
    //     { "address.coord.0": { $lt: -65.754168 } },
    //   ],
    // });
    // console.log( withAndLongitudNoAmerican);

    // // 12. no preparen menjar 'American' i tenen algun score superior a 70 i que, a més, es localitzen en longituds inferiors a -65.754168. Nota: Fes aquesta consulta sense utilitzar operador $and.
    // const withLongitudNoAmerican = await Restaurant.find({
    //   cuisine: { $ne: 'American ' },
    //   "grades.score": { $gt: 70 },
    //   "address.coord.0": { $lt: -65.754168 }
    // });
    // console.log(withLongitudNoAmerican);

    // // 13. restaurants que no preparen menjar 'American ', tenen alguna nota 'A' i no pertanyen a Brooklyn. S'ha de mostrar el document segons la cuisine en ordre descendent.
    // const restaurantAnoBrooklyn = await Restaurant.find({
    //   cuisine: { $ne: "American " },
    //   "grades.grade": "A",
    //   borough: { $ne: "Brooklyn" },
    // }).sort({ cuisine: -1 });
    // console.log(restaurantAnoBrooklyn);

    // //  14. trobar el restaurant_id, name, borough i cuisine per a aquells restaurants que contenen 'Wil' en les tres primeres lletres en el seu nom.

    // const query = await Restaurant.find(
    //   {
    //     name: /^Wil/,
    //   },
    //   {
    //     restaurant_id: 1,
    //     name: 1,
    //     borough: 1,
    //     cuisine: 1,
    //   }
    // );

    //   // 15. trobar el restaurant_id, name, borough i cuisine per a aquells restaurants que contenen 'ces' en les últimes tres lletres en el seu nom.
    //   const query = await Restaurant.find({
    //     name: /ces$/
    // }, {
    //     restaurant_id: 1, name: 1, borough: 1, cuisine: 1
    // });

    // 16. trobar el restaurant_id, name, borough i cuisine per a aquells restaurants que contenen 'Reg' en qualsevol lloc del seu nom.
    // const query = await Restaurant.find(
    //   {
    //     name: /Reg/,
    //   },
    //   {
    //     restaurant_id: 1,
    //     name: 1,
    //     borough: 1,
    //     cuisine: 1,
    //   }
    // );

    // // 17.  trobar els restaurants que pertanyen al Bronx i preparen plats Americans o xinesos.
    // const query = await Restaurant.find({
    //   borough: "Bronx",
    //   cuisine: { $in: ["American ", "Chinese"] },
    // });

    // // 18.  trobar el restaurant_id, name, borough i cuisine per aquells restaurants que pertanyen a Staten Island, Queens, Bronx o Brooklyn.
    // const query = await Restaurant.find(
    //   {
    //     borough: { $in: ["Staten Island", "Queens", "Bronx", "Brooklyn"] },
    //   },
    //   {
    //     restaurant_id: 1,
    //     name: 1,
    //     borough: 1,
    //     cuisine: 1,
    //   }
    // );

    // // 19.  trobar el restaurant_id, name, borough i cuisine per a aquells restaurants que NO pertanyen a Staten Island, Queens, Bronx o Brooklyn.

    // const query = await Restaurant.find(
    //   {
    //     borough: { $nin: ["Staten Island", "Queens", "Bronx", "Brooklyn"] },
    //   },
    //   {
    //     restaurant_id: 1,
    //     name: 1,
    //     borough: 1,
    //     cuisine: 1,
    //   }
    // );

    // // 20. trobar el restaurant_id, name, borough i cuisine per a aquells restaurants que aconsegueixin una nota menor que 10.
    // const query = await Restaurant.find(
    //   {
    //     "grades.score": { $lt: 10 },
    //   },
    //   {
    //     restaurant_id: 1,
    //     name: 1,
    //     borough: 1,
    //     cuisine: 1,
    //   }
    // );

    // // 21.  trobar el restaurant_id, name, borough i cuisine per a aquells restaurants que preparen marisc ('seafood') excepte si són 'American ', 'Chinese' o el name del restaurant comença amb lletres 'Wil'.
    // const query = await Restaurant.find(
    //   {
    //     cuisine: "seafood",
    //     cuisine: { $nin: ["American", "Chinese"] },
    //     name: { $not: /^Wil/ },
    //   },
    //   {
    //     restaurant_id: 1,
    //     name: 1,
    //     borough: 1,
    //     cuisine: 1,
    //   }
    // );

    // 22. trobar el restaurant_id, name i grades per a aquells restaurants que aconsegueixin un grade de "A" i un score d'11 amb un ISODate "2014-08-11T00:00:00Z".
    // const query = await Restaurant.find(
    //   {
    //     grades: {
    //       $elemMatch: {
    //         grade: "A",
    //         score: 11,
    //         date: new Date("2014-08-11T00:00:00Z"),
    //       },
    //     },
    //   },
    //   {
    //     restaurant_id: 1,
    //     name: 1,
    //     grades: 1,
    //   }
    // );

    // 23. trobar el restaurant_id, name i grades per a aquells restaurants on el 2n element de l'array de graus conté un grade de "A" i un score 9 amb un ISODate "2014-08-11T00:00:00Z".
    // const query = await Restaurant.find(
    //   {
    //     "grades.1": {
    //       grade: "A",
    //       score: 9,
    //       date: new Date("2014-08-11T00:00:00Z"),
    //     },
    //   },
    //   {
    //     restaurant_id: 1,
    //     name: 1,
    //     grades: 1,
    //   }
    // );

    // 24.  trobar el restaurant_id, name, adreça i ubicació geogràfica per a aquells restaurants on el segon element de l'array coord conté un valor entre 42 i 52.
    // const query = await Restaurant.find(
    //   { "address.coord.1": { $gte: 42, $lte: 52 } },
    //   {
    //     restaurant_id: 1,
    //     name: 1,
    //     address: 1,
    //   }
    // );

    // // 25. organitzar els restaurants per nom en ordre ascendent.
    // const query = await Restaurant.find({}).sort({ name: 1 });

    // // 26. organitzar els restaurants per nom en ordre ascendent.
    // const query = await Restaurant.find({}).sort({ name: -1 });

    // // 27. organitzar els restaurants pel nom de la cuisine en ordre ascendent i pel barri en ordre descendent.
    // const query = await Restaurant.find({}).sort({ cuisine: 1, borough: -1 });

    // // 28. Escriu una consulta per saber si les direccions contenen el carrer.
    // const query = await Restaurant.find({
    //   "address.street": { $exists: true },
    // });

    // // 29.  seleccioni tots els documents en la col·lecció de restaurants on els valors del camp coord és de tipus Double.
    // const query = await Restaurant.find({
    //   "address.coord": { $type: "double" },
    // });

    // 30.  seleccioni el restaurant_id, name i grade per a aquells restaurants que retornen 0 com a residu després de dividir algun dels seus score per 7.
    // const query = await Restaurant.find({ "grades.score": { $mod: [7, 0] } }, {
    //   restaurant_id: 1, name: 1, grades: 1
    // })

    // // 31.  trobar el name de restaurant, borough, longitud, latitud i cuisine per a aquells restaurants que contenen 'mon' en algun lloc del seu name.
    // const query = await Restaurant.find(
    //   {
    //     name: /mon/,
    //   },
    //   {
    //     name: 1,
    //     borough: 1,
    //     "address.coord": 1,
    //     cuisine: 1,
    //   }
    // );

    // 32. trobar el name de restaurant, borough, longitud, latitud i cuisine per a aquells restaurants que contenen 'Mad' com a primeres tres lletres del seu name.
    const query = await Restaurant.find(
      {
        name: /^Mad/,
      },
      {
        name: 1,
        borough: 1,
        "address.coord": 1,
        cuisine: 1,
      }
    );

    console.log(query);
  } catch (err) {
    console.error("An error occurred while connecting to database", err);
  }
}

connectDB();
