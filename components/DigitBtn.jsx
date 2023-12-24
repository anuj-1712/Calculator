import React from 'react'

export default function DigitBtn({digit,handleFunc}) {
  return (
    <button className='h-[82px] text-3xl font-medium text-white w-full bg-[#45474B] rounded-[50%]' onClick={handleFunc}>
      {digit}
    </button>
  )
}
