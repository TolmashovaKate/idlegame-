import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from './Button';
import Rating from './rating';
import UpBut from './up';
import { Storage } from './name_storage';
import { UpTime } from './upgrade';

export default function Creeper() {
    const location = useLocation();
    const { firstName } = location.state || {};
    const [coin, setCoin] = useState(location.state?.coins || 0);
    const [crep, setCrep] = useState(location.state?.crep || 0);
    const [sword, setSword] = useState(location.state?.sword || 0);
    const [warrior, setWarrior] = useState(location.state?.warrior || 0);
    const [hair, setHair] = useState(location.state?.hair || 0);
    const [mine, setMine] = useState(location.state?.mine || 0);
    const [time, setTime] = useState(location.state?.time || 0);
    const [timeLeftCoins, setTimeLeftCoins] = useState(180000 - UpTime.time[time]); // 60 секунд в миллисекундах
    const [timeUpCoins, setTimeUpCoins] = useState(1000); // 5 секунд в миллисекундах

    const coinTimerRef = useRef<NodeJS.Timeout | null>(null); // Указываем тип
    const updateTimerRef = useRef<NodeJS.Timeout | null>(null); // Указываем тип

    useEffect(() => {
        if (!firstName) {
            console.error('Имя игрока не передано!');
            return;
        }
    }, [firstName]);

    useEffect(() => {
        coinTimerRef.current = setInterval(() => {
            // Обновление времени для монет
            setTimeLeftCoins((prevTime) => {
                if (prevTime <= 1000) {
                    // Используем функцию обратного вызова для получения актуального значения coin
                    setCoin((сoin) => сoin + UpTime.coin[time]); 

                    return (180000 - UpTime.time[time]); // Сбрасываем таймер
                }
                return prevTime - 1000; // Уменьшаем время на 1 секунду
            });
        }, 1000); 

        return () => {
            if (coinTimerRef.current) {
                clearInterval(coinTimerRef.current); 
            }
        };
    }, [time, setCoin]); 

    useEffect(() => {
        updateTimerRef.current = setInterval(() => {
            setTimeUpCoins((prevTime) => {
                if (prevTime <= 1000) {
                    Storage.updatePlayerCoins(firstName, coin);
                    return 1000; // Сбрасываем таймер
                }
                return prevTime - 1000; // Уменьшаем время на 1 секунду
            });
        }, 1000); 

        return () => {
            if (updateTimerRef.current) {
                clearInterval(updateTimerRef.current); 
            }
        };
    }, [coin]);

    return (
        <div>
            <Rating />
            <UpBut firstName={firstName}
                coin={coin} setCoin={setCoin}
                crep={crep} setCrep={setCrep}
                sword={sword} setSword={setSword}
                warrior={warrior} setWarrior={setWarrior}
                hair={hair} setHair={setHair}
                mine={mine} setMine={setMine}
                time={time} setTime={setTime} />
            <Button 
                coin={coin} setCoin={setCoin}
                hair={hair} crep={crep} 
                sword={sword} warrior={warrior} 
                mine={mine}/>
            <div id="floating1">
                <h5>Монеты будут получены через: {Math.ceil(timeLeftCoins / 1000)}</h5>
            </div>
        </div>
    );
}
