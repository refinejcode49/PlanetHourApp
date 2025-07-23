import React from 'react'
import PlanetHour from '../components/PlanetHour'
import ListPlanetsHour from '../components/ListPlanetsHour'

const HomePage = () => {
  return (
    <div>
        <h1 className="text-3xl font-bold underline">Planetary hour</h1>
        <PlanetHour />
        <ListPlanetsHour />
        <h1 className="text-3xl font-bold underline">
            Hello world!
        </h1>
    </div>
  )
}

export default HomePage