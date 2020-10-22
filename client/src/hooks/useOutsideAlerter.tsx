import { useEffect } from "react";

export function useOutsideAlerter(ref: any, outsideClickCallback: any) {
  function handleClickOutside(event: any) {
    if (ref.current && !ref.current.contains(event.target)) {
      outsideClickCallback();
    }
  }

  // If iPad, use touchstart. If desktop, use mousedown
  useEffect(() => {
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
}
