import React from 'react'
import { MyProvider } from './Context'
function ProfileLayout({children}) {
  return (
    <MyProvider>
        {children}
    </MyProvider>
  )
}

export default ProfileLayout