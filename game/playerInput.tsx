import React from 'react';

export default function PlayerInput({ firstName, onChange, error, onNewGame, onBack }) {
    return (
        <div>
            <input
                className='center'
                placeholder="Введите имя игрока"
                value={firstName}
                onChange={onChange}
            />
            <br />
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Отображение ошибки */}
            <button onClick={onNewGame} className='bt2'>Начать игру</button>
            <button onClick={onBack} className='bt3'>Назад</button>
        </div>
    );
}