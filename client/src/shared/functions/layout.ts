// translate page coordinate to SVG coordinate
export const svgPoint = (svgElement: SVGSVGElement, fromElement: SVGGraphicsElement, x: number, y: number) => {
    const pt = svgElement.createSVGPoint();
    pt.x = x;
    pt.y = y;
    return pt.matrixTransform(fromElement.getScreenCTM()?.inverse());
}