import React from 'react'
import { ClipLoader } from 'react-spinners'

const LoadingPage = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-black w-full overflow-clip z-[9999999999]">
        <ClipLoader color="lightgreen" size={80} />
  </div>
  )
}

export default LoadingPage