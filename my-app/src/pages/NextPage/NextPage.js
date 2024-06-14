import React, { useState, useEffect } from 'react';
import { TextField, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import './NextPage.css';

const NextPage = () => {
    const navigator = useNavigate();
    const [selectedOption, setSelectedOption] = useState('');
    const [displayText, setDisplayText] = useState('');
    const [openPaper, setOpenPaper] = useState(false)

    const handleSelectChange = (event) => {
        const value = event.target.value;
        setSelectedOption(value);
        setDisplayText('');
        setTimeout(() => {
            setOpenPaper(false)
        }, 500)
    };

    useEffect(() => {
        if (selectedOption) {
            let currentIndex = 0;
            const interval = setInterval(() => {
                setDisplayText((prevText) => prevText + selectedOption[currentIndex]);
                currentIndex++;
                if (currentIndex === selectedOption.length) {
                    clearInterval(interval);
                }
            }, 1000); // 調整這個值以改變字母顯示速度

            return () => clearInterval(interval);
        }
    }, [selectedOption]);

    function handleClick() {
        setOpenPaper(true)
    }

    return (
        <div className="text-box-dropdown-container">
            <TextField
                id="outlined-basic"
                label="Enter text"
                variant="outlined"
                fullWidth
                onClick={() => handleClick()}
                value={displayText}
            />
            {openPaper && <Paper sx={{ width: '200px'}}>
                <div className="options-container">
                    {['Option 1', 'Option 2', 'Option 3', 'Option 4'].map((option, index) => (
                        <div
                            key={index}
                            className={`option ${selectedOption === option ? 'selected-option' : ''}`}
                            onClick={() => handleSelectChange({ target: { value: option } })}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            </Paper>}
            <button className='button' onClick={() => navigator('/')}>Return Home</button>
        </div>
    );
};

export default NextPage;