import Image from "next/image";
import { useEffect, useState } from "react";

import styles from "./styles.module.css";
import { PencilIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { CloudArrowUpIcon } from "@heroicons/react/20/solid";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { FolderPlusIcon } from "@heroicons/react/24/solid";
import { SpeakerWaveIcon } from "@heroicons/react/24/outline";

import { TextareaAutosize } from "@mui/base";
import { handleSelectedImage } from "@lib/handleSelectedImage";
import Spinner from "@public/assets/icons/MySpinner";
import MagicWand from "@public/assets/icons/MagicWand";
import NoImageAi from "@public/assets/images/no-image-ai.png";
import { useDispatch, useSelector } from "react-redux";
import { openAPIKeyInput } from "@redux/modalSlice";
import { GetImageFromAi } from "@services/OpenAIService";
import useUser from "@lib/useUser";
import {
  getFlaticonToken,
  searchFlaticonImage,
} from "@services/FlaticonService";
import TextToSpeech from "@components/TextToSpeech/TextToSpeech";

export default function DesktopRow({
  cardData,
  displayImg,
  displayDef2,
  displayExample,
  onDeleteRow,
  onUpdateRow,
  rowIndex,
  isOwner,
  languageRef,
}) {
  // States
  // Fetched data
  const openAiKey = useSelector((state) => state.openAiKey.key);
  const { user } = useUser();
  const isAdmin = user?.type === process.env.NEXT_PUBLIC_ADMIN_CODE * 1;
  // Local data
  const totalCol =
    3 +
    (displayImg ? 1 : 0) +
    (displayDef2 ? 1 : 0) +
    (displayExample ? 1 : 0) +
    (isOwner ? 1 : 0);
  const [editting, setEditting] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState(null);
  const [aiImageUrl, setAiImageUrl] = useState(null);
  const [editted, setEditted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [openMagicInput, setOpenMagicInput] = useState(false);
  const [openFlaticonInput, setOpenFlaticonInput] = useState(false);
  const order = rowIndex + 1;
  const [loadingOpenAi, setLoadingOpenAi] = useState(false);
  // Input value
  const [term, setTerm] = useState(cardData.term);
  const [definition1, setDefition1] = useState(cardData.definition_1);
  const [definition2, setDefition2] = useState(cardData.definition_2);
  const [example, setExample] = useState(cardData.example);
  // Handler
  const dispatch = useDispatch();
  const handleEdit = () => {
    setEditting(true);
  };
  const handleUpdate = async (cardId) => {
    if (editted) {
      await onUpdateRow({
        id: cardId,
        term,
        definition1,
        definition2,
        example,
        selectedFileUrl,
        imageUrl: cardData.image_url,
        selectedFile: selectedFile,
        aiImageUrl: aiImageUrl,
      });
    }
    setSelectedFile(null);
    setSelectedFileUrl(null);
    setErrMsg("");
    setEditting(false);
  };
  const handleDelete = () => {};
  const handleAiImageBtn = () => {
    if (openAiKey) {
      setOpenMagicInput(true);
    } else {
      dispatch(openAPIKeyInput());
    }
  };
  //Set editting if info changed
  useEffect(() => {
    if (
      term !== cardData.term ||
      definition1 !== cardData.definition_1 ||
      definition2 !== cardData.definition_2 ||
      example !== cardData.example ||
      selectedFileUrl !== null
    ) {
      setEditted(true);
    } else {
      setEditted(false);
    }
    setErrMsg("");
  }, [term, definition1, definition2, example, selectedFileUrl]);
  // Dynamic variable
  let rowItemsGridTemp;
  switch (totalCol) {
    case 7:
      rowItemsGridTemp = styles.rowItemsGridFull;
      break;
    case 6:
      rowItemsGridTemp = styles.rowItemsGridCol6;
      break;
    case 5:
      rowItemsGridTemp = styles.rowItemsGridCol5;
      break;
    case 4:
      rowItemsGridTemp = styles.rowItemsGridCol4;
      break;
    case 3:
      rowItemsGridTemp = styles.rowItemsGridCol3;
      break;
    default:
      rowItemsGridTemp = styles.rowItemsGridColUnset;
      break;
  }
  return (
    <li className={`${styles.row}`}>
      <ul
        className={`${styles.rowItems} ${rowItemsGridTemp} ${
          editting ? styles.edittingRow : ""
        }`}
      >
        {/* Order */}
        <li
          className={`${styles.rowItem} ${editting ? styles.edittingItem : ""}`}
        >
          {order}
        </li>
        {/* Term */}
        <li
          className={`${styles.rowItem} ${editting ? styles.edittingItem : ""}`}
        >
          {editting ? (
            <TextareaAutosize
              maxLength={225}
              value={term}
              onChange={(e) => {
                setTerm(e.target.value);
              }}
              className={styles.autoSizeTextArea}
            />
          ) : (
            <div className="flex items-center justify-between w-full">
              <p className="break-all">{cardData.term}</p>
              {/* absolute right-0 top-1/2 -translate-y-1/2 -translate-x-full */}
              <div className="hover:text-blue-500">
                <TextToSpeech text={cardData.term} lang={languageRef}>
                  <SpeakerWaveIcon className="h-5 w-5 text-gray-500 hover:text-blue-500 cursor-pointer" />
                </TextToSpeech>
              </div>
            </div>
          )}
        </li>
        {/* Def 1 */}
        <li
          className={`${styles.rowItem} ${editting ? styles.edittingItem : ""}`}
        >
          {editting && (
            <TextareaAutosize
              maxLength={225}
              className={styles.autoSizeTextArea}
              value={definition1}
              onChange={(e) => {
                setDefition1(e.target.value);
              }}
            />
          )}
          {!editting && (
            <p className="break-words w-full">{cardData.definition_1}</p>
          )}
        </li>
        {/* Def 2 */}
        {displayDef2 && (
          <li
            className={`${styles.rowItem} ${
              editting ? styles.edittingItem : ""
            }`}
          >
            {editting && (
              <TextareaAutosize
                maxLength={225}
                onChange={(e) => {
                  setDefition2(e.target.value);
                }}
                value={definition2 || ""}
                className={styles.autoSizeTextArea}
              />
            )}
            {!editting && <p className="break-all">{cardData.definition_2}</p>}
          </li>
        )}
        {/* Example */}
        {displayExample && (
          <li
            className={`${styles.rowItem} ${
              editting ? styles.edittingItem : ""
            }`}
          >
            {editting && (
              <TextareaAutosize
                maxLength={225}
                className={styles.autoSizeTextArea}
                value={example || ""}
                onChange={(e) => {
                  setExample(e.target.value);
                }}
              />
            )}
            {!editting && <p className="break-all">{cardData.example}</p>}
          </li>
        )}
        {/* Card Image */}
        {displayImg && (
          <li
            datafield="image"
            className={`${styles.rowItem} relative !overflow-visible`}
          >
            {!editting && cardData.image_url && (
              <div className="relative w-12 h-12">
                <Image
                  sizes="80px"
                  fill
                  style={{ objectFit: "contain" }}
                  alt="card-image"
                  src={cardData.image_url}
                />
              </div>
            )}
            {!editting && !cardData.image_url && (
              <div className="relative w-12 h-12">
                <Image
                  sizes="40px"
                  fill
                  style={{ objectFit: "contain" }}
                  alt="card-image"
                  src={"/assets/images/uni-placeholder-image.png"}
                />
              </div>
            )}
            {editting && (
              <>
                {selectedFileUrl && (
                  <div className="relative w-12 h-12">
                    <Image
                      sizes="40px"
                      fill
                      style={{ objectFit: "contain" }}
                      alt="card-image"
                      src={selectedFileUrl}
                    />
                  </div>
                )}
                {!selectedFileUrl && cardData.image_url && (
                  <div className="relative w-12 h-12">
                    <Image
                      fill
                      sizes="40px"
                      style={{ objectFit: "contain" }}
                      alt="card-image"
                      src={cardData.image_url}
                    />
                  </div>
                )}
                {!selectedFileUrl && !cardData.image_url && (
                  <div className="relative w-12 h-12">
                    <Image
                      sizes="40px"
                      fill
                      style={{ objectFit: "contain" }}
                      alt="card-image"
                      src={"/assets/images/uni-placeholder-image.png"}
                    />
                  </div>
                )}
              </>
            )}
            {editting && (
              <>
                <div
                  className={`flex flex-col absolute top-1/2 -translate-y-1/2  left-1/2 translate-x-full ml-3 ${
                    isAdmin ? "" : "space-y-1"
                  }`}
                >
                  <input
                    multiple={false}
                    type="file"
                    accept="image/*"
                    hidden
                    id={cardData.id}
                    onChange={(e) => {
                      handleSelectedImage({
                        selectedFile: e.target.files[0],
                        inputTarget: e.target.value,
                        setErrMsg,
                        setSelectedFile,
                        setSelectedFileUrl,
                        setLoadingImage,
                      });
                      setAiImageUrl(null);
                    }}
                  />
                  <label className="cursor-pointer" htmlFor={cardData.id}>
                    <FolderPlusIcon className="h-5 w-5 text-blue-500" />
                  </label>
                  {/* AI generate image button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAiImageBtn();
                    }}
                    className="cursor-pointer"
                  >
                    <MagicWand className="w-5 h-5 fill-indigo-500" />
                  </button>
                  {/* Flaticon image for Admin only */}
                  {isAdmin && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenFlaticonInput(true);
                      }}
                      className="cursor-pointer"
                    >
                      <PhotoIcon className="h-5 w-5 fill-lime-500 outline-gray-500 z-10" />
                    </button>
                  )}
                </div>
                {loadingImage && (
                  <label className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 ">
                    <Spinner className="animate-spin h-6 w-6 text-blue-700" />
                  </label>
                )}
                {openMagicInput && (
                  <MagicPrompInput
                    setLoadingOpenAi={setLoadingOpenAi}
                    loadingOpenAi={loadingOpenAi}
                    openAiKey={openAiKey}
                    setOpenMagicInput={setOpenMagicInput}
                    term={term}
                    setSelectedFileUrl={setSelectedFileUrl}
                    setSelectedFile={setSelectedFile}
                    setAiImageUrl={setAiImageUrl}
                  />
                )}
                {openFlaticonInput && (
                  <FlaticonImageInput
                    setOpenFlaticonInput={setOpenFlaticonInput}
                    setSelectedFileUrl={setSelectedFileUrl}
                    setSelectedFile={setSelectedFile}
                    setAiImageUrl={setAiImageUrl}
                  />
                )}
              </>
            )}
          </li>
        )}
        {/* Edit button */}
        {isOwner && (
          <li
            className={`${styles.rowItem} flex items-center justify-center space-x-4`}
          >
            {!editting && (
              <>
                <button
                  title="Edit"
                  className="flex items-center"
                  onClick={() => {
                    !loading && handleEdit();
                  }}
                >
                  {loading ? (
                    <CloudArrowUpIcon
                      title="Uploading please wait."
                      className="h-5 w-5 text-blue-600 animate-bounce cursor-default"
                    />
                  ) : (
                    <PencilIcon className="h-5 w-5 text-blue-500" />
                  )}
                </button>
              </>
            )}
            {editting && (
              <>
                <button
                  disabled={loadingImage}
                  title="Delete"
                  className="flex items-center"
                  onClick={() => {
                    onDeleteRow(cardData.id);
                  }}
                >
                  <TrashIcon className="h-5 w-5 text-red-400" />
                </button>
                <button
                  disabled={loadingImage}
                  title="Save"
                  className="flex items-center"
                  onClick={() => {
                    const validTerm = term.trim();
                    if (!validTerm) {
                      setErrMsg("Term is required.");
                    } else {
                      handleUpdate(cardData.id);
                    }
                  }}
                >
                  <CheckCircleIcon
                    className={`h-6 w-6  ${
                      loadingImage || !term ? "text-blue-300" : "text-blue-500"
                    }`}
                  />
                </button>
              </>
            )}
          </li>
        )}
      </ul>
      {/* Error message */}
      {errMsg !== "" && (
        <div className="px-4 flex space-x-2 justify-end">
          <p className="text-end text-red-400">{errMsg}</p>
          <button
            className="text-gray-700 text-sm hover:underline"
            onClick={() => {
              setErrMsg("");
            }}
          >
            Dismiss
          </button>
        </div>
      )}
    </li>
  );
}

