"use client";
import { forwardRef } from "react";
import { createPortal } from "react-dom";

const PortalModalWrapper = forwardRef(function PortalModalWrapper(
  { children, childrenHeight, childrenWidth, mountTarget },
  ref
) {
  return (
    <>
      {createPortal(
        <div className="modalBackground bg-transparent-04 fixed top-0 left-0 right-0 bottom-0 py-16 overflow-y-auto flex justify-center z-20">
          {/* Background */}
          {/* <div className="fixed top-0 left-0 h-screen w-screen bg-gray-400 opacity-50 modalBackground"></div> */}
          {/* Main Container */}
          <div
            style={{
              width: childrenWidth,
              height: childrenHeight,
              top: `calc(50% - ${childrenHeight / 2}px)`,
              left: `calc(50% - ${childrenWidth / 2}px)`,
            }}
            className={` modalContent `}
          >
            {children}
          </div>
        </div>,
        document.getElementById(mountTarget || "primary-nav")
      )}
    </>
  );
});

export default PortalModalWrapper;
