import PortalModalWrapper from "@components/PortalModalWrapper";
import React, { useState } from "react";
import { closeUserSetting } from "@redux/modalSlice";
import { removeOpenAiKey, setOpenAiKey } from "@redux/openAiKeySlice";
import { useDispatch, useSelector } from "react-redux";
import ModalCloseButton from "@components/ModalCloseButton";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { LANGUAGE_REFERENCE } from "@utils/config";
import AmericanFlag from "@public/assets/icons/languageIcons/AmericanFlag";

import Image from "next/image";
import OpenAiLogo from "@public/assets/icons/IconOpenAi";

export default function UserSettingModal({ hanger, user }) {
  // Global state
  const openAiKey = useSelector((state) => state.openAiKey.key);
  // Handler
  const dispatch = useDispatch();
  const handleRemoveOpenAiKey = () => {
    dispatch(removeOpenAiKey());
  };
  const handleAddOpenAiKey = (keyValue) => {
    dispatch(setOpenAiKey(keyValue));
  };
  return (
    <PortalModalWrapper mountTarget={hanger}>
      <div className="relative px-6 py-6 rounded-md bg-white space-y-4 w-min">
        <UserInfo user={user} />
        <DisplayLanguageInput />
        <LearningLanguageInput />
        <OpenAiKeyInput
          openAiKey={openAiKey}
          handleRemoveOpenAiKey={handleRemoveOpenAiKey}
          handleAddOpenAiKey={handleAddOpenAiKey}
        />
        <div className="!mt-0">
          <ModalCloseButton
            onClick={() => {
              dispatch(closeUserSetting());
            }}
          />
        </div>
      </div>
    </PortalModalWrapper>
  );
}

const UserInfo = ({ user }) => {
  return (
    <div className="flex flex-col items-center space-x-2 space-y-2">
      <div className="rounded-full overflow-hidden">
        <Image
          width={40}
          height={40}
          src={user?.imageUrl || "/assets/images/user.png"}
          alt="user-image"
        />
      </div>
      <div className="flex space-x-2">
        <div className="font-semibold">{user?.username}</div>
        <button>
          <PencilSquareIcon className="h-5 w-5 text-gray-500" />
        </button>
      </div>
    </div>
  );
};

const OpenAiKeyInput = ({
  openAiKey,
  handleRemoveOpenAiKey,
  handleAddOpenAiKey,
}) => {
  const [keyValue, setKeyValue] = useState("");
  return (
    <div className="space-y-4">
      <div className="">
        <h3 className="text-center font-semibold text-lg relative">
          Keys <span className="">🗝️</span>
        </h3>
      </div>
      <div className="space-y-3">
        <div className="">
          <label htmlFor="openAiKeyInput" className="font-semibold">
            OpenAI API
          </label>
          <span className="ml-2 text-sm text-blue-600">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://platform.openai.com/api-keys"
            >
              ( Get API key here )
            </a>
          </span>
        </div>
        <div className="flex items-center justify-between space-x-3 w-[300px] sm:w-[343px]">
          <OpenAiLogo className="w-6 h-6 shrink-0" />
          {openAiKey && (
            <>
              <input
                disabled={openAiKey}
                value={`xxxxxxxxx-${openAiKey.slice(-3)}`}
                placeholder="Enter OpenAi key"
                className="border border-gray-200 outline-none rounded h-10 px-2 flex-1"
                id="openAiKeyValue"
                type="text"
              />
              <button
                onClick={() => {
                  handleRemoveOpenAiKey();
                }}
                className="text-white px-4 h-10 rounded bg-orange-600"
              >
                <TrashIcon className="h-5 w-5 text-white" />
              </button>
            </>
          )}
          {!openAiKey && (
            <>
              <input
                onChange={(e) => {
                  setKeyValue(e.target.value);
                }}
                value={keyValue}
                placeholder="Enter OpenAi key"
                className="border border-gray-200 outline-none rounded h-10 px-2 flex-1"
                id="openAiKeyInput"
                type="text"
              />
              <button
                onClick={() => {
                  setKeyValue("");
                  handleAddOpenAiKey(keyValue);
                }}
                className="text-white px-4 h-10 rounded bg-blue-600"
              >
                <span className="hidden sm:block">Save </span>
                <span className="visible sm:hidden">
                  <CheckCircleIcon className="h-5 w-5 text-white" />
                </span>
              </button>
            </>
          )}
        </div>
      </div>
      <div className="">
        <p className="text-xs mb-2 text-gray-500 font-light">
          Your API Key is stored locally on your browser and never sent anywhere
          else.
        </p>
      </div>
    </div>
  );
};

const DisplayLanguageInput = () => {
  const [languageRef, setLanguageRef] = useState();
  return (
    <div className="">
      <label className="font-semibold">Language Reference</label>
      <select
        className="border-b-2 border-gray-300 pb-1 outline-none focus:border-blue-300"
        value={languageRef}
        onChange={(e) => {
          setLanguageRef(e.target.value);
        }}
        name=""
        id=""
      >
        <option value="">None</option>
        {LANGUAGE_REFERENCE.map((item) => {
          return (
            <option key={item.code} value={item.code}>
              {item.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

const LearningLanguageInput = () => {
  const [languageRef, setLanguageRef] = useState();
  const options = [{ label: "end", image: <AmericanFlag /> }, "jp"];
  return (
    <div className="">
      {options.map((item) => (
        <LanguageSelectButton data={item} />
      ))}
    </div>
  );
};

const LanguageSelectButton = ({ data }) => {
  return (
    <div className="">
      <input type="checkbox" id={data.label} />
      <label htmlFor={data.label}>{() => data.image}</label>
    </div>
  );
};
