import React, { useEffect, useState } from "react";

export default function ScaleWrapper({ children }) {
  return (
    <div className="ml-60 min-h-screen bg-[#F7F5EF]">
      {children}
    </div>
  );
}
