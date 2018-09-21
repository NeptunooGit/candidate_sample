import React from 'react'

const Reset = props => {
  const {
    className,
    desc = 'Start over',
    focusable = 'false',
    height = '40',
    title = 'Reset',
    width = '45',
  } = props

  return (
    <svg
      className={className}
      focusable={focusable}
      height={height}
      viewBox="0, 0, 45, 40"
      width={width}>
      <title>{title}</title>
      <desc>{desc}</desc>
      <path d="M24,0C15,0,7.2,6.2,5.1,14.9l-1.7-1.6c-0.8-0.8-2.1-0.7-2.8,0.1C0.2,13.7,0,14.2,0,14.7c0,0.5,0.2,1,0.6,1.4l5,4.8 c0.7,0.7,2,0.7,2.7,0l5.4-4.8c0.4-0.4,0.6-0.8,0.7-1.4c0-0.5-0.2-1-0.5-1.4c-0.4-0.4-0.8-0.6-1.4-0.7c-0.5,0-1,0.2-1.4,0.5l-1.8,1.6 C11.3,8.5,17.2,4,24,4c8.6,0,15.5,7,15.5,15.5S32.6,35,24,35c-1.1,0-2,0.9-2,2s0.9,2,2,2c10.8,0,19.5-8.8,19.5-19.5S34.8,0,24,0z"/>
    </svg>
  )
}

export default Reset
