"use client";
import { useEffect, useState } from "react";

const MyImage = ({ alt = "Alt", ...props }) => {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => setIsClient(true), []);
    if (!isClient) {
      return null;
    }
    return (
      <div className="mt-4 mb-6">
        <img alt={alt} {...props} />
        <p className="mt-[5px] text-center text-[#babec3] font-sans text-sm">{alt}</p>
      </div>
    );
  };

  
export default MyImage;