import React from 'react';
import ChooseRoadLength from './ChooseRoadLength';
import ChooseTimeWindow from './ChooseTimeWindow';

const OptionSelector = ({handleTimeWindow,handleRoadOption})=>{
    return(
        <div>
            <ChooseTimeWindow
                class="optionSelector"
                handleTimeWindow={handleTimeWindow}
            />
            <ChooseRoadLength
                class="optionSelector"
                handleRoadOption={handleRoadOption}
            />
        </div>
    )
}

export default OptionSelector;