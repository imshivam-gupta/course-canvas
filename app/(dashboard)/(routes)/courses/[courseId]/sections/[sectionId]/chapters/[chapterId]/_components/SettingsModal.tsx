import { useState } from "react";
import { BsCheckLg, BsChevronDown } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { ISettings } from "./playground";
import useLocalStorage from "@/hooks/use-local-storage";

const EDITOR_FONT_SIZES = ["12px", "13px", "14px", "15px", "16px", "17px", "18px"];
const SUPPORTED_LANGUAGES = [
    { label: "JavaScript", value: "js" },
    { label: "C++", value: "cpp" },
    { label: "Rust", value: "rs" },
    { label: "Python", value: "py" },
    { label: "Java", value: "java" }
];

interface SettingsModalProps {
    settings: ISettings;
    setSettings: React.Dispatch<React.SetStateAction<ISettings>>;
}

interface SettingsListItemProps {
    fontSize: string;
    selectedOption: string;
    handleFontSizeChange: (fontSize: string) => void;
}

const SettingsListItem: React.FC<SettingsListItemProps> = ({ fontSize, selectedOption, handleFontSizeChange }) => {
    return (
        <li
            className="relative flex h-8 cursor-pointer select-none py-1.5 pl-2 text-label-2 dark:text-dark-label-2 hover:bg-dark-fill-3 rounded-lg"
            onClick={() => handleFontSizeChange(fontSize)}
        >
            <div
                className={`flex h-5 flex-1 items-center pr-2 ${
                    selectedOption === fontSize ? "font-medium" : ""
                }`}
            >
                <div className="whitespace-nowrap">{fontSize}</div>
            </div>
            <span
                className={`text-blue dark:text-dark-blue flex items-center pr-2 ${
                    selectedOption === fontSize ? "visible" : "invisible"
                }`}
            >
                <BsCheckLg />
            </span>
        </li>
    );
};

const SettingsModal: React.FC<SettingsModalProps> = ({ setSettings, settings }) => {
    const [fontSize, setFontSize] = useLocalStorage("lcc-fontSize", "16px");
    const [isFontSizeDropdownOpen, setFontSizeDropdownOpen] = useState(false);
    const [isLanguageDropdownOpen, setLanguageDropdownOpen] = useState(false);

    const handleClickFontSizeDropdown = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        setFontSizeDropdownOpen(!isFontSizeDropdownOpen);
        setLanguageDropdownOpen(false); // Close language dropdown if it's open
    };

    const handleClickLanguageDropdown = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        setLanguageDropdownOpen(!isLanguageDropdownOpen);
        setFontSizeDropdownOpen(false); // Close font size dropdown if it's open
    };

    const handleLanguageChange = (language: string) => {
        setSettings({ ...settings, language });
    };

    return (
        <div className='text-white z-40'>
            <div aria-modal='true' role='dialog' className='fixed inset-0 overflow-y-auto z-modal'>
                <div className='flex min-h-screen items-center justify-center px-4'>
                    {/* overlay */}
                    <div
                        className='opacity-100'
                        onClick={() => setSettings({ ...settings, settingsModalIsOpen: false })}
                    >
                        <div className='fixed inset-0 bg-gray-8 opacity-60'></div>
                    </div>

                    <div className='my-8 inline-block min-w-full transform rounded-[13px] text-left transition-all bg-overlay-3 md:min-w-[420px] shadow-level4 shadow-lg p-0 bg-[rgb(40,40,40)] w-[600px] !overflow-visible opacity-100 scale-100'>
                        {/* setting header */}
                        <div className='flex items-center border-b px-5 py-4 text-lg font-medium border-dark-divider-border-2'>
                            Settings
                            <button
                                className='ml-auto cursor-pointer rounded transition-all'
                                onClick={() => setSettings({ ...settings, settingsModalIsOpen: false })}
                            >
                                <IoClose />
                            </button>
                        </div>

                        <div className='px-6 pt-4 pb-6'>
                            {/* Font Size Selection */}
                            <div className='mt-6 flex justify-between'>
                                <div className='w-[340px]'>
                                    <h3 className='text-base font-medium'>Font size</h3>
                                    <p className='text-label-3 mt-1.5'>Choose your preferred font size for the code editor.</p>
                                </div>
                                <div className='w-[170px]'>
                                    <div className='relative'>
                                        <button
                                            onClick={handleClickFontSizeDropdown}
                                            className='flex cursor-pointer items-center rounded px-3 py-1.5 text-left focus:outline-none whitespace-nowrap bg-dark-fill-3 hover:bg-dark-fill-2 active:bg-dark-fill-3 w-full justify-between'
                                            type='button'
                                        >
                                            {fontSize}
                                            <BsChevronDown />
                                        </button>
                                        {isFontSizeDropdownOpen && (
                                            <ul
                                                className='absolute mt-1 max-h-56 overflow-auto rounded-lg p-2 z-50 focus:outline-none shadow-lg w-full bg-dark-layer-1'
                                                style={{
                                                    filter: "drop-shadow(rgba(0, 0, 0, 0.04) 0px 1px 3px) drop-shadow(rgba(0, 0, 0, 0.12) 0px 6px 16px)",
                                                }}
                                            >
                                                {EDITOR_FONT_SIZES.map((size, idx) => (
                                                    <SettingsListItem
                                                        key={idx}
                                                        fontSize={size}
                                                        selectedOption={fontSize}
                                                        handleFontSizeChange={(size) => {
                                                            setFontSize(size);
                                                            setSettings({ ...settings, fontSize: size });
                                                            setFontSizeDropdownOpen(!isFontSizeDropdownOpen)
                                                        }}
                                                    />
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Language Selection */}
                            <div className='mt-6 flex justify-between'>
                                <div className='w-[340px]'>
                                    <h3 className='text-base font-medium'>Language</h3>
                                    <p className='text-label-3 mt-1.5'>Select your preferred language for code editor.</p>
                                </div>
                                <div className='w-[170px]'>
                                    <div className='relative'>
                                        <button
                                            onClick={handleClickLanguageDropdown}
                                            className='flex cursor-pointer items-center rounded px-3 py-1.5 text-left focus:outline-none whitespace-nowrap bg-dark-fill-3 hover:bg-dark-fill-2 active:bg-dark-fill-3 w-full justify-between'
                                            type='button'
                                        >
                                            {SUPPORTED_LANGUAGES.find((lang) => lang.value === settings.language)?.label || "Select Language"}
                                            <BsChevronDown />
                                        </button>
                                        {isLanguageDropdownOpen && (
                                            <ul
                                                className='absolute mt-1 max-h-56 overflow-auto rounded-lg p-2 z-50 focus:outline-none shadow-lg w-full bg-dark-layer-1'
                                                style={{
                                                    filter: "drop-shadow(rgba(0, 0, 0, 0.04) 0px 1px 3px) drop-shadow(rgba(0, 0, 0, 0.12) 0px 6px 16px)",
                                                }}
                                            >
                                                {SUPPORTED_LANGUAGES.map((language) => (
                                                    <li
                                                        key={language.value}
                                                        className='flex h-8 cursor-pointer select-none py-1.5 pl-2 text-label-2 dark:text-dark-label-2 hover:bg-dark-fill-3 rounded-lg'
                                                        onClick={() => handleLanguageChange(language.value)}
                                                    >
                                                        <div className={`flex-1 ${settings.language === language.value ? "font-medium" : ""}`}>
                                                            {language.label}
                                                        </div>
                                                        {settings.language === language.value && (
                                                            <span className='text-blue dark:text-dark-blue pr-2'>
                                                                <BsCheckLg />
                                                            </span>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;
