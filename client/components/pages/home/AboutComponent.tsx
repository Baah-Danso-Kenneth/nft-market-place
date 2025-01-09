import React from 'react'

function AboutComponent({text}:{text:string}) {
  return (
    <div className='h-auto px-5 py-20 bg-[#b0997d] w-full'>
        <p>{text}</p>
    </div>
  )
}

export default AboutComponent

