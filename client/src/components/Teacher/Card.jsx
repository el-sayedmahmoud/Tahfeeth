import React from "react";

function Card() {
  return (
    <div className="flex flex-col bg-white shadow-lg w-60 h-80 py-8 items-center justify-between">
      <div className="w-32 h-32 rounded-full flex items-center justify-center shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
        <img src="/assets/myPhoto.jpg" alt="my pic" className="rounded-full" />
      </div>
      <div className="flex flex-col items-center justify-center gap-2 mt-4">
        <p className="text-xl flex gap-2">
          <span className="font-semibold">محمود خالد</span>
          <span>(مجاز)</span>
        </p>
        <p className="text-xl font-semibold">100 ج</p>
        <button className="bg-[#9F8565] hover:bg-[#7f6a51] transition-colors mt-4 text-white text-lg py-1 px-2">
          عرض التفاصيل
        </button>
      </div>
    </div>
  );
}

export default Card;
