import React from 'react';
import {
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@material-ui/core';

const ChooseRoadLength = ({ handleRoadOption }) => {
    return (
        <FormControl style={{
            display:'inline-block'
        }} class="roadSelector" margin="normal" component="fieldset">
            <FormLabel component="legend">도로 길이 옵션</FormLabel>
            <RadioGroup
                aria-label="road-length"
                defaultValue="true"
                name="radio-buttons-group"
                onChange={handleRoadOption}
            >
                <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="도로 정보 사용"
                />
                <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="구간 통계 사용"
                />
            </RadioGroup>
        </FormControl>
    );
};

export default ChooseRoadLength;
