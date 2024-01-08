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
        query: {},
        fields: null,
        description: "1. Consulta para todos los documentos",
      },
      {
        query: {},
        fields: { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 },
        description: "2. Mostrar campos restaurant_id, name, borough, cuisine",
      },
      {
        query: {},
        fields: { _id: 0, restaurant_id: 1, name: 1, borough: 1, cuisine: 1 },
        description:
          "3. Mostrar campos name, borough, cuisine menos restaurant_id",
      },

      {
        query: {},
        fields: {
          _id: 0,
          restaurant_id: 1,
          name: 1,
          borough: 1,
          "address.zipcode": 1,
        },
        description:
          "4. Mostrar restaurant_id, name, borough,  zip code, menos camp _id",
      },

      {
        query: { borough: "Bronx" },
        fields: null,
        description: "5. Restaurantes en el Bronx",
      },
      {
        query: { borough: "Bronx" },
        fields: null,
        limit: 5,
        description: "6. Mostrar los primeros 5 restaurantes en el Bronx",
      },
      {
        query: { borough: "Bronx" },
        fields: null,
        skip: 5,
        limit: 5,
        description:
          "7. Mostrar los 5 restaurantes en el Bronx después de saltar los 5 primeros del Bronx",
      },
      {
        query: { borough: "Bronx" },
        fields: null,
        skip: 5,
        limit: 5,
        description:
          "7. Mostrar los 5 restaurantes en el Bronx después de saltar los 5 primeros del Bronx",
      },
      {
        query: { borough: "Bronx" },
        fields: null,
        skip: 5,
        limit: 5,
        description:
          "7. Mostrar los 5 restaurantes en el Bronx después de saltar los 5 primeros del Bronx",
      },
      {
        query: { "grades.score": { $gt: 90 } },
        fields: null,
        description: "8. Restaurantes que tenen algun score mayor a 90.",
      },
      {
        query: { "grades.score": { $gt: 80, $lt: 100 } },
        fields: null,
        description:
          "9. Restaurantes que tienen un score mayor a 80 pero menor que 100",
      },
      {
        query: { "address.coord.0": { $lt: -95.754168 } },
        fields: null,
        description:
          "10. Restaurantes que estan situados en una longitud inferior a -95.754168",
      },
      {
        query: {
          cuisine: { $ne: "American " },
          "grades.score": { $gt: 70 },
          "address.coord.0": { $lt: -65.754168 },
        },
        fields: null,
        description:
          "11. Restaurantes que no cocinan comida 'American ' y tienen algun score superior a 70 y longitud inferior a -65.754168",
      },
      {
        query: {
          cuisine: { $ne: "American " },
          "grades.score": { $gt: 70 },
          "address.coord.0": { $lt: -65.754168 },
        },
        fields: null,
        description:
          "12. Restaurantes que no preparan comida 'American' y tienen algun score superior a 70 y se localizan longitudes inferiors a -65.754168.",
      },
      {
        query: {
          cuisine: { $ne: "American " },
          "grades.score": { $gt: 70 },
          "address.coord.0": { $lt: -65.754168 },
        },
        fields: null,
        sort: { cuisine: -1 },
        description:
          "13. Restaurantes que no preparan comida 'American ', tienen alguna nota 'A' y no pertenecen a Brooklyn. Ordren ascendente",
      },

      {
        query: {
          name: /^Wil/,
        },
        fields: {
          restaurant_id: 1,
          name: 1,
          borough: 1,
          cuisine: 1,
        },
        description:
          "14. Encuentra el restaurant_id, name, borough y cuisine en esos restaurantes que contienen 'Wil' en las tres primeres letras en su nombre",
      },
      {
        query: {
          name: /ces$/,
        },
        fields: {
          restaurant_id: 1,
          name: 1,
          borough: 1,
          cuisine: 1,
        },
        description:
          "15. Encuentra el restaurant_id, name, borough y cuisine de esos restaurantes que contienen  'ces' en las últimas tres letras en su nombre",
      },
      {
        query: {

            name: /Reg/,

        },
        fields: {
          restaurant_id: 1,
          name: 1,
          borough: 1,
          cuisine: 1,
        },
        description:
          "16. Encuentra el restaurant_id, name, borough y cuisine de esos restaurantes que contienen  'Reg' en cualquier parte de su nombre",
      },
      {
        query: {
          borough: "Bronx",
          cuisine: { $in: ["American ", "Chinese"] },
        },
        fields: null,
        description:
          "17. Restaurantes que pertenecen al Bronx i preparan platos americanos o chinos",
      },
      {
        query: {
          borough: { $in: ["Staten Island", "Queens", "Bronx", "Brooklyn"] },
        },
        fields: {
          restaurant_id: 1,
          name: 1,
          borough: 1,
          cuisine: 1,
        },
        description:
          "18. Restaurantes con restaurant_id, name, borough y cuisine de los restaurantes que pertenecen a Staten Island, Queens, Bronx o Brooklyn",
      },
      {
        query: {
          borough: { $nin: ["Staten Island", "Queens", "Bronx", "Brooklyn"] },
        },
        fields: {
          restaurant_id: 1,
          name: 1,
          borough: 1,
          cuisine: 1,
        },
        description:
          "19. Restaurantes con restaurant_id, name, borough y cuisine de los restaurantes que NO pertenecen a Staten Island, Queens, Bronx o Brooklyn",
      },

      {
        query: {
          "grades.score": { $lt: 10 },
        },
        fields: {
          restaurant_id: 1,
          name: 1,
          borough: 1,
          cuisine: 1,
        },
        description:
          "20. Restaurantes con restaurant_id, name, borough y cuisine de los restaurantes que consiguan una nota menor que 10",
      },
      {
        query: {
          cuisine: "seafood",
          cuisine: { $nin: ["American", "Chinese"] },
          name: { $not: /^Wil/ },
        },
        fields: {
          restaurant_id: 1,
          name: 1,
          borough: 1,
          cuisine: 1,
        },
        description:
          "21. Restaurantes con restaurant_id, name, borough y cuisine de los restaurantes que preparan seafood excepto so som American, Chinese o el nombre comienza con 'Wil'",
      },
      {
        query: {
          grades: {
            $elemMatch: {
              grade: "A",
              score: 11,
              date: new Date("2014-08-11T00:00:00Z"),
            },
          },
          fields: {
            restaurant_id: 1,
            name: 1,
            grades: 1,
          },
          description:
            "22. Restaurante con restaurant_id, name y grades que consigan un grade de 'A' y un score de 11 amb un ISODate '2014-08-11T00:00:00Z'",
        },
      },
      {
        query: {
          "grades.1": {
            grade: "A",
            score: 9,
            date: new Date("2014-08-11T00:00:00Z"),
          },
        },
        fields: {
          restaurant_id: 1,
          name: 1,
          grades: 1,
        },
        description:
          "23. Restaurante con restaurant_id, name y grades que en el 2o elemento del array de grades tenga 'A' y un score 9 con ISODate '2014-08-11T00:00:00Z'",
      },
      {
        query: { "address.coord.1": { $gte: 42, $lte: 52 } },
        fields: {
          restaurant_id: 1,
          name: 1,
          address: 1,
        },
        description:
          "24. Restaurante con rrestaurant_id, name, adreça y ubicación per a los que el segundo elemento del array coord tenga un valor entre 42 y 52",
      },
      {
        query: {},
        fields: null,
        sort: { name: 1 },
        description: "25. Restaurantes por nombre en orden ascendiente",
      },
      {
        query: {},
        fields: null,
        sort: { name: -1 },
        description: "26. Restaurantes por nombre en orden descendiente",
      },
      {
        query: {},
        fields: null,
        sort: { cuisine: 1, borough: -1 },
        description:
          "27. Restaurantes por nombre de la cuisine en orden ascendiente y por el barrio en orden descendiente",
      },
      {
        query: {
          "address.street": { $exists: true },
        },
        fields: null,
        description: "28. Saber si las direcciones contienen calle",
      },
      {
        query: {
          "address.coord": { $type: "double" },
        },
        fields: null,
        description: "29. Los valores del campo coord es de tipo double",
      },
      {
        query: {
          "grades.score": { $mod: [7, 0] },
        },
        fields: { restaurant_id: 1, name: 1, grades: 1 },
        description:
          "30. restaurant_id, name y grade para restaurantes que devuelvan 0 com a residuo després de dividir alguno dels sus score por 7",
      },
      {
        query: {
          name: /mon/,
        },
        fields: { name: 1, borough: 1, "address.coord": 1, cuisine: 1 },
        description:
          "31. Nombre de restaurant, borough, longitud, latitud y cuisine de restaurantes que contengan 'mon' en alguna parte de su name",
      },

      {
        query: {
          name: /^Mad/,
        },
        fields: {
          name: 1,
          borough: 1,
          "address.coord": 1,
          cuisine: 1,
        },
        description:
          "32. restaurant, borough, longitud, latitud y cuisine de restaurantes que contengan 'Mad' como primeras tres letras en su name",
      },
    ];

    for (const q of queries) {
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
      console.log(`${q.description}:`, results);
    }
  } catch (err) {
    console.error("An error occurred while connecting to database", err);
  }
}

connectDB();