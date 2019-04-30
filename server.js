'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());

app.get('/location', (request, response) => {
  try { 
    const locationData = request.query.data;
    const result = searchToLatLong(locationData);
    response.send(result);
  }catch(e){ 
    console.error(e);
    response.status(500).send('Status 500: No city sent with request');
  }
  
});

function searchToLatLong(query){
  if(!query) throw new Error('No query sent');
  const geoData = require('./data/geo.json');
  console.log(geoData);
  const location = {
    search_query: query,
    formatted_query: geoData.results[0].formatted_address,
    latitude: geoData.results[0].geometry.location.lat,
    longitude: geoData.results[0].geometry.location.lng
  };

  return location;
}

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
