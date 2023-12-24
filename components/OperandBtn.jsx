import React from 'react'

export default function OperandBtn({operator,handleFunc}) {
  return (
    <button className='h-[82px] text-3xl font-medium text-white w-full bg-[#FFB534] rounded-[50%]' onClick={handleFunc}>
    {operator}
  </button>
  )
}
