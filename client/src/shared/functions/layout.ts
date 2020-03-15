// export const toggleFullScreen = () => {
//     const doc = window.document;
//     const docEl = doc.documentElement;

//     const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
//     const cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

//     if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
//         requestFullScreen.call(docEl);
//     }
//     else {
//         cancelFullScreen.call(doc);
//     }
// }

// translate page coordinate to SVG coordinate
export const svgPoint = (svgElement: SVGSVGElement, fromElement: SVGGraphicsElement, x: number, y: number) => {
    const pt = svgElement.createSVGPoint();
    pt.x = x;
    pt.y = y;
    return pt.matrixTransform(fromElement.getScreenCTM()?.inverse());
}