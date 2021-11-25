import "./hangmanStyle.css";
import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from "./components/Header";
import Figure from "./components/Figure";
import WrongLetters from "./components/WrongLetters";
import Word from "./components/Word";
import Popup from "./components/Popup";
import Notification from "./components/Notification";
import { checkWin, showNotification as show } from "./helpers/helpers";
import CustomToast from "./components/CustomToast";
import { today } from "../helper/dates";
import {
    projectFirestore,
    timestamp,
} from "../firebase/config";

toast.configure()
// const randomwords = require("random-words");
// const words = randomwords(20);
const words = ["bhavik", "bhavik", "bhavik", "bhavik", "bhavik"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

function HangmanHomePage() {
    const [playable, setPlayable] = useState(true);
    const [correctLetters, setCorrectLetters] = useState([]);
    const [wrongLetters, setWrongLetters] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const [score, setScore] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [hintCount, setHintCount] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const offlineStorage = projectFirestore.collection("transactions");
    const text = "Game Coupon"
    const date = today
    const amount = Math.floor(Math.random() * 10);
    const name = "Game Reward"

    useEffect(() => {
        const handleKeydown = (event) => {
            const { key, keyCode } = event;

            if (playable && keyCode >= 65 && keyCode <= 90) {
                const letter = key.toLowerCase();

                if (selectedWord.includes(letter)) {
                    if (!correctLetters.includes(letter)) {
                        setCorrectLetters((currentLetters) => [...currentLetters, letter]);
                    } else {
                        show(setShowNotification);
                    }
                } else {
                    if (!wrongLetters.includes(letter)) {
                        setWrongLetters((wrongLetters) => [...wrongLetters, letter]);
                    } else {
                        show(setShowNotification);
                    }
                }
            }
        };

        window.addEventListener("keydown", handleKeydown);
        return () => window.removeEventListener("keydown", handleKeydown);
    }, [correctLetters, wrongLetters, playable]);

    function playAgain() {
        setHighScore(highScore);
        if (checkWin(correctLetters, wrongLetters, selectedWord) === "win") {
            setScore(score + 1);
            if (score + 1 === 1 || (score + 1) % 2 !== 0) {
                setDisableButton(true);
            } else if ((score + 1) % 2 === 0) {
                setDisableButton(false);
                setHintCount(hintCount + 1);
            }
            if ((score + 1) % 5 === 0) {
                offlineStorage.add({
                    timestamp: timestamp(),
                    text,
                    name,
                    amount: +amount,
                    date,
                })

                return (
                    toast.success(
                        <CustomToast message={`Congratulations! You win ₹${amount}  🙂🙂`} />, {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 6000
                    })
                )
            }
        } else {
            if (score > localStorage.getItem("highScore")) {
                setHighScore(localStorage.setItem("highScore", score));
            }
            setScore(0);
            setHintCount(0);
        }

        // setHighScore(localStorage.setItem("highScore", score));
        // let Score = localStorage.setItem("Score", score);

        // let Score = localStorage.setItem("Score", score);
        // let highScore = 0;
        // if (highScore !== undefined) {
        //   localStorage.setItem("highScore", Score);
        //   if (Score > highScore) {
        //     localStorage.setItem("highScore", Score);
        //   } else {
        //     localStorage.setItem("highScore", highScore);
        //   }
        // }
        // localStorage.getItem("highScore", highScore);
        setPlayable(true);
        setShowHint(false);
        setCorrectLetters([]);
        setWrongLetters([]);
        const random = [Math.floor(Math.random() * words.length)];
        selectedWord = words[random];
    }
    function handleClick() {
        selectedWord.split("").map((letter, i) => {
            if (correctLetters.includes(letter)) {
                return null;
            } else {
                return setShowHint(letter[Math.floor(Math.random() * letter.length)]);
            }
        });
        setHintCount(hintCount - 1);
        setDisableButton(true);
    }
    const highScoreShow = localStorage.getItem("highScore");
    return (
        <div className="hangman-container">
            <Header />
            <div className="game-container">
                <Figure wrongLetters={wrongLetters} />

                <WrongLetters wrongLetters={wrongLetters} />
                <Word selectedWord={selectedWord} correctLetters={correctLetters} />

                <div className="hint-container">
                    <button
                        className="hint-btn"
                        onClick={() => handleClick()}
                        disabled={hintCount === 0}
                    >
                        Hint :{hintCount}
                    </button>
                    {showHint}
                </div>
            </div>
            <div className="score-container">
                <h1>HIGHSCORE:{highScoreShow}</h1>
            </div>
            <h1>SCORE:{score}</h1>
            <Popup
                correctLetters={correctLetters}
                wrongLetters={wrongLetters}
                selectedWord={selectedWord}
                setPlayable={setPlayable}
                playAgain={playAgain}
                score={score}
                setScore={setScore}
            />
            <Notification showNotification={showNotification} score={score} />
        </div>
    );
}

export default HangmanHomePage;