"use client";
import { createPortal } from "react-dom";

const PortalModalWrapper = ({ children, mountTarget }) => {
  return (
    <>
      {createPortal(
        <div className=" bg-transparent-04 fixed top-0 left-0 right-0 bottom-0 py-16 overflow-y-auto flex justify-center z-20 no-scrollbar">
          <div className={`modalContent`}>{children}</div>
        </div>,
        document.getElementById(mountTarget || "primary-nav")
      )}
    </>
  );
};

export default PortalModalWrapper;
