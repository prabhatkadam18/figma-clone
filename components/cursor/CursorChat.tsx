import { CursorChatProps, CursorMode } from '@/types/type'
import React, { useEffect, useRef, useState } from 'react'



const CursorChat = ({ cursor, cursorState, setCursorState, updateMyPresence }: CursorChatProps) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCursorState({ 
      mode: CursorMode.Chat,
      previousMessage: event.target?.value || '',
      message: event.target?.value || ''
    })
    updateMyPresence({ message: event.target.value });
  }

  return (
	  <div 
      className="top-2 left-4 absolute px-4 py-2  bg-blue-500 
        min-w-[200px]: max-w-[200px] rounded-md whitespace-normal "
      style={{ transform: `translate(${cursor?.x}px, ${cursor?.y}px)` }}
    >
      <input
        autoFocus
        onChange={handleChange}
        placeholder={(cursorState.mode === CursorMode.Chat && cursorState.previousMessage) ? cursorState.previousMessage : 'Type a message...'}
        className="w-40 z-10 text-sm text-white placeholder-blue-300 whitespace-normal bg-transparent border-none outline-none"
        type="text" />
    </div>
  )
}

export default CursorChat