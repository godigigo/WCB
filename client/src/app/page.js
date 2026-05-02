import React from 'react'
import Hero from '@/components/sections/Hero'
import Experience from '@/components/sections/Experience'
import About from '@/components/sections/About'
import Testimonials from '@/components/sections/Testimonials'
import Blog from '@/components/sections/Blog'
import ContactCTA from '@/components/sections/ContactCTA'
import Team from '@/components/sections/Team'
import FacebookFeed from '@/components/sections/FacebookFeed'

const page = () => {
  return (
    <div>
      <Hero />
      <Experience/>
      <About />
      <Team />
      <Testimonials/>
      <FacebookFeed/>
      <Blog/>
      <ContactCTA/>
    </div>
  )
}

export default page