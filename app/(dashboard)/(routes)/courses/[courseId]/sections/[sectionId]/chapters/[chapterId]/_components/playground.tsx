"use client";
import { useState, useEffect } from "react";
import PreferenceNav from "./PreferenceNav";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { rust } from "@codemirror/lang-rust";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import EditorFooter from "./EditorFooter";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import useLocalStorage from "@/hooks/use-local-storage";

type PlaygroundProps = {
    problem: any;
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
    setSolved: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface ISettings {
    fontSize: string;
    settingsModalIsOpen: boolean;
    dropdownIsOpen: boolean;
    language: string; // New setting for selected language
}

const Playground: React.FC<PlaygroundProps> = ({ problem, setSuccess, setSolved }) => {
    const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
    const [userCode, setUserCode] = useState<string>("");
    const [fontSize, setFontSize] = useLocalStorage("lcc-fontSize", "16px");
    const [settings, setSettings] = useState<ISettings>({
        fontSize: fontSize,
        settingsModalIsOpen: false,
        dropdownIsOpen: false,
        language: "js", // Default language set to JavaScript
    });

    // Find the boilerplate code for the selected language
    const getBoilerplateCode = (language: string) => {
        const codeObj = problem.boilerplateCodes.find((code: { language: string }) => code.language === language);
        return codeObj ? codeObj.code : "";
    };

    // Update user code when language changes
    useEffect(() => {
        const initialCode = getBoilerplateCode(settings.language);
        setUserCode(initialCode);
    }, [settings.language, problem._id]);

    const handleSubmit = async () => {
        try {
            let codeToExecute = userCode.slice(userCode.indexOf(problem.starterFunctionName));
            const cb = new Function(`return ${codeToExecute}`)();
        } catch (error: any) {
            console.log(error.message);
            if (error.message.startsWith("AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:")) {
                toast.error("Oops! One or more test cases failed", {
                    position: "top-center",
                    autoClose: 3000,
                    theme: "dark",
                });
            } else {
                toast.error(error.message, {
                    position: "top-center",
                    autoClose: 3000,
                    theme: "dark",
                });
            }
        }
    };

    const onChange = (value: string) => {
        setUserCode(value);
        localStorage.setItem(`code-${problem._id}-${settings.language}`, JSON.stringify(value));
    };

    const languageExtensions = {
        js: javascript(),
        cpp: cpp(),
        rs: rust(),
        py: python(),
        java: java(),
    };

    return (
        <div className='flex flex-col bg-dark-layer-1 relative overflow-x-hidden'>
            <PreferenceNav
                settings={settings}
                setSettings={setSettings}
                languages={["JavaScript", "C++", "Rust", "Python", "Java"]}
                languageKeys={["js", "cpp", "rs", "py", "java"]}
            />


                <div className='w-full overflow-auto h-[calc(100vh-94px)] bg-[#1E1E1E] pt-3'>
                    <CodeMirror
                        value={userCode}
                        theme={vscodeDark}
                        onChange={onChange}
                        extensions={[languageExtensions[settings.language]]}
                        style={{ fontSize: settings.fontSize }}
                    />
                </div>

            {/*<EditorFooter handleSubmit={handleSubmit} />*/}
        </div>
    );
};
export default Playground;
