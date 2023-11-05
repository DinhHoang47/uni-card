import PortalModalWrapper from "@components/PortalModalWrapper";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCard } from "@lib/useCard";
import { TextareaAutosize } from "@mui/base";
import Spinner from "@public/assets/icons/MySpinner";
import { addMessage } from "@redux/commonMessageSlice";
import { privateCollectionServ } from "@services/Private_CollectionService";
import { FREE_USER_CODE, FREE_USER_MAX_CARD_NUM } from "@utils/config";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function ImportCardModal({
  hanger,
  setIsOpen,
  displayExample,
  displayDef2,
  collectionId,
  totalCard,
  userType,
}) {
  // Fetched data
  const { mutate: mutateCardList } = useCard(collectionId);
  // Local state
  const [inputText, setInputText] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [separateBy, setSeparateBy] = useState("\t");
  const [newLineBy, setNewLineBy] = useState("\n");
  const defaultCardProperties = ["term", "definition_1"];
  let reachedMaxCard = false;
  if (userType === FREE_USER_CODE) {
    reachedMaxCard = totalCard >= FREE_USER_MAX_CARD_NUM;
  }
  //   Handler handle submit
  const dispatch = useDispatch();
  const showInputSuccessMsg = () => {
    dispatch(addMessage({ text: "Cards added", variation: "success" }));
  };
  const getCardProperties = () => {
    if (displayDef2) {
      defaultCardProperties.push("definition_2");
    }
    if (displayExample) {
      defaultCardProperties.push("example");
    }
  };
  getCardProperties();
  const handleImport = async () => {
    setLoading(true);
    const cardArr = textToArray(
      inputText,
      separateBy,
      newLineBy,
      defaultCardProperties,
      setErrMsg
    );
    // Check litmitation

    if (cardArr) {
      // Check total cards
      const totalNewCard = cardArr.length + totalCard;
      if (
        totalNewCard > FREE_USER_MAX_CARD_NUM &&
        userType === FREE_USER_CODE
      ) {
        setErrMsg(
          `You reached max ${FREE_USER_MAX_CARD_NUM} cards per collection for free user.\nOnly ${
            FREE_USER_MAX_CARD_NUM - totalCard
          } cards left.`
        );
        setLoading(false);
        return;
      }
      try {
        const result = await privateCollectionServ.importCard(
          collectionId,
          cardArr
        );
        mutateCardList();
        showInputSuccessMsg();
        setLoading(false);
        setIsOpen(false);
      } catch (error) {
        setErrMsg(error?.response?.data?.message);
        setLoading(false);
      }
    }
    setLoading(false);
  };
  //   Effect
  useEffect(() => {
    setErrMsg("");
  }, [inputText]);
  return (
    <PortalModalWrapper mountTarget={hanger}>
      <div className="bg-white relative rounded-md p-6">
        {/* Title */}
        <h3 className="font-semibold text-xl text-center">Import your card</h3>

        {/* Data Input */}
        <form className="space-y-2 mt-4">
          {/* Sample */}

          {/* Text input */}
          <div className="space-y-2">
            <div className="space-y-1">
              <label className="font-semibold">
                From Word, Excel, Google Docs, etc.
              </label>
              <div className="bg-gray-50 border border-gray-300 rounded p-2">
                <div className="text-sm text-gray-400  font-satoshi">
                  <p>Sample: </p>
                  <p className="whitespace-pre-wrap">{`Term1\t\tDefinition1${
                    displayDef2 ? "\t\tPronunciation1" : ""
                  }${
                    displayExample ? "\t\tExample1" : ""
                  }\nTerm2\t\tDefinition2${
                    displayDef2 ? "\t\tPronunciation2" : ""
                  }${displayExample ? "\t\tExample2" : ""}`}</p>
                  <span className="text-gray-400 text-xs">
                    *Term is required field.
                  </span>
                </div>
              </div>
            </div>

            <TextareaAutosize
              value={inputText}
              onKeyDown={(e) => {
                const { value } = e.target;
                if (e.key === "Tab") {
                  const cursorPosition = e.target.selectionStart;
                  const cursorEndPosition = e.target.selectionEnd;
                  const tab = "\t";
                  e.preventDefault();
                  e.target.value =
                    value.substring(0, cursorPosition) +
                    tab +
                    value.substring(cursorEndPosition);
                  e.target.selectionStart = cursorPosition + 1;
                  e.target.selectionEnd = cursorPosition + 1;
                }
              }}
              placeholder={`Copy and paste your data here`}
              onChange={(e) => {
                setInputText(e.target.value);
              }}
              wrap="hard"
              minRows={5}
              maxRows={10}
              className="w-full sm:w-[480px] p-2 border rounded resize-none focus:outline-none bg-transparent border-blue-300"
            ></TextareaAutosize>
          </div>
          {/* Options */}
          {/* <OptionInput
            separateBy={separateBy}
            setSeparateBy={setSeparateBy}
            newLineBy={newLineBy}
            setNewLineBy={setNewLineBy}
          /> */}
          {/* Error Message */}
          <div className="">
            <p className="text-red-500 text-sm whitespace-pre-wrap">{errMsg}</p>
            {reachedMaxCard && (
              <p className="text-orange-500 text-sm">
                You've reached the maximum {FREE_USER_MAX_CARD_NUM} cards per
                collection for a free user.
              </p>
            )}
          </div>
          {/* Submit button */}
          <button
            disabled={reachedMaxCard}
            onClick={(e) => {
              e.preventDefault();
              handleImport();
            }}
            className={`${
              loading || reachedMaxCard ? "bg-blue-400" : "bg-blue-600"
            }  w-full h-10 rounded inline-flex items-center justify-center px-4 py-2 font-semibold leading-6 text-sm shadow transition ease-in-out duration-150 text-white`}
          >
            <Spinner
              className={`${
                loading ? "" : "hidden"
              } animate-spin -ml-1 mr-3 h-5 w-5 text-white`}
            />
            Import
          </button>
        </form>
        {/* Close btn */}
        <button
          onClick={() => {
            setIsOpen(false);
          }}
          className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1 border border-gray-300"
        >
          <XMarkIcon className="h-6 w-6 text-gray-500" />
        </button>
      </div>
    </PortalModalWrapper>
  );
}

