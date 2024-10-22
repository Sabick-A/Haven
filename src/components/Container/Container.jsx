import React from 'react'

function Container({children}) {
  return <div className='w-full h-screen flex flex-col min-h-screen'>{children}</div>;
}

export default Container