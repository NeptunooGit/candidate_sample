import React from 'react'

const Correct = props => {
  const {
    className,
    desc = 'Correct',
    focusable = 'false',
    height = '33',
    title = 'Correct',
    width = '40',
  } = props

  return (
    <svg
      className={className}
      focusable={focusable}
      height={height}
      viewBox="0, 0, 40, 33"
      width={width}>
      <title>{title}</title>
      <desc>{desc}</desc>
      <path d="M13.3,32.7c-1.1,0-2.2-0.4-3.1-1.1l-9.6-8C-0.1,23-0.2,22,0.4,21.3l4.1-4.9c0.3-0.3,0.7-0.5,1.1-0.6 c0.4,0,0.8,0.1,1.2,0.4l6.1,5.1L32.2,0.5C32.5,0.2,32.9,0,33.3,0c0.4,0,0.8,0.1,1.1,0.4l4.7,4.4c0.6,0.6,0.7,1.6,0.1,2.3L16.8,31.1 C15.9,32.1,14.6,32.7,13.3,32.7z M3.9,22.1l8.4,7c0.4,0.3,0.8,0.4,1,0.4c0.5,0,0.9-0.2,1.2-0.5L35.8,6.1l-2.3-2.2L14.2,24.6 c-0.6,0.6-1.5,0.7-2.2,0.1l-6.1-5.1L3.9,22.1z"/>
    </svg>
  )
}

export default Correct
