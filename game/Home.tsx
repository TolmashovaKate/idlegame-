import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Storage, Player } from './name_storage';
import PlayerInput from './PlayerInput';

export default function Home() {
    const [firstName, setFirstName] = useState('');
    const [error, setError] = useState('');
    const [playerNames, setPlayerNames] = useState<string[]>([]);
    const [isGame, setIsGame] = useState(false);
    const [Game, setGame] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Загружаем имена из localStorage при монтировании компонента
        const storedPlayers: Player[] = Storage.fetchPlayerData();
        const names = storedPlayers.map(player => player.name); // Извлекаем только имена
        setPlayerNames(names);
        console.log('Current location is ', location);
    }, [location]);

    function handleFirstNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFirstName(e.target.value);
        setError(''); // Сбрасываем ошибку при изменении имени
    }

    function beginGame() {
        if (firstName.trim() === '') {
            setError('Имя не может быть пустым!'); // Уведомление об ошибке
            return;
        }

        if (!playerNames.includes(firstName)) {
            setError('Этого имени не существует! Пожалуйста, выберите другое.'); // Уведомление об ошибке
            return;
        }

        console.log(`Игра загружается`);
        setFirstName('');
        setIsGame(false);
        setGame(false);
        navigate('/loading', { state: { firstName } });
    }

    function NewGame()
    {
        if (firstName.trim() === '') {
            setError('Имя не может быть пустым!'); // Уведомление об ошибке
            return;
        }

        if (playerNames.includes(firstName)) {
            setError('Это имя уже занято! Пожалуйста, выберите другое.'); // Уведомление об ошибке
            return;
        }

        Storage.addPlayer(firstName) // Сохраняем обновленный массив в localStorage

        // Сбрасываем состояние ввода
        setFirstName('');
        setIsGame(false);
        setGame(true);
        navigate('/loading', { state: { firstName } });
    }

    return (
        <div className='center'>
            <br/>
            <h1>Добро пожаловать в игру!</h1> 
            {!isGame && (
                <>
                <button onClick={() => {
                        setIsGame(true);
                        setGame(false);
                        }}>Продолжить игру</button>
                <br/>
                <button onClick={() => {
                        setIsGame(true);
                        setGame(true);
                    }} className='bt'>Начать новую игру</button>
                </>
            )}
            <br/>
            {isGame && (
                 <PlayerInput 
                 firstName={firstName}
                 onChange={handleFirstNameChange}
                 error={error}
                 onNewGame={ Game ? NewGame : beginGame }
                 onBack={() => setIsGame(false)}
                />
            )}
            <Outlet />
        </div>
    );
}
