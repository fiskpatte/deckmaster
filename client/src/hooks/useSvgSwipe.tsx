import React, { useEffect, useState, useRef } from 'react';
import { Coords, coordsFactory } from '../types/util';
import { SwipeDirection } from '../constants';

const options = { "passive": true } as AddEventListenerOptions;
const thresholdDistance = 150; //Distance in pixels to consider a swipe 
const restraintDistance = 100; //Distance in pixels allowed at the same time in perpendicular direction
const allowedTime = 500; //Max allowed time since the first touch to consider a swipe

const getCoordinates = (event: React.MouseEvent | React.TouchEvent): Coords | undefined => {
  let x = 0;
  let y = 0;
  if (window.TouchEvent && event instanceof TouchEvent) {
    if (event.touches.length === 1) {
      let touch = event.touches[0];
      x = touch.clientX;
      y = touch.clientY;
    } else {
      return undefined;
    }
  }
  if (event instanceof MouseEvent) {
    x = event.clientX;
    y = event.clientY;
  }
  return { x, y } as Coords;
};

const isHorizontalMovement = (distance: Coords) => {
  return Math.abs(distance.x) >= thresholdDistance && Math.abs(distance.y) <= restraintDistance;
}

const isVerticalMovement = (distance: Coords) => {
  return Math.abs(distance.y) >= thresholdDistance && Math.abs(distance.x) <= restraintDistance;
}

export const useSVGSwipe = (reference: React.RefObject<any>) => {
  const [swipeDirection, setSwipeDirection] = useState<SwipeDirection>(SwipeDirection.Undefined);
  const refDragging = useRef<boolean>(false);
  const refInitialCoords = useRef<Coords | undefined>(undefined);
  const refInitialTime = useRef<number | undefined>(undefined);
  const refDistance = useRef<Coords>(coordsFactory());
  const refSwipeDirection = useRef<SwipeDirection>(SwipeDirection.Undefined);

  useEffect(() => {
    const startDrag = (event: React.MouseEvent | React.TouchEvent) => {
      if ((window.TouchEvent && event instanceof TouchEvent && event.touches.length === 1) || event instanceof MouseEvent) {
        let coords = getCoordinates(event);
        if (coords) {
          refDragging.current = true;
          refInitialCoords.current = coords;
          refInitialTime.current = new Date().getTime();
        }
      }
      return;
    }

    const drag = (event: any) => {
      if (refDragging.current && refInitialCoords.current) {
        let coords = getCoordinates(event);
        if (coords) {
          refDistance.current = { x: coords.x - refInitialCoords.current.x, y: coords.y - refInitialCoords.current.y } as Coords;
        } else {
          stopDrag();
        }
      } else {
        stopDrag();
      }
      return;
    }

    const stopDrag = () => {
      if (refDragging.current) {
        let elapsedTime = new Date().getTime() - (refInitialTime.current ?? 0);
        if (elapsedTime <= allowedTime) {
          refSwipeDirection.current = SwipeDirection.Undefined;
          if (isHorizontalMovement(refDistance.current)) {
            refSwipeDirection.current = refDistance.current.x < 0 ? SwipeDirection.Left : SwipeDirection.Right;
          } else if (isVerticalMovement(refDistance.current)) {
            refSwipeDirection.current = refDistance.current.y < 0 ? SwipeDirection.Up : SwipeDirection.Down;
          }
        }
        setSwipeDirection(refSwipeDirection.current);
        refDragging.current = false;
      }
      return;
    }

    let ref = reference?.current;
    if (ref) {
      ref.addEventListener('touchstart', startDrag, options);
      ref.addEventListener('touchmove', drag, options);
      ref.addEventListener('touchend', stopDrag, options);
      ref.addEventListener('touchcancel', stopDrag, options);
      ref.addEventListener('mousedown', startDrag, options);
      window.document.body.addEventListener('mousemove', drag, options);
      window.document.body.addEventListener('mouseup', stopDrag, options);
      return () => {
        ref.removeEventListener('touchstart', startDrag, options)
        ref.removeEventListener('touchmove', drag, options);
        ref.removeEventListener('touchend', stopDrag, options);
        window.document.body.removeEventListener('mousemove', drag, options);
        window.document.body.removeEventListener('mouseup', stopDrag, options);
      }
    }
  }, [reference]);

  const updateSwipeDirection = (newSwipeDirection: SwipeDirection): void => {
    setSwipeDirection(newSwipeDirection);
  }
  return { swipeDirection, updateSwipeDirection };
}

export default useSVGSwipe;