import React, { useCallback, useEffect, useState } from 'react'
import LiveCursors from './cursor/LiveCursors'
// import { useMyPresence, useOthers } from '@/liveblocks.config'
import { COLORS } from '@/constants'
import { CursorMode, CursorState } from '@/types/type'
import CursorChat from './cursor/CursorChat'

type PresenceType = {
	cursor: {
		x: number
		y: number
	} | null,
	message: string | null,
	previousMessage: string | null,
}

type Props = {
	canvasRef: React.MutableRefObject<HTMLCanvasElement | null> 
}

const Live = ({ canvasRef }: Props) => {

	// const others = useOthers();
	// const [myPresence, updateMyPresence] = useMyPresence() as [PresenceType, (presence: Partial<PresenceType>) => void];
	const [cursorState, setCursorState] = useState<CursorState>({
		mode: CursorMode.Hidden
	});

	// const { cursor } = myPresence as PresenceType;



	const handlePointerMove = useCallback((event: React.PointerEvent) => {
		event.preventDefault();
		const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
		const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

		// updateMyPresence({ cursor: { x, y } });

	}, []);

	// const handlePointerLeave = useCallback(() => {
	// 	updateMyPresence({ cursor: null, message: null });
	// }, [])

	const handlePointerDown = useCallback((event: React.PointerEvent) => {
		const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
		const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

		// updateMyPresence({ cursor: { x, y } });

	}, []);

	useEffect(() => {

		const handleKeyUp = (event: KeyboardEvent) => {
			if (event.key === '/') {
				event.preventDefault();
				setCursorState({
					mode: CursorMode.Chat,
					message: '',
					previousMessage: null
				});
				// updateMyPresence({ message: '' });  // this only updates the given properties
			} else if (event.key === 'Escape') {
				event.preventDefault();
				setCursorState({ mode: CursorMode.Hidden });
				// updateMyPresence({ previousMessage: myPresence?.message, message: null });
			}
	
		}

		document.addEventListener('keyup', handleKeyUp);

		return () => {
			document.removeEventListener('keyup', handleKeyUp);
		}
	}, []);

  return (
	<div
		id="canvas"
		onPointerMove={handlePointerMove}
		// onPointerLeave={handlePointerLeave}
		// onPointerDown={handlePointerDown}
		className='h-[100vh] flex justify-center items-center border-2 border-green-500'
	>
      <canvas ref={canvasRef} width={window.innerWidth - 227 - 227} height={window.innerHeight}/>

		{/* <LiveCursors others={others} />
		{cursor && cursorState.mode === CursorMode.Chat && <CursorChat cursor={cursor} cursorState={cursorState} setCursorState={setCursorState} updateMyPresence={updateMyPresence} />} */}
	</div>
  )
}

export default Live