import React from 'react'

const Minus = props => {
  const {
    className,
    desc = 'Minus',
    focusable = 'false',
    height = '5',
    title = 'Minus',
    width = '40',
  } = props

  return (
    <svg
      className={className}
      focusable={focusable}
      height={height}
      viewBox="0, 0, 40, 5"
      width={width}>
      <title>{title}</title>
      <desc>{desc}</desc>
      <path d="M37.3,5H2.5C1.1,5,0,3.9,0,2.5S1.1,0,2.5,0h34.8c1.4,0,2.5,1.1,2.5,2.5S38.7,5,37.3,5z"/>
    </svg>
  )
}

export default Minus
