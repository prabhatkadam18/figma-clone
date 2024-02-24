import { fabric } from "fabric";
import { v4 as uuidv4 } from "uuid";
import { createCircle, createRectangle, createSelectedShape } from "./shapes";

// min height or width for any shape drawn
// to ignore minimal mouse movements while clicking
const MIN_HEIGHT_AND_WIDTH = 2;

export const initializeFabric = ({ canvasRef }: { canvasRef: React.MutableRefObject<HTMLCanvasElement | null> }) => {
	const canvas = new fabric.Canvas(canvasRef.current);
	canvas.width = canvasRef.current?.clientWidth;
	canvas.height = canvasRef.current?.clientHeight;
	return canvas as fabric.Canvas;
}


export const handleCanvasMouseDown = ({ options, shapeRef, canvas, isDrawing, selectedShapeRef }: {
	options: fabric.IEvent;
	shapeRef: React.MutableRefObject<fabric.Object | null>;
	canvas: fabric.Canvas,
	isDrawing: React.MutableRefObject<boolean>,
	selectedShapeRef: any,
}) => {

	const { pointer } = options;

	const target = canvas.findTarget(options.e, false);

	isDrawing.current = false;

	if (target?.type === selectedShapeRef.current || 
		target?.type === "activeSelection") {
		isDrawing.current = false;

		canvas.setActiveObject(target as fabric.Object);
	} else {
		isDrawing.current = true;
	
		shapeRef.current = createSelectedShape({ selectedShape: selectedShapeRef?.current, pointer});
		
		if (shapeRef.current) {
			canvas.add(shapeRef.current);
		}
	}
}


export const handleCanvasMouseMove = ({ shapeRef, canvas, options, selectedShapeRef } : any) => {
	const { x, y } = options.pointer;
	const { shiftKey } = options.e;

	if (shapeRef.current) {
		switch(selectedShapeRef?.current) {
			case 'rect': {
				shapeRef.current.set({
					width: x - (shapeRef.current?.left || 0),
					height: y - (shapeRef.current?.top || 0),
				});
				break;
			}
			// case 'circle': {
			// 	shapeRef.current.set({
			// 		radius: Math.abs(x - (shapeRef.current?.left || 0)) / 2,
			// 		// height: Math.abs(y - (shapeRef.current?.top || 0)),
			// 		// width: Math.abs(x - (shapeRef.current?.left || 0))
			// 	});
			// 	break;
			// }
			case 'ellipse': {
				if (shiftKey) {
					const xDisplacement = x - (shapeRef.current?.left || 0);
					const yDisplacement = y - (shapeRef.current?.top || 0);
					const radius = Math.max(xDisplacement, yDisplacement) / 2;
					shapeRef.current.set({
						rx: radius,
						ry: radius
					});
				} else {
					shapeRef.current.set({
						rx: Math.abs(x - (shapeRef.current?.left || 0)) / 2,
						ry: Math.abs(y - (shapeRef.current?.top || 0)) / 2,
					});
				}
				break;
			}
			default: break
		}
		
		canvas.requestRenderAll();
	
	}
}

export const handleCanvasMouseUp = ({ options, canvas, shapeRef, selectedShapeRef } : any) => {
	// circle height/width is 2*r
	
	if (shapeRef.current?.width < MIN_HEIGHT_AND_WIDTH && shapeRef.current?.height < MIN_HEIGHT_AND_WIDTH) {
		canvas.remove(shapeRef.current);
	}
	shapeRef.current = null;

	// selectedShapeRef.current = null;
}