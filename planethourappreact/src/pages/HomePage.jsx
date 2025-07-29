import React, { useState } from 'react'
import PlanetHour from '../components/PlanetHour'
import ListPlanetsHour from '../components/ListPlanetsHour'
import SunCalc from "suncalc"

const HomePage = () => {
  const [position, setPosition] = useState()
  //const [latitude, setLatitude] = useState()
  //const [longitude, setLongitude] = useState()
  //pour afficher l'objet dans la console
  /*const geo = navigator.geolocation;
  console.log(geo)*/

  //function getPosition() {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition(pos);
        const times = SunCalc.getTimes(new Date(), pos.coords.latitude, pos.coords.longitude);
        //console.log("Latitude:", pos.coords.latitude, "Longitude:", pos.coords.longitude);
        console.log(times)
        const sunrise = times.sunrise;
        const sunset = times.sunset;
        console.log(`Le soleil se lève à ${sunrise} et se couche à ${sunset}`)
        const daylightDuration = (sunset - sunrise) ;
        const planetaryHourByDay = (daylightDuration / 12) / 60000;
        console.log(`la journée dure ${daylightDuration} et chaque heure planète dure ${planetaryHourByDay} minutes`);
      }
    );
  } else {
    console.log("Geolocation is not supported.");
  }

  //}
  //function getTime() {
    //const times = SunCalc.getTimes(new Date(), pos.coords.latitude, pos.coords.longitude);
    //SunCalc.getTimes(/*Date*/ date, /*Number*/ latitude, /*Number*/ longitude, /*Number (default=0)*/ height)
    //console.log(times)
  //}
 


  return (
    <div>
        <h1 className="text-3xl font-bold underline">Planetary hour</h1>
        <p>My location is : {position && position.coords
    ? `- Latitude ${position.coords.latitude} - Longitude ${position.coords.longitude}`
    : " Location not available"}</p>
        <PlanetHour />
        <ListPlanetsHour />
        <h1 className="text-3xl font-bold underline">
            Hello world!
        </h1>
    </div>
  )

}

export default HomePage