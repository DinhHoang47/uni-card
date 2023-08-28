"use client";
import { Children, forwardRef, useRef } from "react";
import { createPortal } from "react-dom";

// export default function PortalModalWrapper({
//   children,
//   childrenHeight,
//   childrenWidth,
// }) {
//   return (
//     <>
//       {createPortal(
//         <div className="modalInstance">
//           {/* Background */}
//           <div className="absolute top-0 left-0 w-screen h-screen bg-gray-400 opacity-50 modalBackground"></div>
//           {/* Main Container */}
//           <div
//             style={{
//               width: childrenWidth,
//               height: childrenHeight,
//               top: `calc(50% - ${childrenHeight / 2}px)`,
//               left: `calc(50% - ${childrenWidth / 2}px)`,
//             }}
//             className={` modalContent`}
//           >
//             {children}
//           </div>
//         </div>,
//         document.getElementById("primary-nav")
//       )}
//     </>
//   );
// }

const PortalModalWrapper = forwardRef(function PortalModalWrapper(
  { children, childrenHeight, childrenWidth },
  ref
) {
  return (
    <>
      {createPortal(
        <div className="modalBackground bg-transparent-04 fixed top-0 left-0 right-0 bottom-0 py-16 overflow-y-auto flex justify-center">
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
        document.getElementById("primary-nav")
      )}
    </>
  );
});

export default PortalModalWrapper;
