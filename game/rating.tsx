import React, { useEffect, useState } from 'react';
import { NodeGroup } from 'react-move';
import { Player, Storage } from './name_storage';

import './style/line.css'

export default function Rating() {
    const [topPlayers, setTopPlayers] = useState<Player[]>([]); // Инициализируем состояние

    useEffect(() => {
        const fetchAndUpdateTopPlayers = async () => {
            const playerData = Storage.fetchPlayerData(); // Получаем данные игроков
            const sortedPlayers = playerData.sort((a, b) => b.coins - a.coins); // Сортируем по количеству монет
            const topFivePlayers = sortedPlayers.slice(0, 5); // Берем топ-5 игроков
            setTopPlayers(topFivePlayers); // Обновляем состояние
        };

        fetchAndUpdateTopPlayers(); // Начальный вызов для получения данных

        const interval = setInterval(fetchAndUpdateTopPlayers, 1000); // Обновляем каждые 5 секунд

        return () => clearInterval(interval); // Очистка интервала при размонтировании компонента
    }, []);

    return (
        <div className='example-container'>
            <h6>Топ-5 Игроков</h6>
            <NodeGroup
                data={topPlayers}
                keyAccessor={player => player.name} // Уникальный ключ для каждого элемента
                start={() => ({
                    opacity: 0,
                    scale: 0.9,
                })}
                enter={() => ({
                    opacity: [1],
                    scale: [1],
                    timing: { duration: 300 },
                })}
                update={() => ({
                    opacity: [1],
                    scale: [1],
                    timing: { duration: 300 },
                })}
                leave={() => ({
                    opacity: [0],
                    scale: [0.9],
                    timing: { duration: 300 },
                })}
            >
                {(nodes) => (
                    <ul>
                        {nodes.map(({ key, data, state }) => (
                            <li key={key} style={{ opacity: state.opacity, transform: `scale(${state.scale})` }}>
                                {data.name}: {data.coins} $
                            </li>
                        ))}
                    </ul>
                )}
            </NodeGroup>
        </div>
    );
}