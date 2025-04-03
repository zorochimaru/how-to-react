import { ReactElement, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export const HowToButton = ({ children }: { children: ReactElement }) => {
  const [showModal, setShowModal] = useState(false);
  const togglerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={togglerRef} className="relative">
      <button
        type="button"
        className={`p-2 cursor-pointer text-lg rounded w-10 h-10 flex items-center justify-center ${
          showModal
            ? 'bg-gray-400 dark:bg-gray-200 text-white dark:text-black'
            : 'bg-gray-200 dark:bg-gray-800 text-black dark:text-white'
        }`}
        onClick={() => setShowModal((prev) => !prev)}
      >
        ?
      </button>
      {showModal &&
        togglerRef.current &&
        createPortal(
          <div className="absolute bottom-12 -left-2 w-104 dark:bg-gray-900 border-1 rounded-2xl overflow-clip">
            <div
              onClick={() => setShowModal(false)}
              className="absolute top-0 right-0 p-4 cursor-pointer text-lg rounded bg-gray-200 dark:bg-gray-800 text-black dark:text-white w-10 h-10 flex items-center justify-center"
            >
              X
            </div>
            <div className="p-4">{children}</div>
          </div>,
          togglerRef.current,
        )}
    </div>
  );
};
