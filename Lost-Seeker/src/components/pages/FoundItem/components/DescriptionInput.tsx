import React from "react";

export default function DescriptionInput({
  onChange,
  value,
}: {
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <div>
      <label
        htmlFor="description"
        className="block mb-2 text-base font-medium text-gray-900 "
      >
        Short description
      </label>
      <textarea
        id="description"
        rows={4}
        className="block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none"
        placeholder="Enter a short description about where and what you found"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      ></textarea>
    </div>
  );
}
