import React from "react";
import { Link } from "react-router-dom";

const StudentCard = ({ student }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col p-4 flex-wrap justify-around px-8 my-8">
      <div className="flex items-center justify-between mb-2 gap-6">
        <h2 className="text-xl font-bold text-gray-800">{student?.name}</h2>
        <p className="text-gray-500 font-semibold text-lg">{student?.email}</p>
        <p>{student?.status === "verified" ? "نشط" : "محظور"}</p>
      </div>
      <p className="text-gray-700 text-base"></p>
      <div className="flex mt-4 space-x-2 justify-between items-center">
        <Link
          to={`/details/${student._id}`}
          type="button"
          className="px-3 py-2 text-lg font-medium text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors focus:ring-blue-500"
        >
          جداول
        </Link>
        <button
          type="button"
          className="px-3 py-2 text-lg font-medium text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors focus:ring-red-500"
        >
          حظر
        </button>
        <button
          type="button"
          className="px-3 py-2 text-lg font-medium text-white bg-[#43766C] hover:bg-[#236659] focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors "
        >
          طرد
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
