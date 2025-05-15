import React, { useEffect, useState } from 'react';
import {useLocation, useNavigate } from 'react-router-dom';
import { Storage, Player } from './name_storage';

export default function Loading() {
    const [loading, setLoading] = useState(true);
    const [savedData, setSavedData] = useState<Player | null>(null); 
    const navigate = useNavigate();
    const location = useLocation();
    const { firstName } = location.state || {};

    useEffect(() => {
        if (!firstName) {
            console.error('Имя игрока не передано!');
            return;
        }

    }, [firstName]);


    useEffect(() => {
        const fetchPlayerData = async () => {
            try {
                const data: Player = await Storage.fetchPlayerByName(firstName);
                setSavedData(data);
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
                setSavedData(null); 
            } finally {
                setLoading(false); // Завершение загрузки
            }
        };

        fetchPlayerData();
    
    }, [firstName, navigate]);

    useEffect(() => {
        // Проверяем savedData после завершения загрузки
        if (!loading) {
            const timeoutDuration = 2000; // Задержка в 3 секунды
            if (savedData) {
                const { coins, upgrades } = savedData;

               // Проверяем наличие и тип данных в upgrades
                const getLastUpgradeValue = (upgradeArray: any[]) => Array.isArray(upgradeArray) && upgradeArray.length > 0 ? Number(upgradeArray[upgradeArray.length - 1]) : 0;
                setTimeout(() => {
                navigate('/creeper', { state: { 
                firstName,
                coins: Number(coins), 
                crep: getLastUpgradeValue(upgrades.crep),
                sword: getLastUpgradeValue(upgrades.sword),
                warrior: getLastUpgradeValue(upgrades.warrior),
                hair: getLastUpgradeValue(upgrades.hair),
                mine: getLastUpgradeValue(upgrades.mine),
                time: getLastUpgradeValue(upgrades.time)
               }}); // Переход на страницу Creeper
        }, timeoutDuration);
            } else {
                // Задержка перед навигацией на главную страницу
                setTimeout(() => {
                    navigate('/'); // Переход на страницу начала игры, если данных нет
                }, timeoutDuration);
            }
        }
    }, [loading, savedData, navigate]);

    return (
        <section>
            <div id="loader" className="loader">
                {loading ? (
                    <h3 className='center'>Загрузка. . .</h3>
                ) : savedData ? (
                    <div className='center'>
                        <h3>Загружаем последнее сохранение.</h3>
                        </div>
                ) : (
                    <h3 className='center'>Запускаем игру.</h3>
                )}
                <div className="spinner"></div>
            </div>
        </section>
    )
}
