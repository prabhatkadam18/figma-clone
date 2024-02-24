import CursorSVG from '@/public/assets/CursorSVG'
import React, { useEffect } from 'react'

type Props = {
	color: string
	x: number
	y: number
	message: string
}

const Cursor = ({ color, x, y, message }: Props) => {

  return (
	<div className='pointer-events-none absolute top-0 left-0' 
		style={{ transform: `translate(${x}px, ${y}px)` }}
	>
		<CursorSVG color={color} />

		{message && <div className="top-2 left-4 absolute px-4 py-2  bg-blue-500 
			min-w-[200px]: max-w-[200px] rounded-md whitespace-normal "
		>
			<p className="w-40 z-10 text-sm text-white placeholder-blue-300 whitespace-normal bg-transparent border-none outline-none">
				{message}
			</p>
		</div>}
	</div>
  )
}

export default Cursor