"use client";
import { useState } from "react";

export default function TestingCard_Front() {
  const haveDefine2 = true;
  return (
    <div className="h-60 rounded-lg cursor-pointer">
      <div className="rounded-lg h-full bg-white flex items-center justify-center p-10 border border-slate-400">
        <div className="text-4xl">漢字</div>
      </div>
    </div>
  );
}
