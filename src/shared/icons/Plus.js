import React from 'react'

const Plus = props => {
  const {
    className,
    desc = 'Plus',
    focusable = 'false',
    height = '40',
    title = 'Plus',
    width = '40',
  } = props

  return (
    <svg
      className={className}
      focusable={focusable}
      height={height}
      viewBox="0, 0, 40, 40"
      width={width}>
      <title>{title}</title>
      <desc>{desc}</desc>
      <path d="M37.3,17.4H22.4V2.5c0-1.4-1.1-2.5-2.5-2.5s-2.5,1.1-2.5,2.5v14.9H2.5c-1.4,0-2.5,1.1-2.5,2.5s1.1,2.5,2.5,2.5 h14.9v14.9c0,1.4,1.1,2.5,2.5,2.5s2.5-1.1,2.5-2.5V22.4h14.9c1.4,0,2.5-1.1,2.5-2.5S38.7,17.4,37.3,17.4z"/>
    </svg>
  )
}

export default Plus
