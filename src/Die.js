import React from "react"
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Die(props) {
    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div 
            className="die-face" 
            style={styles}
            onClick={props.holdDice}
            data-aos="flip-left"
            data-aos-duration="1400"
        >
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}