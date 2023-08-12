import React from "react";

export default function PinAddressButton({
  onClick,
}: {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
  return (
    <div>
      <label
        htmlFor="pin_address"
        className="block mb-2 text-base font-medium text-gray-900 "
      >
        Pin found items address on map
      </label>
      <button
        onClick={onClick}
        className="bg-white text-text_primary border-2 border-text_primary rounded-lg w-32 flex items-center justify-center py-2 text-base font-bold transition-transform hover:scale-95"
      >
        Open Map
      </button>
    </div>
  );
}
