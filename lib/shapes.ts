import { CustomFabricObject } from "@/types/type";
import { fabric } from "fabric";
import { v4 as uuidv4 } from 'uuid'

export const createRectangle = (pointer: PointerEvent) => {
	return new fabric.Rect({
		left: pointer?.x || 0,
		top: pointer?.y || 0,
		fill: "#aabbcc",
		objectId: uuidv4(),
	} as CustomFabricObject<fabric.Rect>);
}

export const createCircle = (pointer: PointerEvent) => {
	return new fabric.Ellipse({
		left: pointer?.x || 0,
		top: pointer?.y || 0,
		rx: 0,
		ry: 0,
		fill: "#aabbcc",
		objectId: uuidv4(),
	} as any);
}

export const createSelectedShape = ({ selectedShape, pointer }: {
	selectedShape: string | null,
	pointer: any
}) => {

	switch(selectedShape) {
		case 'rect': {
			return createRectangle(pointer);
		}
		// case 'circle': {
		// 	return createCircle(pointer);
		// }
		case 'ellipse': {
			return createCircle(pointer);
		}
		default: return null;
	}
}