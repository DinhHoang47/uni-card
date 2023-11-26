import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import _ from "lodash";

export default function ContentSetting({ rowProperty, setRowProperty }) {
  // Sort render list by order
  const clonedArr = _.cloneDeep(rowProperty) || [];
  clonedArr.sort((a, b) => a.order - b.order);
  return (
    <div className="w-64 shrink-0 bg-zinc-100 p-3 rounded-md mr-4 text-sm space-y-4">
      <h3 className="font-bold pl-2">Content setting</h3>
      {clonedArr.map((item, index) => {
        return (
          <RowItem
            index={index}
            key={item.field}
            data={item}
            setRowProperty={setRowProperty}
          />
        );
      })}
    </div>
  );
}

const RowItem = ({ data, setRowProperty, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className=" rounded border pb-1">
      <RowItemHeader
        setOpen={setOpen}
        open={open}
        data={data}
        setRowProperty={setRowProperty}
        index={index}
      />
      <RowContent
        setOpen={setOpen}
        open={open}
        data={data}
        setRowProperty={setRowProperty}
        index={index}
      />
    </div>
  );
};

const RowItemHeader = ({ open, setOpen, data, setRowProperty, index }) => {
  return (
    <div className="flex flex-col font-semibold">
      <div className={`flex space-x-2 justify-end bg-zinc-200 rounded-t`}>
        {data.order < 4 && (
          <button
            onClick={() => {
              handleChangeOrder("down", data.order, setRowProperty);
            }}
            className="hover:text-blue-600"
          >
            <ChevronDownIcon className="h-4 w-4 stroke-2 text-orange-600 " />
          </button>
        )}

        {data.order === 1 && <div className="w-4 h-4"></div>}
        {data.order > 1 && (
          <button
            onClick={() => {
              handleChangeOrder("up", data.order, setRowProperty);
            }}
            className="hover:text-blue-600"
          >
            <ChevronUpIcon className="h-4 w-4 stroke-2 text-lime-600" />
          </button>
        )}
      </div>
      <div className={`flex items-center space-x-2`}>
        <div
          onClick={() => {
            setRowProperty((pre) => {
              const clonedArr = _.cloneDeep(pre);
              clonedArr[index].display = !clonedArr[index].display;
              return clonedArr;
            });
          }}
          className=""
        >
          {data.display ? (
            <EyeIcon className="h-4 w-4 text-slate-500" />
          ) : (
            <EyeSlashIcon className="h-4 w-4 text-slate-500" />
          )}
        </div>
        <div
          onClick={() => {
            setOpen((pre) => !pre);
          }}
          className="flex items-center select-none space-x-2"
        >
          <p className="">{data.label}</p>
          <span className="">
            <ChevronDownIcon
              className={`h-4 w-4  ${open ? "" : "-rotate-90"}`}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

const RowContent = ({ open, setOpen, data, setRowProperty, index }) => {
  return (
    <div
      className={`${
        open ? "h-auto" : "h-0"
      } overflow-hidden transition-all pl-6`}
    >
      {data.property.map((item, currentIndex) => {
        const Controller = item.controller;
        return (
          <div
            key={item[`${item.alias}`]}
            className="flex items-center justify-between"
          >
            <label htmlFor="">{item.label}</label>
            <Controller
              value={item[`${item.alias}`]}
              onChange={(value) => {
                setRowProperty((pre) => {
                  const clonedArr = _.cloneDeep(pre);
                  clonedArr[index].property[currentIndex][`${item.alias}`] =
                    value;
                  return clonedArr;
                });
              }}
              {...item.setting}
            />
          </div>
        );
      })}
    </div>
  );
};

const handleChangeOrder = (type, currentOrder, setRowProperty) => {
  if (type === "up" && currentOrder > 1) {
    const nextOrder = currentOrder - 1;
    setRowProperty((pre) => {
      const clonedArr = _.cloneDeep(pre);
      clonedArr[currentOrder - 1].order = nextOrder;
      clonedArr[currentOrder - 2].order = nextOrder + 1;
      clonedArr.sort((a, b) => a.order - b.order);
      return clonedArr;
    });
  } else if (type === "down" && currentOrder < 4) {
    const nextOrder = currentOrder + 1;
    setRowProperty((pre) => {
      const clonedArr = _.cloneDeep(pre);
      clonedArr[currentOrder - 1].order = nextOrder;
      clonedArr[currentOrder].order = nextOrder - 1;
      clonedArr.sort((a, b) => a.order - b.order);
      return clonedArr;
    });
  }
};
