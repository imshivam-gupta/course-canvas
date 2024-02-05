"use client";
import { FiCopy } from 'react-icons/fi';
import { FcCheckmark } from 'react-icons/fc';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import React, { useState } from "react";
import { motion } from "framer-motion";

interface CodeBlockProps {
  className: string;
  children: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ className, children }) => {
  const language = className.replace("lang-", "").split(" ")[0].toLowerCase();
  const [elem, setElem] = useState(<FiCopy className="inline" />);
  const [text, setText] = useState("Copy");

  const changeText = () => {
    setText("Copied!");
    setElem(<FcCheckmark className="inline" />);
    setTimeout(() => {
      setText("Copy");
      setElem(<FiCopy className="inline" />);
    }, 2000);
  };

  return (
    <div className="codeBlock mb-6 -mt-2">
      <div className="relative top-8 text-right pr-10 text-sm">
        <span className="mr-6">{language}</span>
        <motion.span
          className={` text-gray-200 ${text === "Copied!" ? "text-green-500 cursor-default" : "cursor-pointer"}`}
          onClick={() => {
            navigator.clipboard.writeText(children);
            changeText();
          }}
          animate={{
            color: text === "Copied!" ? "#22C55E" : "#FFFFFF"
          }}
          transition={{ duration: 0.1 }}
        >
          {elem}
        </motion.span>
      </div>
      <SyntaxHighlighter
        language={language}
        // showLineNumbers={language !== "md"}
        style={atomOneDark}
        className={`rounded-md text-sm !py-4 !px-4 bggrad prevent-select ${language !== "md" ? "!px-10" : "!px-10"}`}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

interface PreBlockProps {
  children: any;
}

const PreBlock: React.FC<PreBlockProps> = ({ children, ...rest }) => {
  // if (React.isValidElement(children) && 'type' in children.props) {
    return CodeBlock(children.props);
  // }
  // return <h2 {...rest}>{"jiejfie"}</h2>;
};

export default PreBlock;