// Components
// Open Ai Prompt Input Modal
const MagicPrompInput = ({
  setOpenMagicInput,
  openAiKey,
  loadingOpenAi,
  setLoadingOpenAi,
  term,
  setSelectedFileUrl,
  setSelectedFile,
  setAiImageUrl,
}) => {
  // Local state
  const [imageUrl, setImageUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const [errMsg, setErrMsg] = useState("");
  // Effect
  useEffect(() => {
    setErrMsg("");
  }, [prompt]);
  useEffect(() => {
    const closeThis = () => {
      setOpenMagicInput(false);
    };
    window.addEventListener("click", closeThis, false);
    return () => {
      window.removeEventListener("click", closeThis);
    };
  }, []);
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="absolute right-0 top-full bg-indigo-100 z-20 border border-indigo-400  rounded-md shadow-md p-2 translate-x-1/3 space-y-2"
    >
      {/* Image */}
      <div className="relative flex items-center justify-center">
        <div className="relative w-20 h-20">
          {imageUrl && (
            <Image
              sizes="80px"
              alt="Illustration Image"
              src={imageUrl}
              fill
              style={{ objectFit: "contain" }}
            />
          )}
          {!imageUrl && (
            <Image
              sizes="80px"
              alt="No image placeholder"
              src={NoImageAi}
              fill
              style={{ objectFit: "contain" }}
            />
          )}
        </div>
        <button
          disabled={!imageUrl}
          onClick={() => {
            setSelectedFile(null);
            setSelectedFileUrl(imageUrl);
            setAiImageUrl(imageUrl);
            setOpenMagicInput(false);
          }}
          className={`absolute bottom-0 right-0 px-2 py-1 text-xs ${
            !imageUrl ? "bg-blue-300" : "bg-blue-600"
          } rounded text-white`}
        >
          Save
        </button>
      </div>
      {/* Input */}
      <TextareaAutosize
        maxLength={1000}
        minRows={5}
        maxRows={5}
        placeholder="Enter your prompt"
        className="outline-none border-indigo-400 border rounded text-xs px-1 w-48 "
        type="text"
        name=""
        id=""
        value={prompt}
        onChange={(e) => {
          setPrompt(e.target.value);
        }}
      />
      {/* Error message */}
      <div className="!mt-0">
        <p className="text-red-500 font-light text-xs">{errMsg}</p>
      </div>
      {/* Actions */}
      <div className="flex justify-end space-x-2">
        <button
          disabled={!prompt.trim() || loadingOpenAi}
          onClick={() => {
            generateAiImage(
              prompt.trim(),
              openAiKey,
              setLoadingOpenAi,
              setErrMsg,
              setImageUrl
            );
          }}
          className="bg-indigo-500 px-2 py-1 text-white rounded text-xs w-[74px] text-center"
        >
          {loadingOpenAi && (
            <Spinner
              className={`${
                loadingOpenAi ? "" : "hidden"
              } animate-spin h-4 w-4 text-white mx-auto`}
            />
          )}
          {!loadingOpenAi && <span>Generate</span>}
        </button>
      </div>
      {/* Styles setting */}
      <StyleInput term={term} setPrompt={setPrompt} />
      {/* Close button */}
      {/* <button className="absolute top-0 right-0 h-6 w-6 bg-gray-200 translate-x-1/2 -translate-y-1/2 rounded-full border border-gray-200 !mt-0">
        X
      </button> */}
    </div>
  );
};

