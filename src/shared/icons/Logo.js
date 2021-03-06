import React from 'react'

const Logo = props => {
  const {
    className,
    desc = 'Online Medicare Plans Logo',
    focusable = 'false',
    height = '40',
    title = 'Logo',
    width = '248',
  } = props

  return (
    <svg
      className={className}
      focusable={focusable}
      height={height}
      viewBox="0, 0, 248, 40"
      width={width}>
      <title>{title}</title>
      <desc>{desc}</desc>
      <path d="M31,26.7c0,9.2-8.7,13.1-15.6,13.1S0,35.9,0,26.7V13.1C0,3.9,8.5,0,15.4,0S31,3.9,31,13.1V26.7z M21.9,13.9 c0-3.7-2.7-5.9-6.5-5.9C11.7,8,9,10.2,9,13.9v12c0,3.7,2.7,5.9,6.4,5.9c3.8,0,6.5-2.1,6.5-5.9V13.9z"/> <path d="M87.3,2.5v34.8c0,1.3-0.7,1.7-1.7,1.7H80c-1.1,0-1.7-0.3-1.7-1.7V17.7l-5.8,10.2c-0.3,0.5-0.8,1.2-1.7,1.2h-2.9 c-0.9,0-1.3-0.7-1.6-1.2l-5.9-10.2v19.7c0,1.3-0.7,1.7-1.7,1.7H53c-1.1,0-1.7-0.3-1.7-1.7V2.5c0-1.1,0.3-1.7,1.7-1.7h5.8 c2,0,2.2,1.3,2.7,2l8,14.3l8-14.2c0.4-0.7,0.7-2,2.6-2h5.5C87,0.8,87.3,1.5,87.3,2.5z"/> <path d="M137.1,14.3c0,8-5.4,13.4-15.2,13.4h-5.5v9.6c0,1.3-0.7,1.7-1.7,1.7h-5.8c-1.1,0-1.7-0.3-1.7-1.7V2.5 c0-1.1,0.3-1.7,1.7-1.7h13C131.9,0.9,137.1,6.3,137.1,14.3z M128.4,14.5c0-3-2-5.4-6.5-5.4h-5.5v10.8h5.5 C126.5,19.8,128.4,17.4,128.4,14.5z"/> <path d="M43.4,24.8h-4.8c-0.5,0-0.8-0.3-0.8-0.8v-8c0-0.5,0.3-0.8,0.8-0.8h4.8c0.5,0,0.8,0.3,0.8,0.8v8 C44.2,24.4,43.9,24.8,43.4,24.8z"/> <path d="M99.8,24.8H95c-0.5,0-0.8-0.3-0.8-0.8v-8c0-0.5,0.3-0.8,0.8-0.8h4.8c0.5,0,0.8,0.3,0.8,0.8v8 C100.6,24.4,100.3,24.8,99.8,24.8z"/> <path d="M145.2,33.9c0.7,0,1.4,0.2,1.9,0.8c0.5,0.5,0.8,1.2,0.8,2s-0.2,1.5-0.8,2c-0.5,0.5-1.1,0.8-1.9,0.8c-0.8,0-1.4-0.2-2-0.8 c-0.5-0.5-0.8-1.2-0.8-2s0.2-1.5,0.8-2C143.8,34.1,144.5,33.9,145.2,33.9z"/> <path d="M175.4,35.8c-1.2,1.2-2.6,2.2-4.1,2.9c-1.5,0.7-3.3,1.1-5.2,1.1c-1.7,0-3.3-0.3-4.9-1c-1.5-0.7-2.8-1.5-4-2.6 c-1.1-1.1-2-2.4-2.6-3.9c-0.7-1.5-1-3.2-1-4.9c0-1.8,0.3-3.4,1-5s1.5-2.8,2.6-4c1.1-1.1,2.4-2,4-2.6c1.5-0.7,3.2-1,4.9-1 c1.6,0,3.2,0.2,4.6,0.8c1.4,0.6,2.6,1.3,3.8,2.3c0.3,0.2,0.6,0.5,0.7,0.7c0.2,0.2,0.2,0.6,0.2,1c0,0.5-0.2,0.9-0.5,1.2 c-0.3,0.3-0.8,0.5-1.3,0.5c-0.4,0-0.7-0.1-0.9-0.2c-0.2-0.1-0.4-0.3-0.7-0.6c-0.7-0.7-1.5-1.1-2.5-1.6c-1.1-0.4-2.2-0.7-3.3-0.7 c-1.2,0-2.4,0.2-3.5,0.7c-1.1,0.5-2,1.1-2.8,2s-1.5,1.8-2,2.9s-0.7,2.3-0.7,3.5s0.2,2.4,0.7,3.5c0.5,1.1,1.1,2,2,2.8s1.8,1.5,2.8,2 c1.1,0.5,2.3,0.7,3.5,0.7c1.4,0,2.7-0.2,3.8-0.8c1.1-0.5,2.1-1.2,2.8-2.2c0.2-0.3,0.5-0.6,0.7-0.7c0.2-0.2,0.5-0.2,1-0.2 s1,0.2,1.3,0.5c0.3,0.3,0.5,0.7,0.5,1.3c0,0.3-0.1,0.6-0.2,0.8C175.8,35.3,175.6,35.5,175.4,35.8z"/> <path d="M194.1,15c1.7,0,3.3,0.3,4.9,1c1.5,0.7,2.8,1.5,4,2.6c1.1,1.1,2,2.4,2.7,4c0.7,1.5,1,3.2,1,5c0,1.7-0.3,3.3-1,4.9 c-0.7,1.5-1.5,2.8-2.7,3.9c-1.1,1.1-2.4,2-4,2.6s-3.2,1-4.9,1c-1.7,0-3.3-0.3-4.9-1s-2.8-1.5-3.9-2.6c-1.1-1.1-2-2.4-2.6-3.9 c-0.7-1.5-1-3.2-1-4.9c0-1.8,0.3-3.4,1-5c0.7-1.5,1.5-2.8,2.6-4c1.1-1.1,2.4-2,3.9-2.6C190.7,15.3,192.4,15,194.1,15z M194.1,18.4 c-1.2,0-2.4,0.2-3.5,0.7c-1.1,0.5-2,1.1-2.8,2s-1.5,1.8-2,2.8c-0.5,1.1-0.7,2.3-0.7,3.5s0.2,2.4,0.7,3.5c0.5,1.1,1.1,2,2,2.8 s1.8,1.5,2.8,2c1.1,0.5,2.3,0.7,3.5,0.7c1.2,0,2.4-0.2,3.6-0.7c1.1-0.5,2-1.1,2.8-2c0.8-0.8,1.5-1.8,2-2.8c0.5-1.1,0.7-2.3,0.7-3.5 s-0.2-2.4-0.7-3.5c-0.5-1.1-1.1-2-2-2.8c-0.8-0.8-1.8-1.5-2.8-2C196.5,18.6,195.3,18.4,194.1,18.4z"/> <path d="M216.2,18.6c1.1-2.4,3.2-3.6,6-3.6c1.9,0,3.5,0.3,4.9,1.1c1.4,0.7,2.4,1.9,3.3,3.4c0.3-0.7,0.8-1.3,1.4-1.8 c0.6-0.6,1.2-1.1,1.9-1.4c0.7-0.4,1.4-0.7,2-0.9c0.7-0.2,1.4-0.3,2-0.3c2.8,0,5.2,0.9,6.9,2.6c1.7,1.8,2.6,4.3,2.6,7.6V38 c0,1-0.6,1.5-1.8,1.5c-1.1,0-1.6-0.5-1.6-1.5V24.4c0-0.8-0.2-1.6-0.5-2.4s-0.7-1.4-1.3-2c-0.6-0.6-1.1-1-2-1.3 c-0.7-0.3-1.5-0.5-2.4-0.5s-1.5,0.2-2.3,0.5c-0.7,0.3-1.4,0.7-2,1.3c-0.6,0.6-1,1.2-1.3,2s-0.5,1.5-0.5,2.4v13.5 c0,1-0.6,1.5-1.7,1.5s-1.7-0.5-1.7-1.5V24.4c0-0.8-0.2-1.6-0.5-2.4c-0.3-0.7-0.7-1.4-1.2-2c-0.5-0.6-1.1-1-1.9-1.3 c-0.7-0.3-1.5-0.5-2.3-0.5c-0.8,0-1.6,0.2-2.4,0.5c-0.7,0.3-1.4,0.7-1.9,1.3c-0.6,0.6-1,1.1-1.3,2c-0.3,0.7-0.5,1.5-0.5,2.4v13.5 c0,1-0.6,1.5-1.7,1.5s-1.7-0.5-1.7-1.5V17.6c0-1.1,0.6-1.7,1.7-1.7s1.7,0.6,1.7,1.7L216.2,18.6L216.2,18.6z"/>
    </svg>
  )
}

export default Logo
