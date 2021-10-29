import React,{useState} from "react";
import ChooseRoadLength from "./option/ChooseRoadLength";
import ChooseTimeWindow from "./option/ChooseTimeWindow";

const FrontPage = ()=>{
    const [timeWindow, setTimeWindow] = useState(24);
    const [lengthSelect, setLengthSelect] = useState("false")

    const handleTimeWindow = (e)=>{
        e.preventDefault();
        setTimeWindow(e.target.value);
        console.log(timeWindow);
    }

    const handleRoadSelect = (e)=>{
        e.preventDefault();
        setLengthSelect(e.target.value);
        console.log(lengthSelect);
    }

    const showResult = ()=>{
        return (
            <div>
                <span>{timeWindow}</span>
                <span>{lengthSelect}</span>
            </div>
            
        )
    }

    return (
        <div>
            <ChooseTimeWindow handleTimeWindow={handleTimeWindow}/>
            <ChooseRoadLength handleRoadSelect={handleRoadSelect}/>
            <hr/>
            {showResult()}
            <div>ㅇㅅㅇ</div>
        </div>
    )
}

export default FrontPage