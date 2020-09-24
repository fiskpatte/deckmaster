import * as React from 'react';
export const useIsMounted = () => {
  const isMountedRef = React.useRef<boolean>(true);
  React.useEffect(() => {
    isMountedRef.current = true;
    return () => { isMountedRef.current = false; }
  });
  return isMountedRef && isMountedRef.current;
}