import React, { useState } from "react";
import './Ui.css';
import open from '../assets/open.jpg';     
import closed from '../assets/closed.jpg'; 
import scissor from '../assets/scissor.jpg'; 

const Ui = () => {
    const [userChoice, setUserChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [playerScore, setPlayerScore] = useState(0);
    const [computerScore, setComputerScore] = useState(0);
    const [result, setResult] = useState("");

    const choices = [
        { name: "rock", img: closed },
        { name: "paper", img: open },
        { name: "scissor", img: scissor }
    ];

    const play = () => {
        if (userChoice === null) {
            alert("Select your choice!");
            return;
        }

        const randomChoice = choices[Math.floor(Math.random() * 3)].name;
        setComputerChoice(randomChoice);
        calculateWinner(userChoice, randomChoice);

        setTimeout(() => {
            setUserChoice(null);
            setComputerChoice(null);
            setResult("");
        }, 800);
    };

    const calculateWinner = (user, computer) => {
        if (user === computer) {
            setResult("It's a Draw!");
        } else if (
            (user === "rock" && computer === "scissor") ||
            (user === "paper" && computer === "rock") ||
            (user === "scissor" && computer === "paper")
        ) {
            setPlayerScore((prev) => prev + 1);
            setResult("You Win!");
        } else {
            setComputerScore((prev) => prev + 1);
            setResult("Computer Wins!");
        }
    };

    return (
        <>
            <div className="main">
                <div className="game-container">
                    <p>Rock Paper Scissor</p>

                    <div className="score-reset">
                        <div className="players">
                            <div><span>🚹 Player: {playerScore}</span></div>
                            <div><span>🤖 Computer: {computerScore}</span></div>
                            <button className="reset-btn" onClick={() => {
                            setPlayerScore(0);
                            setComputerScore(0);
                            setUserChoice(null);
                            setComputerChoice(null);
                            setResult("");
                        }}>
                            🔁 Reset
                        </button>
                        </div>  
                    </div>

                    <div className="card-container">
                        <div className="card">
                            {userChoice ? (
                                <img src={choices.find(c => c.name === userChoice).img} alt={userChoice} className="icon" />
                            ) : (
                                "Player"
                            )}
                        </div>
                        <h3>VS</h3>
                        <div className="card">
                            {computerChoice ? (
                                <img src={choices.find(c => c.name === computerChoice).img} alt={computerChoice} className="icon" />
                            ) : (
                                "Computer"
                            )}
                        </div>
                    </div>

                    <div className="actions-container">
                        <div className="actions">
                            {choices.map(choice => (
                                <img
                                    key={choice.name}
                                    src={choice.img}
                                    alt={choice.name}
                                    className={`icon ${userChoice === choice.name ? "selected" : ""}`}
                                    onClick={() => setUserChoice(choice.name)}
                                />
                            ))}
                        </div>
                        <div className="actions">
                            {choices.map(choice => (
                                <img
                                    key={choice.name + "-comp"}
                                    src={choice.img}
                                    alt={choice.name}
                                    className={`icon ${computerChoice === choice.name ? "selected" : "dimmed"}`}
                                />
                            ))}
                        </div>
                    </div>

                    <p className="result">{result}</p>

                    <input type="button" value="Play Around" className="button" onClick={play} />
                </div>
            </div>
        </>
    );
};

export default Ui;
