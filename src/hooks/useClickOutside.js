import { useEffect, useRef } from "react";
export function useClickOutside(handler) {
  let domNode = useRef();
  useEffect(
    function () {
      function maybeHandler(event) {
        if (domNode.current && !domNode.current.contains(event.target))
          handler();
      }
      document.addEventListener("mousedown", maybeHandler);
      return function () {
        document.removeEventListener("mousedown", maybeHandler);
      };
    },
    [handler]
  );
  return domNode;
}

// Hook that closes the modal or menu when clicked outside of their reference.
