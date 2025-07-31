import React, { useEffect, useState } from 'react'
import ListPlanetsHour from './ListPlanetsHour';
import SunCalc from "suncalc"

const PlanetHour = () => {
  const planets = ["Saturn", "Jupiter", "Mars", "Sun", "Venus", "Mercury", "Moon"]
  const [position, setPosition] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported")
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
      setPosition(position)
      //console.log(position)
    },
    (err) => {
      setError(err.message);
    }
  );
})

useEffect(() => {
  if (position && position.coords) {
    const times = SunCalc.getTimes(new Date(), position.coords.latitude, position.coords.longitude);
    const sunrise = times.sunrise
    const sunset = times.sunset
    
    /** -------- to get the daylight duration --------- */
    // !!!! Lorsque l'on fait opération entre deux dates en Js (ici une soustraction), le resultat est en millisecondes
    const daylightDuration = sunset - sunrise
    // to get the duration of one planetary hour
    const planetaryHourDurationByDay = daylightDuration / 12;
    
    //create the 12 planetary hours
    let currentTime = new Date(sunrise)
    for (let i = 0; i < 12; i++) {
      let nextTime = new Date(currentTime.getTime() + planetaryHourDurationByDay)
      //console.log(nextTime)
      //console.log(`Heure planétaire ${i+ 1}: de ${currentTime} à ${nextTime}`)
      currentTime = nextTime;
      //console.log(typeof nextTime)
    }
    
     /** -------- to get the night duration --------- */
     const nextDaySunrise = new Date(currentTime)
     nextDaySunrise.setDate(currentTime.getDate() + 1)
    const nightDuration = (nextDaySunrise - sunset)
    // to get the duration of one planetary hour
    const planetaryHourDurationByNight = nightDuration / 12;
    
    //create the 12 planetary hours at night
    let currentTimeAtNight = new Date(sunset)
    for (let i = 0; i < 12; i++) {
      let nextTime2 = new Date(currentTimeAtNight.getTime() +  planetaryHourDurationByNight)
      //console.log(nextTime2)
      //console.log(`Heure planétaire ${i+ 1}: de ${currentTimeAtNight} à ${nextTime2}`)
      currentTimeAtNight = nextTime2;
    }

  }

}, [position])


  const today = new Date();
  // to get the gay of the week for a given date, here FOR TODAY !!
  const dayOfWeek = today.getDay();
  //console.log(dayOfWeek)

  const dayRuler = {
    0: "Sun",
    1: "Moon",
    2: "Mars",
    3: "Mercury", 
    4: "Jupiter",
    5: "Venus",
    6: "Saturn"
  }
  const firstPlanet = dayRuler[dayOfWeek] // pour aujourd'hui c'est jupiter
  const startIndex = planets.indexOf(firstPlanet); // l'index de l'array planet !!!
  //console.log(`la première planete est ${firstPlanet} et son index est ${startIndex}`)

  let planetarySequence = []

  for (let i = 0; i < 24; i++) {
    //le modulo 7 permet de revenir au debut de planetes quand on arrive à moon (moon => saturn => jupiter etc..)
    let planet = planets[(startIndex + i ) % 7]
    planetarySequence.push(planet)
  }
  //pour associer une planète à une tranche horaire mais currentTime undefined
  /*const trancheHoraire = currentTime.forEach((tranche, index) => {
      console.log(`De ${tranche.start} à ${tranche.end} = ${planetarySequence[index]}`)
  });*/


  

  return (
    <div>
        <h1 className="text-3xl font-bold underline">Planetary hour</h1>
        <p>My location is : {position && position.coords
    ? `- Latitude ${position.coords.latitude} - Longitude ${position.coords.longitude}`
    : error}</p>
        
    </div>
  )
}

export default PlanetHour