const generateAiImage = async (
  prompt,
  key,
  setLoadingOpenAi,
  setErrMsg,
  setImageUrl
) => {
  setErrMsg("");
  setLoadingOpenAi(true);
  try {
    const {
      data: { data },
    } = await GetImageFromAi(prompt, key);
    if (data) {
      const tempImgUrl = data[0]?.url;
      if (tempImgUrl) {
        setImageUrl(tempImgUrl);
      }
    }
    setLoadingOpenAi(false);
  } catch (error) {
    setLoadingOpenAi(false);
    if (error.response.status === 401) {
      return setErrMsg("Your API Key is not valid.");
    }
    setErrMsg(error.message || "Something went wrong.");
  }
};

const StyleInput = ({ setPrompt, term }) => {
  const [style, setStyle] = useState("");
  const [type, setType] = useState("An illustration");
  const [bg, setBg] = useState("");
  return (
    <div className="text-xs flex flex-col space-y-2">
      <div className="space-y-1">
        <div className="flex justify-between">
          <label htmlFor="image-type-input" className="">
            Type:
          </label>
          <select
            onChange={(e) => {
              setType(e.target.value);
            }}
            name=""
            id="image-type-input"
          >
            <option value="An illustration">Illustration</option>
            <option value="A photograph">Photograph</option>
            <option value="A 3D render">3D Render</option>
          </select>
        </div>
        <div className="flex justify-between">
          <label htmlFor="image-type-input" className="">
            Style:
          </label>
          <select
            onChange={(e) => {
              setStyle(e.target.value);
            }}
            name=""
            id="image-style-input"
          >
            <option value="">none</option>
            <option value="cartoon">Cartoon</option>
            <option value="abstract">Abstract</option>
            <option value="anime">Anime</option>
            <option value="minimalist">Minimalist</option>
            <option value="surreal">Surreal</option>
          </select>
        </div>
        <div className="flex justify-between">
          <label htmlFor="image-type-input" className="">
            Background
          </label>
          <select
            onChange={(e) => {
              setBg(e.target.value);
            }}
            name=""
            id="image-bg-input"
          >
            <option value="">none</option>
            <option value="white">White</option>
            <option value="blue">Blue</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => {
            const _prompt = generatePromt(term, type, style, bg);
            setPrompt(_prompt);
          }}
          className="px-2 py-1 text-xs bg-lime-600 rounded text-white"
        >
          Generate prompt
        </button>
      </div>
    </div>
  );
};

