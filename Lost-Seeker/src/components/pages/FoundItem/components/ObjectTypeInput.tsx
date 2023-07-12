import React from "react";

export default function ObjectTypeInput({
  onChange,
  value,
}: {
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <div>
      <label
        htmlFor="found_item"
        className="block mb-2 text-base font-medium text-gray-900 "
      >
        Found item
      </label>
      <input
        type="text"
        id="found_item"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder="Enter the type of item you found"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
    </div>
  );
}
