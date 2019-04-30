'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());

app.get('/location', (request, response) => {
  const locationData = request.query.data;
  const result = searchToLatLong(locationData);
});

function searchToLatLong(query){
  const geoData = require('./data/geo.json');
  const location = {
    search_query: query,
    formatted_query: geoData.results[0].formatted_query,
    latitude: geoData.results[0].latitude,
    longitude: geoData.results[0].longitude,
  };

  return location;
}

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});