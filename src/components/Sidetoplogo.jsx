import React from 'react'

const Sidetoplogo = () => {
  return (
    <div  className=' border-b-[2px] h-full border-gray-400/20 flex justify-center items-center'>
     <div className="flex items-center gap-2">
  {/* Circle with BF */}
  <div className="w-8 h-8 rounded-full bg-[#5A67BA] flex items-center justify-center text-white font-bold text-sm">
    BF
  </div>

  {/* Text next to it */}
  <div className="text-sm text-[#5A67BA] font-semibold">
    Bluestock <span className="text-sm text-[#5A67BA] font-semibold">Fintech</span>
  </div>
</div>
    </div>
  )
}

export default Sidetoplogo
