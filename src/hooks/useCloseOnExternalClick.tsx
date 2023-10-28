import { Dispatch, RefObject, SetStateAction, useEffect, useState } from "react";

const useCloseOnExternalClick = (ref:RefObject<HTMLDivElement>):[boolean, Dispatch<SetStateAction<boolean>>] => {
  const [ isActive, setIsActive ] = useState<boolean>(false);

  useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setIsActive(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };

  }, [ref]);
  return [ isActive as boolean, setIsActive as Dispatch<SetStateAction<boolean>> ];
}

export default useCloseOnExternalClick;