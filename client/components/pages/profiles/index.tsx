"use client"
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'
import ProfileContent from './ProfileContent'

function  Profile() {
  return (
    <div>
        <Header/>
        <ProfileContent/>
        <Footer/>
    </div>
  )
}

export default  Profile