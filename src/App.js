import "./App.css";
import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@material-ui/core";

import { getPlacesData, getWeatherData } from "./api";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
// import PlaceDetails from './components/PlaceDetails/PlaceDetails';

const App = () => {
  const [places, setPlaces] = useState([]);
  const [childClicked, setChildClicked] = useState(null);

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");

  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
        // console.log(latitude, longitude);
      }
    );
  }, []);

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating >= rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating]);

  useEffect(() => {
    const fetchData = async () => {
      if (bounds.sw && bounds.ne) {
        setIsLoading(true);

        await getWeatherData(coordinates.lat, coordinates.lng).then((data) => {
          console.log(data);
          setWeatherData(data)
        });

        await getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
          setPlaces(data);
          setFilteredPlaces([]);
          setIsLoading(false);
          console.log(data);
        });
      }
    }
    fetchData();
  }, [type, bounds]);

  useEffect(() => {
    setRating("");
  }, [type]);

  return (
    <div className="App">
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
            weatherData={weatherData}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
