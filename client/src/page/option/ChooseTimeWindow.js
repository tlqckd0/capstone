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
    .timeSelector {
        padding: 5px;
    }
`;
const ChooseTimeWindow = ({ handleTimeWindow }) => {
    return (
        <Styles>
            <FormControl
                class="timeSelector"
                margin="normal"
                component="fieldset"
            >
                <FormLabel component="legend">시간 옵션</FormLabel>
                <RadioGroup
                    aria-label="time-window"
                    defaultValue="24"
                    name="radio-buttons-group"
                    onChange={handleTimeWindow}
                >
                    <FormControlLabel
                        value="24"
                        control={<Radio />}
                        label="24 시간"
                    />
                    <FormControlLabel
                        value="8"
                        control={<Radio />}
                        label="8 시간"
                    />
                    <FormControlLabel
                        value="4"
                        control={<Radio />}
                        label="4 시간"
                    />
                </RadioGroup>
            </FormControl>
        </Styles>
    );
};

export default ChooseTimeWindow;
