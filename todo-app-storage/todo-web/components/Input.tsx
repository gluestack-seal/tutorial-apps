import React from 'react'

const Input = (props: any) => {
  return (
    <>
      <label className='text-left mb-1'>{props.label}:</label>
      <input
        placeholder={props.placeholder}
        value={props.value}
        type={props.type}
        name={props.name}
        onChange={props.onChange}
        className='p-2 mb-3 border bg-transparent rounded outline-none font-thin text-lg'
      />
    </>
  )
}

export default Input
