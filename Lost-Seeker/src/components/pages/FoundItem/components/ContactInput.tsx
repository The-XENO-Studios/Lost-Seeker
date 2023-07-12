import React, { useEffect, useState } from "react";

export default function ContactInput({
  onChangeType,
  onChangeEmail,
  onChangePhone,
  valueType,
  valueEmail,
  valuePhone,
}: {
  onChangeType: (value: string) => void;
  onChangeEmail: (value: string) => void;
  onChangePhone: (value: string) => void;
  valueType: string;
  valueEmail: string;
  valuePhone: string;
}) {
  const [contactType, setContactType] = useState<"email" | "phone">("email");

  useEffect(() => {
    onChangeEmail("");
    onChangePhone("");
  }, [contactType]);

  return (
    <div>
      <label
        htmlFor="description"
        className="block mb-2 text-base font-medium text-gray-900 "
      >
        Enter a way to reach you
      </label>
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <input
            onChange={(e) => onChangeType(e.target.value as "email" | "phone")}
            id="email-radio-1"
            type="radio"
            checked={valueType === "email"}
            name="email-radio"
            value="email"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="email-radio-1"
            className="ml-2 text-base font-medium text-gray-900 dark:text-gray-300"
          >
            Email
          </label>
        </div>
        <div className="flex items-center">
          <input
            onChange={(e) => onChangeType(e.target.value as "email" | "phone")}
            id="email-radio-2"
            type="radio"
            checked={valueType === "phone"}
            name="email-radio"
            value="phone"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="email-radio-2"
            className="ml-2 text-base font-medium text-gray-900 dark:text-gray-300"
          >
            Phone
          </label>
        </div>
      </div>
      <div className="flex flex-row items-center gap-2 mt-2">
        <input
          disabled={valueType === "phone"}
          readOnly={valueType === "phone"}
          type="email"
          id="email"
          value={valueEmail}
          onChange={(e) => onChangeEmail(e.target.value)}
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
            valueType === "phone" && "cursor-not-allowed"
          }`}
          placeholder="Enter your email."
          required
        />
        <p className="text-center">or</p>
        <input
          disabled={valueType === "email"}
          readOnly={valueType === "email"}
          type="tel"
          id="phone"
          value={valuePhone}
          onChange={(e) => onChangePhone(e.target.value)}
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
            valueType === "email" && "cursor-not-allowed"
          }`}
          placeholder="Enter your phone number."
          required
        />
      </div>
    </div>
  );
}
