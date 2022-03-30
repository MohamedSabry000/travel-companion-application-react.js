import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react'
import { Paper, Typography, useMediaQuery } from '@material-ui/core'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import {Rating} from '@material-ui/lab'

import useStyle from './styles'
import mapStyles from './mapStyles';

const Map = ({setCoordinates, setBounds, coordinates, places, setChildClicked, weatherData}) => {

    const classes = useStyle();
    const isDesktop = useMediaQuery('(min-width: 600px)')

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact 
                bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAP_API_KEY}}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50,50,50,50]}
                options={{disableDefaultUI: true, zoomControl: true, styles: mapStyles}}
                onChange={(e) => {
                    setCoordinates({lat: e.center.lat, lng: e.center.lng})
                    setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw})
                }}
                onChildClick={(child)=>{setChildClicked(child)}}
            >
                {
                    places?.map((place, index) => (
                        <div key={index} className={classes.markerContainer} lat={Number(place.latitude) || null} lng={Number(place.longitude) || null}>
                            {
                                !isDesktop ? ( <LocationOnOutlinedIcon color='primary' fontSize='large' /> ) : (
                                    <Paper elevation={3} className={classes.paper}>
                                        <Typography variant='subtitle2' gutterBottom className={classes.typography}>{place.name}</Typography>
                                        <img 
                                            className={classes.pointer} 
                                            src={place.photo?place.photo.images.large.url: "https://hammer.ucla.edu/sites/default/files/styles/hero_r_small/public/2021-11/Lulu_Web.jpg?h=44b879e5&itok=zFjpdSCa"}
                                            alt={place.name}
                                        />
                                        <Rating size='small' value={Number(place.rating) || null} readOnly />
                                    </Paper>
                                )
                            }
                        </div>
                    ))
                }
                {
                    weatherData?.list?.map((data, index) => (
                        <div key={index} lat={Number(data.coord.lat) || null} lng={Number(data.coord.lon) || null}>
                            <img height={100} src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt={data.weather[0].description} />
                        </div>
                    ))
                }
            </GoogleMapReact>
        </div>
    )
}

export default Map;