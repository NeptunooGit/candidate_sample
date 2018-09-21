import React from 'react'

const Arrow = props => {
  const {
    className,
    desc = 'Arrow',
    focusable = 'false',
    height = '18',
    title = 'Arrow',
    width = '46',
  } = props

  return (
    <svg
      className={className}
      focusable={focusable}
      height={height}
      viewBox="0, 0, 46, 18"
      width={width}>
      <title>{title}</title>
      <desc>{desc}</desc>
      <path d="M45.7,8.3l-8-8c-0.4-0.4-1-0.4-1.4,0c-0.4,0.4-0.4,1,0,1.4L42.6,8H1C0.4,8,0,8.4,0,9c0,0.6,0.4,1,1,1h41.6 l-6.3,6.3c-0.4,0.4-0.4,1,0,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l8-8C46.1,9.3,46.1,8.7,45.7,8.3z"/>
    </svg>
  )
}

export default Arrow
