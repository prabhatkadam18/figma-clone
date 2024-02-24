import { tools } from '@/lib/utils'
import Image from 'next/image'
import React, { useState } from 'react'

const Navbar = ({ selectedShapeRef }: {
  selectedShapeRef: any
}) => {

  const [selectedTool, setSelectedTool] = useState(selectedShapeRef?.current || "select");

  const handleToolSelect = (tool: string) => {
    return () => {
      setSelectedTool(tool);
      selectedShapeRef.current = tool;
    }
  }

  return (
    <div className="h-[60px] bg-primary-black flex flex-row">
      <img src='./assets/logo.svg' alt='logo' className="h-full px-4 py-4 object-cover" />
      <div className='flex flex-row ml-4'>
        {tools.map((tool) => (
          tool.value && <button
            key={tool.value}
            className={`px-4 py-2 ${tool.value === selectedTool ? 'bg-[#232c27]' : 'hover:bg-[#1a2824]'}`}
            onClick={handleToolSelect(tool.value)}
          >
            <Image src={tool.icon} alt={tool.name} width={24} height={24} />
          </button>
        ))}
      </div>
    </div>
  )
}

export default Navbar