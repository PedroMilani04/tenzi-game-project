import React from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import './style.css';
import Confetti from 'react-confetti'

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)

        }
    }, [dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }

  
    function rollDice() {
        if (!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ?
                    die :
                    generateNewDie()
            }))
        } else {
            setTenzies(false)
            setDice(allNewDice)
        }
    }

    function reset() {
        setDice(allNewDice)
    }

    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ?
                { ...die, isHeld: !die.isHeld } :
                die
        }))
    }

    const diceElements = dice.map(die => (
        <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
        />
    ))

    

    return (
        <div className="content">
            <main>
                {tenzies && <Confetti width={"1920px"} height={"970px"}/>}
                <h1 className="title">Tenzi</h1>
                <p className="instructions">Roll until all dice are the same.
                    Click each dice to freeze the value.</p>
                <div className="dice-container">
                    {diceElements}
                </div>
                <div className="buttons">
                    <button
                        className="roll-dice"
                        onClick={rollDice}
                    >
                        {tenzies ? "New Game" : "Roll"}
                    </button>
                    <button onClick={reset} className={!tenzies ? "reset-dice" : "reset-dice-off"}>
                        Reset
                    </button>
                </div>
            </main>
        </div>
    )
}