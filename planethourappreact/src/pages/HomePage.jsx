import React, { } from 'react'
import PlanetHour from '../components/PlanetHour'
import ListPlanetsHour from '../components/ListPlanetsHour'
import SunCalc from "suncalc"

const HomePage = () => {
  //const [sunset, setSunset] = useState();
  //const [day, setDay] = useState();
  //const [planet, setPlanet] = useState([Saturn, Jupiter, Mars, Sun, Venus, Mercury, Moon]);

  //pour afficher l'objet dans la console
  /*const geo = navigator.geolocation;
  console.log(geo)*/


  return (
    <div>
        <PlanetHour />
        <ListPlanetsHour />
    </div>
  )

}

export default HomePage