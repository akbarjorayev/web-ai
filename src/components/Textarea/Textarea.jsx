import React from 'react'

import './Textarea.css'

const Textarea = React.forwardRef(({ ...props }, ref) => {
  return <textarea ref={ref} {...props}></textarea>
})

export default Textarea
