import React from 'react'

const Wrong = props => {
  const {
    className,
    desc = 'Wrong',
    focusable = 'false',
    height = '40',
    title = 'Wrong',
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
      <path d="M29.5,19.9l9.8-9.8c0.9-0.9,0.9-2.3,0-3.2L33,0.7C32.5,0.2,32,0,31.4,0c-0.6,0-1.2,0.2-1.6,0.7L20,10.4 l-9.8-9.8C9.7,0.2,9.2,0,8.6,0C8,0,7.4,0.2,7,0.7L0.7,7c-0.9,0.9-0.9,2.3,0,3.2l9.8,9.8l-9.8,9.8c-0.4,0.4-0.7,1-0.7,1.6 C0,32,0.2,32.5,0.7,33L7,39.3c0.9,0.9,2.3,0.9,3.2,0l9.8-9.8l9.8,9.8c0.9,0.9,2.3,0.9,3.2,0l6.4-6.3c0.4-0.4,0.7-1,0.7-1.6 c0-0.6-0.2-1.2-0.7-1.6L29.5,19.9z M31.3,34.5L24,27.2l0,0L20,23.1l-3.2,3.2l0,0l-8.2,8.2l-3.2-3.2l8.2-8.2l0,0l3.2-3.2l-4.7-4.7 l0,0L5.4,8.6l3.2-3.2l8.2,8.2l0,0l3.2,3.2l0,0l0,0l3.2-3.2l0,0l8.2-8.2l3.2,3.2l-5.8,5.8l0,0L23.1,20l3.2,3.2l0,0l8.2,8.2L31.3,34.5 z"/>
    </svg>
  )
}

export default Wrong
