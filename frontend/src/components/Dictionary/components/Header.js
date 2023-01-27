import { useContext, useState } from "react";
import noteContext from "../../../context/notes/noteContext"
import '../../tailwindCSS.css'

const Header = () => {
    const [wordValue, setWordValue] = useState("");
    const { dictionaryWord, setdictionaryWord } = useContext(noteContext);

    const handleInputChange = e => setWordValue(e.target.value);

    const handleSubmit = () => {
        setdictionaryWord(wordValue);
        setWordValue("");
    }

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            setdictionaryWord(wordValue);
            setWordValue("")
        }
    }

    return (
        <div className="bg-gray-700 my-4 border-spacing-2">
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold text-center text-white">Simple Dictionary</h1>
                <p className="text-center mt-1 mb-10 text-slate-300 text-lg">Find definisions for word</p>

                <div className="flex items-center justify-center mt-5">
                    <div className="flex border-2 border-gray-200 rounded">
                        <input className="px-4 py-2 md:w-80 text-gray-700" type="text" placeholder="Search..." onChange={handleInputChange} value={wordValue} onKeyDown={handleInputKeyDown} />
                        <button className="bg-[#28b485] border-l px-4 py-2 text-white" onClick={handleSubmit}>Search</button>
                    </div>
                </div>

                {dictionaryWord && (
                    <h3 className="text-gray-50 text-center mt-4">Result for: <span className="text-white font-bold">{dictionaryWord}</span></h3>
                )}
            </div>
        </div>
    );
};

export default Header;