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
        <img alt={alt} {...props} className={`${(props.position==="left")? 'mr-auto' : (props.position==="right")? 'ml-auto' : 'mx-auto'}  ${(props.size==="small")?"w-[25%]":(props.size==="large")?"w-[75%]":"w-[50%]"}`}  />
        <p className={`mt-[5px] text-[#babec3] text-sm ${(props.position==="left")? 'text-left' : (props.position==="right")? 'text-right' : 'text-center'}`}>{alt}</p>
      </div>
    );
  };

  
export default MyImage;