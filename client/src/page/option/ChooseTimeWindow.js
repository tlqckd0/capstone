import React from 'react';
import {
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@material-ui/core';

const ChooseTimeWindow = ({ handleTimeWindow }) => {
    return (
        <FormControl
        style={{
           display:'inline-block'
       }} 
           class="timeSelector"
           margin="normal"
           component="fieldset"
       >
           <FormLabel component="legend">시간 옵션</FormLabel>
           <RadioGroup
               aria-label="time-window"
               defaultValue="12"
               name="radio-buttons-group"
               onChange={handleTimeWindow}
           >
               <FormControlLabel
                   value="12"
                   control={<Radio />}
                   label="12 시간"
               />
               <FormControlLabel
                   value="6"
                   control={<Radio />}
                   label="6 시간"
               />
           </RadioGroup>
       </FormControl>
    );
};

export default ChooseTimeWindow;
