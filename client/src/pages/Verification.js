import React from "react";
import { Link } from "react-router-dom";

function Verification() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-4xl text-center font-medium px-6 leading-loose overflow-hidden">
        من فضلك تفقد بريدك الإلكتروني لتفعيل الحساب وعد لتسجيل الدخول
      </h2>
      <Link to={"/register?mode=login"}>
        <button className="bg-[#C1A98D] hover:bg-[#9F8565] transition-colors px-5 py-3 w-48 text-white text-2xl mt-8 mx-auto block">
          تسجيل الدخول
        </button>
      </Link>
    </div>
  );
}

export default Verification;
