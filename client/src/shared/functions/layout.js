export const toggleFullScreen = () => {
    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
    }
    else {
        cancelFullScreen.call(doc);
    }
}

// translate page coordinate to SVG coordinate
export const svgPoint = (svgElement, fromElement, x, y) => {
    var pt = svgElement.createSVGPoint();
    pt.x = x;
    pt.y = y;
    return pt.matrixTransform(fromElement.getScreenCTM().inverse());
}