const OptionInput = ({
  separateBy,
  setSeparateBy,
  newLineBy,
  setNewLineBy,
}) => {
  return (
    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-5 min-w-max">
      {/* Separate by */}
      <div className="space-y-1">
        <h4 className="font-semibold">Between Definition and Term</h4>
        <div className="ml-1">
          <div className="space-x-2">
            <input
              type="radio"
              name="separateBy"
              id="tab"
              value={"\t"}
              checked={separateBy === "\t"}
              onChange={(e) => {
                setSeparateBy(e.target.value);
              }}
            />
            <label htmlFor="tab">Tab</label>
          </div>
          <div className="space-x-2">
            <input
              type="radio"
              name="separateBy"
              id="comma"
              value={","}
              checked={separateBy === ","}
              onChange={(e) => {
                setSeparateBy(e.target.value);
              }}
            />
            <label htmlFor="comma">Comma</label>
          </div>
        </div>
      </div>
      {/* New line by */}
      <div className="space-y-1">
        <h4 className="font-semibold">Between cards</h4>
        <div className="ml-1">
          <div className="space-x-2">
            <input
              type="radio"
              name="newLineBy"
              id="newLine"
              value={"\n"}
              checked={newLineBy === "\n"}
              onChange={(e) => {
                setNewLineBy(e.target.value);
              }}
            />
            <label htmlFor="newLine">New Line</label>
          </div>
          <div className="space-x-2">
            <input
              type="radio"
              name="newLineBy"
              id="semicolon"
              value={"."}
              checked={newLineBy === "."}
              onChange={(e) => {
                setNewLineBy(e.target.value);
              }}
            />
            <label htmlFor="semicolon">Semicolon</label>
          </div>
        </div>
      </div>
    </div>
  );
};

const textToArray = (
  text,
  seperateBy,
  newLineBy,
  properties = ["term", "definition"],
  setErrMsg
) => {
  const cards = text.split(newLineBy);
  const cardItems = cards.map((item) => {
    return item.split(seperateBy);
  });

  const reformCardItems = cardItems.map((cardData) => {
    let formedObject = {};
    properties.forEach((property, index) => {
      formedObject[property] = cardData[index];
    });
    return formedObject;
  });
  // Validate input
  const emptyTermIndex = [];
  const invalidLengthIndex = [];
  reformCardItems.forEach((data, index) => {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key];
        if (key === "term" && value.trim() === "") {
          emptyTermIndex.push(index);
        }
        if (typeof value === "string" && value.length > 225) {
          console.log("value.length: ", value.length);
          invalidLengthIndex.push(index);
        }
      }
    }
  });
  let message = "Invalid input at:\n";
  if (emptyTermIndex.length !== 0) {
    emptyTermIndex.forEach(
      (item) => (message += `Row ${item + 1} term is required\n`)
    );
  }
  if (invalidLengthIndex.length !== 0) {
    invalidLengthIndex.forEach((item) => {
      message += `Row ${
        item + 1
      } invalid value. Input string max length 225.\n`;
    });
  }
  if (emptyTermIndex.length !== 0 || invalidLengthIndex.length !== 0) {
    setErrMsg(message);
    return undefined;
  }
  return reformCardItems;
};
