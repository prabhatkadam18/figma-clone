"use client";

import Live from "@/components/Live";
import { Room } from "./Room";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import Navbar from "@/components/Navbar";
import { useEffect, useRef } from "react";
import { fabric } from "fabric";
import { handleCanvasMouseDown, handleCanvasMouseMove, handleCanvasMouseUp, initializeFabric } from "@/lib/canvas";
import { _handleCanvasMouseDown, _handleCanvasMouseUp, _handleCanvaseMouseMove } from "@/lib/_canvas";


export default function Page() {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const isDrawing = useRef(false);
  const shapeRef = useRef<fabric.Object | null>(null);
  const selectedShapeRef = useRef<string | null>('select');

  useEffect(() => {
    const canvas = initializeFabric({ 
      canvasRef
    });

    canvas.on("mouse:down", (options: fabric.IEvent) => {
      handleCanvasMouseDown({
        isDrawing,
        options,
        canvas,
        shapeRef,
        selectedShapeRef
      });
      
    })

    canvas.on("mouse:move", (options) => {
      handleCanvasMouseMove({
        options,
        canvas,
        shapeRef,
        selectedShapeRef
      })

    })

    canvas.on("mouse:up", (options) => {
      handleCanvasMouseUp({
        options,
        canvas,
        shapeRef,
        selectedShapeRef
      })
      
    })

    canvas.on('selection:created', (options) => {
	    const target = canvas.findTarget(options.e, false);
      if (target?.type === "activeSelection") {
        canvas.discardActiveObject();
      }
    })

    window.addEventListener("resize", () => {
      // TODO: resize canvas
    })
  }, [selectedShapeRef, isDrawing])

  return (
    <main 
      className="h-screen overflow-hidden"
    >
      <Navbar selectedShapeRef={selectedShapeRef} />
      <section
        className="flex h-full flex-row"
      >
        <LeftSidebar />
        <Live canvasRef={canvasRef} />
        <RightSidebar />
      </section>
    </main>
  );
}