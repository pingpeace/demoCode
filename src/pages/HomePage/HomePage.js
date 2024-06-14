import React, { useState } from 'react';

import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import './HomePage.css';

function Card({ id, onClick, isSelected, isFaded, children }) {
    return <div
        className={`card ${isSelected ? 'selected' : ''} ${isFaded ? 'faded' : ''}`}
        onClick={() => onClick(id)}
    >
        <svg viewBox='0 0 100 100' className='drawing'>
            <path d='M10 10 H 90 V 90 H 10 Z' />
        </svg>
        {children}
    </div>
}

function HomePage() {
    const navigator = useNavigate();
    const [selectCard, setSelectCard] = useState(null)

    const handleCardClick = (id) => {
        setSelectCard(selectCard === id ? null : id)
        setTimeout(() => {
            navigator('/next');
        }, 2000)
    }

    return (
        <div className='card-container'>
            <Grid container spacing={1}>
                {['one', 'two', 'three', 'four'].map((id) => (
                    <Grid key={id} item xs={6} sm={6} md={6}>
                        <Card
                            id={id}
                            onClick={handleCardClick}
                            isSelected={selectCard === id}
                            isFaded={selectCard !== null && selectCard !== id}
                        >
                            Card {id}
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default HomePage;