const generatePromt = (term, type, style, bg) => {
  const text = `${type} of ${term}${style && ` in the style of ${style}`}${
    bg && `, background color ${bg}`
  }`;
  return text;
};

// Flat icon input
const FlaticonImageInput = ({
  setOpenFlaticonInput,
  setSelectedFileUrl,
  setSelectedFile,
  setAiImageUrl,
}) => {
  // Local state
  const PageSize = 10;
  const [renderImgArr, setRenderImgArr] = useState([]);
  const [imageArr, setImageArr] = useState([]);
  const [flaticonKey, setFlaticonKey] = useState("");
  const [foundKey, setFoundKey] = useState("");
  const [token, setToken] = useState("");
  const [tokenExpired, setTokenExpired] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [showTokenSetting, setShowTokenSetting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [buttonArr, setButtonArr] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);
  // Effect
  useEffect(() => {
    const key = localStorage.getItem("UC_flaticon_api_key");
    if (key) {
      setFoundKey(key);
    }
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("UC_flaticon_token");
    const expireTime = localStorage.getItem("UC_flaticon_token_expire");
    if (token) {
      setToken(token);
    }
    if (expireTime) {
      const currentTime = Math.floor(new Date().getTime() / 1000);
      if (currentTime > expireTime * 1) {
        localStorage.removeItem("UC_flaticon_token");
        localStorage.removeItem("UC_flaticon_token_expire");
        setToken("");
      }
    }
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [searchKeyword]);
  useEffect(() => {
    const closeThis = () => {
      setOpenFlaticonInput(false);
    };
    window.addEventListener("click", closeThis, false);
    return () => {
      window.removeEventListener("click", closeThis);
    };
  }, []);
  // Set current page when ever page change
  useEffect(() => {
    const startIndex = (page - 1) * PageSize;
    const endIndex = startIndex + PageSize;
    const newArr = imageArr.slice(startIndex, endIndex);
    setRenderImgArr(newArr);
  }, [page, imageArr]);
  // Set button arr
  useEffect(() => {
    const newBtnArr = Array.from(
      { length: Math.ceil(imageArr.length / PageSize) },
      (_, index) => index + 1
    );

    setButtonArr(newBtnArr);
  }, [imageArr]);
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="absolute right-0 top-full bg-blue-100 z-20 border border-blue-400  rounded-md shadow-md p-2 translate-x-1/3 space-y-2"
    >
      {/* Image */}
      <div className="relative flex items-center justify-center">
        <RenderImageResult
          renderImgArr={renderImgArr}
          setRenderImgArr={setRenderImgArr}
          setSelectedImg={setSelectedImg}
        />
      </div>
      {/* Save button */}
      <div className="flex justify-between">
        {/* Setting key and get token button */}
        <div className="flex items-center">
          <button
            onClick={() => {
              setShowTokenSetting((pre) => !pre);
            }}
            className="font-bold px-1 h-full rounded bg-blue-300 text-white"
          >
            ⚙
          </button>
        </div>
        {/* Pagination */}
        <div className="grid grid-cols-5 gap-2 rounded">
          {buttonArr.map((item, index) => {
            return (
              <button
                onClick={() => {
                  setPage(item);
                }}
                key={index}
                className={`${
                  item === page ? "bg-blue-500 " : "bg-blue-300"
                } w-5 text-xs rounded text-center text-white`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
        {/* Select button */}
        <button
          disabled={!selectedImg}
          onClick={() => {
            setSelectedFile(null);
            setSelectedFileUrl(selectedImg);
            setAiImageUrl(selectedImg);
            setOpenFlaticonInput(false);
          }}
          className={`px-2 py-1 text-xs ${
            selectedImg ? "bg-blue-500" : "bg-blue-300"
          } rounded text-white h-8`}
        >
          Select
        </button>
      </div>

      {/* Input */}
      <div className="flex space-x-2 justify-between">
        <input
          maxLength={1000}
          placeholder="Search"
          className="outline-none border-blue-400 border rounded text-xs px-1 w-48 h-8 "
          type="text"
          name=""
          id=""
          value={searchKeyword}
          onChange={(e) => {
            setSearchKeyword(e.target.value);
          }}
        />
        <button
          disabled={!searchKeyword.trim()}
          onClick={() => {
            if (!token) {
              setErrMsg("Retrieve token first");
            } else {
              getFlaticonImage(
                token,
                searchKeyword,
                setLoading,
                setImageArr,
                setErrMsg
              );
            }
          }}
          className="bg-blue-500 px-2 py-1 text-white rounded text-xs text-center w-9"
        >
          {loading && (
            <Spinner
              className={`${
                loading ? "" : "hidden"
              } animate-spin h-3 w-3 text-white mx-auto`}
            />
          )}
          {!loading && <span>🔍</span>}
        </button>
      </div>
      {/* Input flaticon key */}
      {showTokenSetting && (
        <div className="flex h-8 space-x-2">
          {!foundKey && (
            <>
              <input
                maxLength={1000}
                placeholder="Key"
                className={`outline-none border-blue-400 border rounded text-xs px-1`}
                type="text"
                name=""
                id=""
                value={flaticonKey}
                onChange={(e) => {
                  setFlaticonKey(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  localStorage.setItem("UC_flaticon_api_key", flaticonKey);
                  setFoundKey(flaticonKey);
                }}
                className="bg-lime-500 text-white px-2 text-xs rounded"
              >
                🔑
              </button>
            </>
          )}
          {foundKey && (
            <>
              <p className="select-none text-sm bg-gray-100 px-2 rounded flex-1">{`${foundKey.slice(
                -3
              )}`}</p>
              <button
                onClick={() => {
                  localStorage.removeItem("UC_flaticon_api_key");
                  localStorage.removeItem("UC_flaticon_token");
                  localStorage.removeItem("UC_flaticon_token_expire");
                  setFlaticonKey("");
                  setFoundKey("");
                  setToken("");
                }}
                className="bg-orange-500 font-bold px-2 text-xs rounded"
              >
                🔨
              </button>
              <button
                onClick={() => {
                  handleFlaticonToken(
                    foundKey,
                    setToken,
                    setTokenExpired,
                    setErrMsg
                  );
                }}
                className={`${
                  token && !tokenExpired ? "bg-lime-500 " : "bg-red-500"
                } h-full w-8 rounded `}
              >
                🚀
              </button>
            </>
          )}
        </div>
      )}
      {/* Error message */}
      <div className="!mt-0">
        <p className="text-red-500 font-light text-xs">{errMsg}</p>
      </div>
    </div>
  );
};

const handleFlaticonToken = async (
  apiKey,
  setToken,
  setTokenExpired,
  setErrMsg
) => {
  try {
    const {
      data: { data },
    } = await getFlaticonToken(apiKey);
    const { token, expires } = data;
    setToken(token);
    setTokenExpired(false);
    localStorage.setItem("UC_flaticon_token", token);
    localStorage.setItem("UC_flaticon_token_expire", expires);
  } catch (error) {
    setErrMsg(error.message || "Error when retrieve token.");
    setToken("");
    setTokenExpired(true);
  }
  // localStorage.setItem("UC_flaticon_token", );
};

const getFlaticonImage = async (
  token,
  searchKeyword,
  setLoading,
  setImageArr,
  setErrMsg
) => {
  // Available sizes 16,32,64,128,256,512
  const ImageSize = 256;
  setLoading(true);
  try {
    const {
      data: { data },
    } = await searchFlaticonImage(token, searchKeyword);
    if (data) {
      const receivedImageUrlArr = data?.map((item) => {
        return { id: item.id, imageUrl: item.images[`${ImageSize}`] };
      });
      setImageArr(receivedImageUrlArr);
    } else {
      setErrMsg("Not found");
    }
    setLoading(false);
  } catch (error) {
    setErrMsg(error.message || "Error when search image.");
    setLoading(false);
  }
};

// Render images
const RenderImageResult = ({
  renderImgArr,
  setRenderImgArr,
  setSelectedImg,
}) => {
  const handleClickOnImage = (selectedImageId) => {
    setRenderImgArr((pre) => {
      // Add selected properties to selected id
      const newArr = pre.map((item) => {
        if (item.id !== selectedImageId) {
          return { ...item, selected: false };
        } else {
          return { ...item, selected: true };
        }
      });
      return newArr;
    });
  };
  if (renderImgArr.length === 0) {
    return (
      <div className="w-60 h-24 border-blue-300 rounded border p-1 flex items-center justify-center ">
        <p className="text-sm text-gray-400 select-none">Search image</p>
      </div>
    );
  }
  return (
    <div className="w-60 h-24 border-blue-300 bg-white rounded border grid grid-cols-5 gap-1 p-1 ">
      {renderImgArr.map((item, index) => {
        return (
          <div
            onClick={() => {
              handleClickOnImage(item.id);
              setSelectedImg(item.imageUrl);
            }}
            key={item.id}
            className={`flex items-center justify-center rounded  ${
              item.selected ? "bg-blue-300" : ""
            }`}
          >
            <img className=" h-8 w-8" src={`${item.imageUrl}`} alt="" />
          </div>
        );
      })}
    </div>
  );
};
