import React from 'react'

import './input.css'

const Input = React.forwardRef((props, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      onInput={(e) => e.currentTarget.classList.remove('error')}
    />
  )
})

export default Input
