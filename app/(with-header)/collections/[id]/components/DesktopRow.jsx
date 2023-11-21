import Image from "next/image";
import { useEffect, useState } from "react";

import styles from "./styles.module.css";
import { PencilIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { CloudArrowUpIcon } from "@heroicons/react/20/solid";
import { DocumentArrowUpIcon } from "@heroicons/react/20/solid";
import { FolderPlusIcon } from "@heroicons/react/24/solid";
import { TextareaAutosize } from "@mui/base";
import { handleSelectedImage } from "@lib/handleSelectedImage";
import Spinner from "@public/assets/icons/MySpinner";
import MagicWand from "@public/assets/icons/MagicWand";
import NoImageAi from "@public/assets/images/no-image-ai.png";
import { useDispatch, useSelector } from "react-redux";
import { openAPIKeyInput } from "@redux/modalSlice";
import { GetImageFromAi } from "@services/OpenAIService";

export default function DesktopRow({
  cardData,
  displayImg,
  displayDef2,
  displayExample,
  onDeleteRow,
  onUpdateRow,
  rowIndex,
  isOwner,
}) {
  // States
  // Fetched data
  const openAiKey = useSelector((state) => state.openAiKey.key);
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
            <p className="break-all">{cardData.term}</p>
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
                <div className="flex flex-col absolute top-1/2 -translate-y-1/2  left-1/2 translate-x-full ml-3 space-y-1">
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
  const [style, setStyle] = useState("anime");
  const [type, setType] = useState("An illustration");
  const [bg, setBg] = useState("white");
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
            <option value="anime">Anime</option>
            <option value="abstract">Abstract</option>
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
  const text = `${type} of ${term} in the style of ${style}, background color ${bg}`;
  return text;
};

const generateRandomPrompt = (term) => {
  const typeArr = ["illustration", "photograph", "3D render"];
  const styleArr = ["abstract", "minimalist", "surreal"];
  const randomType = Math.floor(Math.random() * typeArr.length);
  const randomStyle = Math.floor(Math.random() * styleArr.length);
  const text = `${typeArr[randomType]} of ${term} in the style of ${styleArr[randomStyle]}`;
  return text;
};

const handleSaveAiImg = (imageUrl) => {};
