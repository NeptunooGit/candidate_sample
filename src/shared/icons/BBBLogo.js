import React from 'react'

const BBBLogo = props => {
  const {
    className,
    desc = 'Accredited Business Logo',
    focusable = 'false',
    height = '40',
    title = 'BBB Logo',
    width = '107',
  } = props

  return (
    <svg
      className={className}
      focusable={focusable}
      height={height}
      viewBox="0, 0, 107, 40"
      width={width}>
      <title>{title}</title>
      <desc>{desc}</desc>
      <g> <polygon points="15.6,28.1 21.3,28.1 22,26 25.5,26 25,24.4 11.9,24.4 11.5,26 14.9,26 	"/> <path d="M14.7,19.9l3.1,2.3c0.2,0.1,0.3,0.3,0.3,0.5c0,0.2,0,0.4-0.1,0.6l0.5,0.3l1.7-2.3c0.4-0.5,0.6-1.2,0.6-1.8 c0-0.2,0-0.3,0-0.5c-0.1-0.8-0.6-1.5-1.2-2l-3.1-2.3c-0.2-0.1-0.3-0.3-0.3-0.5c0,0,0-0.1,0-0.1c0-0.2,0.1-0.3,0.1-0.5l-0.5-0.3 l-1.7,2.3c-0.5,0.7-0.7,1.5-0.6,2.3C13.6,18.7,14.1,19.5,14.7,19.9z"/> <path d="M16.9,12.7l3.9,2.8c0.5,0.4,0.9,0.9,1,1.6c0,0.1,0,0.3,0,0.4c0,0.5-0.2,1-0.5,1.4l0.4,0.3l3.1-4.3 c0.7-1,1-2.2,0.8-3.3c-0.2-1.2-0.8-2.2-1.8-2.9l-4.7-3.4c-0.3-0.2-0.5-0.5-0.6-0.9c-0.1-0.4,0-0.7,0.2-1L18.5,3l-2.5,3.5 c-0.6,0.8-0.9,1.7-0.9,2.6c0,0.2,0,0.5,0.1,0.7C15.3,11,16,12,16.9,12.7z"/> <path d="M14.5,35L14.5,35c0-1.1-0.6-1.6-1.4-1.9c0.6-0.3,1-0.8,1-1.7v0c0-0.5-0.2-1-0.5-1.3c-0.4-0.4-1.1-0.7-2-0.7 H7.9v7.7h3.7C13.3,37.1,14.5,36.4,14.5,35z M9.6,30.9h1.7c0.7,0,1.1,0.3,1.1,0.8v0c0,0.6-0.5,0.8-1.2,0.8H9.6V30.9z M9.6,33.9h2 c0.9,0,1.3,0.3,1.3,0.8v0c0,0.6-0.5,0.8-1.2,0.8h-2V33.9z"/> <path d="M20.3,33.1c0.6-0.3,1-0.8,1-1.7v0c0-0.5-0.2-1-0.5-1.3c-0.4-0.4-1.1-0.7-2-0.7h-3.6v7.7h3.7 c1.7,0,2.9-0.7,2.9-2.1v0C21.8,34,21.2,33.4,20.3,33.1z M16.9,30.9h1.7c0.7,0,1.1,0.3,1.1,0.8v0c0,0.6-0.5,0.8-1.2,0.8h-1.6V30.9z M20.1,34.8c0,0.6-0.5,0.8-1.2,0.8h-2v-1.7h2C19.7,33.9,20.1,34.3,20.1,34.8L20.1,34.8z"/> <path d="M22.5,37.1h3.7c1.7,0,2.9-0.7,2.9-2.1v0c0-1-0.5-1.6-1.4-1.9c0.5-0.3,1-0.8,1-1.7v0c0-0.5-0.2-1-0.5-1.3 c-0.4-0.4-1.1-0.7-2-0.7h-3.6V37.1z M24.1,30.9h1.7c0.7,0,1.1,0.3,1.1,0.8v0c0,0.6-0.5,0.8-1.2,0.8h-1.6V30.9z M24.1,33.9h2 c0.9,0,1.3,0.3,1.3,0.8v0c0,0.6-0.5,0.8-1.2,0.8h-2V33.9z"/> <path d="M30,36.4h0.2l0.2,0.4h0.2l-0.3-0.4c0.1,0,0.2-0.1,0.2-0.3v0c0-0.1,0-0.2-0.1-0.2c-0.1-0.1-0.2-0.1-0.3-0.1 h-0.5v1H30V36.4z M30,35.9h0.3c0.1,0,0.2,0.1,0.2,0.2v0c0,0.1-0.1,0.2-0.2,0.2H30V35.9z"/> <path d="M30.2,37.2c0.5,0,1-0.4,1-1v0c0-0.5-0.4-1-1-1c-0.5,0-1,0.4-1,1v0C29.3,36.8,29.7,37.2,30.2,37.2z M29.4,36.2 c0-0.5,0.4-0.9,0.9-0.9c0.5,0,0.9,0.4,0.9,0.9v0c0,0.5-0.4,0.9-0.9,0.9C29.7,37.1,29.4,36.7,29.4,36.2L29.4,36.2z"/> <polygon points="45.8,14 45,16.2 46.7,16.2 	"/> <path d="M46.7,25.3L46.7,25.3c0-0.5-0.3-0.7-1-0.7h-1.4V26h1.3C46.3,26,46.7,25.8,46.7,25.3z"/> <path d="M46,27.2h-1.7v1.5h1.7c0.6,0,1-0.2,1-0.7v0C47.1,27.5,46.8,27.2,46,27.2z"/> <path d="M98.8,13.6h-1.1v4h1.1c1.2,0,2-0.8,2-2v0C100.8,14.4,100,13.6,98.8,13.6z"/> <path d="M79.4,15.6L79.4,15.6c0-1.2-0.8-2-2-2h-1.1v4h1.1C78.6,17.6,79.4,16.8,79.4,15.6z"/> <path d="M66.5,14.6L66.5,14.6c0-0.6-0.4-1-1.1-1h-1.5v1.9h1.5C66.1,15.5,66.5,15.1,66.5,14.6z"/> <path d="M101.1,0H5.9C2.6,0,0,2.6,0,5.9v28.5c0,3.2,2.6,5.9,5.9,5.9h95.2c3.2,0,5.9-2.6,5.9-5.9V5.9 C106.9,2.6,104.3,0,101.1,0z M81.9,12.3h1.5v6.6h-1.5V12.3z M74.8,12.3h2.6c2.1,0,3.5,1.4,3.5,3.3v0c0,1.9-1.4,3.3-3.5,3.3h-2.6 V12.3z M68.9,12.3h5v1.3h-3.6v1.3h3.1v1.3h-3.1v1.4H74v1.3h-5.1V12.3z M36.4,39.8H5.9c-3,0-5.4-2.4-5.4-5.4V5.9 c0-3,2.4-5.4,5.4-5.4h30.5L36.4,39.8z M45.2,12.2h1.3l2.8,6.7h-1.5l-0.6-1.5h-2.8l-0.6,1.5h-1.5L45.2,12.2z M48.6,28.1 c0,1.2-1,1.8-2.5,1.8h-3.2v-6.6H46c0.8,0,1.4,0.2,1.7,0.6c0.3,0.3,0.5,0.7,0.5,1.1v0c0,0.7-0.4,1.2-0.9,1.4 C48.1,26.8,48.6,27.2,48.6,28.1L48.6,28.1z M55,27c0,2-1.1,3-2.9,3c-1.8,0-2.9-1-2.9-3v-3.8h1.5v3.8c0,1.1,0.5,1.6,1.4,1.6 c0.9,0,1.4-0.5,1.4-1.6v-3.8H55V27z M52.7,19c-2,0-3.4-1.5-3.4-3.4v0c0-1.9,1.4-3.4,3.5-3.4c1.3,0,2,0.4,2.6,1l-0.9,1.1 c-0.5-0.5-1-0.7-1.7-0.7c-1.1,0-1.9,0.9-1.9,2.1v0c0,1.1,0.8,2.1,1.9,2.1c0.8,0,1.2-0.3,1.7-0.8l0.9,0.9C54.7,18.6,53.9,19,52.7,19 z M60.9,28c0,1.3-1,2.1-2.4,2.1c-1,0-2-0.4-2.8-1.1l0.9-1c0.6,0.5,1.2,0.8,2,0.8c0.6,0,1-0.2,1-0.6v0c0-0.4-0.2-0.6-1.3-0.8 c-1.3-0.3-2.2-0.7-2.2-2v0c0-1.2,1-2,2.3-2c1,0,1.8,0.3,2.5,0.8l-0.8,1.1c-0.6-0.4-1.2-0.7-1.7-0.7c-0.6,0-0.9,0.3-0.9,0.6v0 c0,0.4,0.3,0.6,1.4,0.9C60.1,26.3,60.9,26.8,60.9,28L60.9,28z M59,19c-2,0-3.4-1.5-3.4-3.4v0c0-1.9,1.4-3.4,3.5-3.4 c1.3,0,2,0.4,2.6,1l-0.9,1.1c-0.5-0.5-1-0.7-1.7-0.7c-1.1,0-1.9,0.9-1.9,2.1v0c0,1.1,0.8,2.1,1.9,2.1c0.8,0,1.2-0.3,1.7-0.8 l0.9,0.9C61.1,18.6,60.3,19,59,19z M63.2,29.9h-1.5v-6.6h1.5V29.9z M63.9,18.9h-1.5v-6.6h3c0.8,0,1.5,0.2,1.9,0.7 c0.4,0.4,0.6,0.9,0.6,1.5v0c0,1.1-0.6,1.7-1.4,2.1l1.6,2.4h-1.7l-1.4-2.1h0h-1.1V18.9z M70.3,29.9h-1.2l-3.2-4.2v4.2h-1.4v-6.6h1.3 l3.1,4.1v-4.1h1.4V29.9z M76.6,29.9h-5.1v-6.6h5v1.3h-3.6v1.3h3.1v1.3h-3.1v1.4h3.6V29.9z M82.2,28c0,1.3-1,2.1-2.4,2.1 c-1,0-2-0.4-2.8-1.1l0.9-1c0.6,0.5,1.2,0.8,2,0.8c0.6,0,1-0.2,1-0.6v0c0-0.4-0.2-0.6-1.3-0.8c-1.3-0.3-2.2-0.7-2.2-2v0 c0-1.2,1-2,2.3-2c1,0,1.8,0.3,2.5,0.8l-0.8,1.1c-0.6-0.4-1.2-0.7-1.7-0.7c-0.6,0-0.9,0.3-0.9,0.6v0c0,0.4,0.3,0.6,1.4,0.9 C81.5,26.3,82.2,26.8,82.2,28L82.2,28z M87.8,28c0,1.3-1,2.1-2.4,2.1c-1,0-2-0.4-2.8-1.1l0.9-1c0.6,0.5,1.2,0.8,2,0.8 c0.6,0,1-0.2,1-0.6v0c0-0.4-0.2-0.6-1.3-0.8c-1.3-0.3-2.2-0.7-2.2-2v0c0-1.2,1-2,2.3-2c1,0,1.8,0.3,2.5,0.8l-0.8,1.1 c-0.6-0.4-1.2-0.7-1.7-0.7c-0.6,0-0.9,0.3-0.9,0.6v0c0,0.4,0.3,0.6,1.4,0.9C87,26.3,87.8,26.8,87.8,28L87.8,28z M89.6,13.6h-2v5.3 h-1.5v-5.3h-2v-1.3h5.5V13.6z M95.3,18.9h-5.1v-6.6h5v1.3h-3.6v1.3h3.1v1.3h-3.1v1.4h3.6V18.9z M102.3,15.6c0,1.9-1.4,3.3-3.5,3.3 h-2.6v-6.6h2.6C100.9,12.3,102.3,13.7,102.3,15.6L102.3,15.6z"/> </g>
    </svg>
  )
}

export default BBBLogo
