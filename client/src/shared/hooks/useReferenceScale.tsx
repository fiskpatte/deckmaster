import { useLayoutEffect, useState } from 'react';
import { Size } from './../../types';

//Adapts the size of an object based on a reference object.
const useReferenceScale = (reference: React.RefObject<any>, size: Size) => {
    const [scale, setScale] = useState({ width: 1, height: 1 });
    useLayoutEffect(() => {
        if (reference.current) {
            let refBBox = reference.current.getBBox();
            let widthScale = size.width / refBBox.width;
            let heightScale = size.height / refBBox.height;
            setScale({ width: widthScale, height: heightScale })
        }
    }, [reference, size.width, size.height]);
    return scale;
}

export default useReferenceScale;