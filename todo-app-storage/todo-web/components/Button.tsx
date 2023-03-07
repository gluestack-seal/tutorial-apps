import React from 'react'

const Button = ({ children, ...props }: any) => {
  return (
    <div onClick={props.onClick} className={`${props.className} block px-4 font-thin rounded text-xl border cursor-pointer`}>
      {children}
    </div>
  )
}

export default Button
