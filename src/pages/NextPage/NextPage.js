import React, { useState, useEffect } from 'react';
import { TextField, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import './NextPage.css';

const CustomMenuItem = styled(MenuItem)(({ theme, selected }) => ({
    backgroundColor: selected ? theme.palette.action.selected : 'inherit',
    color: selected ? theme.palette.primary.main : 'inherit',
    '&.Mui-selected': {
        backgroundColor: theme.palette.action.selected,
        color: theme.palette.primary.main,
    },
    '&.Mui-selected:hover': {
        backgroundColor: theme.palette.action.selected,
        color: theme.palette.primary.main,
    },
}));

const DropdownTextField = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [displayedText, setDisplayedText] = useState('');
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const navigator = useNavigate();

    const options = ['選項一', '選項二', '選項三', '選項四'];

    useEffect(() => {
        let interval;
        if (selectedOption && currentCharIndex < selectedOption.length) {
            interval = setInterval(() => {
                setDisplayedText((prev) => prev + selectedOption[currentCharIndex]);
                setCurrentCharIndex((prev) => prev + 1);
            }, 500); // 每個字母出現的間隔時間
        }
        return () => clearInterval(interval);
    }, [selectedOption, currentCharIndex]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (option) => {
        setSelectedOption(option);
        setDisplayedText('');
        setCurrentCharIndex(0);

        setTimeout(() => {
            handleClose();
        }, 1000)
    };

    return (
        <div>
            <TextField
                className='textfield'
                value={displayedText}
                onClick={handleClick}
                variant="outlined"
                fullWidth
                placeholder="請選擇一個選項"
            />
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {options.map((option, index) => (
                    <CustomMenuItem
                        key={index}
                        selected={option === selectedOption}
                        onClick={() => handleMenuItemClick(option)}
                    >
                        {option}
                    </CustomMenuItem>
                ))}
            </Menu>

            <button onClick={() => navigator('/')}>Return Home</button>
        </div>
    );
};

export default DropdownTextField;