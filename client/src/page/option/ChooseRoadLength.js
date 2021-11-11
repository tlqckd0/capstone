import React from 'react';
import {
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@material-ui/core';
import styled from 'styled-components';

const Styles = styled.div`
    .roadSelector {
        padding: 5px;
        display :inline-block;
    }
`;
const ChooseRoadLength = ({ handleRoadOption }) => {
    return (
        <Styles>
            <FormControl
                class="roadSelector"
                margin="normal"
                component="fieldset"
            >
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
                        label="도로 길이 포함"
                    />
                    <FormControlLabel
                        value="false"
                        disabled
                        control={<Radio />}
                        label="도로 길이 제외"
                    />
                </RadioGroup>
            </FormControl>
        </Styles>
    );
};

export default ChooseRoadLength;
