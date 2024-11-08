import { useState, useEffect } from "react";
import { AiOutlineFullscreen, AiOutlineFullscreenExit, AiOutlineSetting } from "react-icons/ai";
import { ISettings } from "./playground";
import SettingsModal from "./SettingsModal";

type PreferenceNavProps = {
    settings: ISettings;
    setSettings: React.Dispatch<React.SetStateAction<ISettings>>;
};

const LANGUAGES = [
    { label: "JavaScript", value: "js" },
    { label: "C++", value: "cpp" },
    { label: "Rust", value: "rs" },
    { label: "Python", value: "py" },
    { label: "Java", value: "java" }
];

const PreferenceNav: React.FC<PreferenceNavProps> = ({ setSettings, settings }) => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

    const handleFullScreen = () => {
        if (isFullScreen) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
        setIsFullScreen(!isFullScreen);
    };

    const toggleLanguageDropdown = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
    };

    const handleLanguageSelect = (language: { label: string; value: string }) => {
        setSelectedLanguage(language);
        setIsLanguageDropdownOpen(false);
        // If needed, update settings or other state with language value
        setSettings({ ...settings, language: language.value });
    };

    useEffect(() => {
        function exitHandler() {
            if (!document.fullscreenElement) {
                setIsFullScreen(false);
                return;
            }
            setIsFullScreen(true);
        }

        if (document.addEventListener) {
            document.addEventListener("fullscreenchange", exitHandler);
            document.addEventListener("webkitfullscreenchange", exitHandler);
            document.addEventListener("mozfullscreenchange", exitHandler);
            document.addEventListener("MSFullscreenChange", exitHandler);
        }
    }, [isFullScreen]);

    return (
        <div>
        <div className="flex items-center justify-between bg-dark-layer-2 h-11 w-full py-2 px-6">
            <div className="flex items-center text-white relative">
                <button
                    className="flex cursor-pointer items-center rounded focus:outline-none bg-dark-fill-3 text-dark-label-2 hover:bg-dark-fill-2 px-2 py-1.5 font-medium"
                    onClick={toggleLanguageDropdown}
                >
                    <div className="flex items-center px-1">
                        <div className="text-label-2 dark:text-dark-label-2">
                            {selectedLanguage.label}
                        </div>
                    </div>
                </button>
                {isLanguageDropdownOpen && (
                    <ul
                        className="absolute top-full mt-1 bg-dark-fill-3 rounded-lg shadow-lg z-50 w-full text-left text-sm text-label-2 dark:text-dark-label-2"
                        style={{ minWidth: "100px" }}
                    >
                        {LANGUAGES.map((language) => (
                            <li
                                key={language.value}
                                onClick={() => handleLanguageSelect(language)}
                                className="cursor-pointer px-4 py-2 hover:bg-dark-fill-2"
                            >
                                {language.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="flex items-center m-2 gap-x-4">
                <button
                    className="preferenceBtn group"
                    onClick={() => setSettings({ ...settings, settingsModalIsOpen: true })}
                >
                    <div className="h-4 w-4 text-dark-gray-6 font-bold text-lg">
                        <AiOutlineSetting />
                    </div>
                </button>

                <button className="preferenceBtn group" onClick={handleFullScreen}>
                    <div className="h-4 w-4 text-dark-gray-6 font-bold text-lg">
                        {!isFullScreen ? <AiOutlineFullscreen /> : <AiOutlineFullscreenExit />}
                    </div>
                </button>
            </div>
        </div>
    {settings.settingsModalIsOpen && <SettingsModal settings={settings} setSettings={setSettings} />}
    </div>
    );
};

export default PreferenceNav;
