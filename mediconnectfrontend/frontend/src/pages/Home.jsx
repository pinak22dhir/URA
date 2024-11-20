import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import Testimonials from '../components/Testimonials'
import ShortServices from '../components/ShortService'

const Home = () => {
  return (
    <div>
      <Header/>
      <SpecialityMenu/>
      <ShortServices/>
      <TopDoctors/>
      <Testimonials/>
      <Banner/>
    </div>
  )
}

export default Home
