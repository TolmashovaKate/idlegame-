export interface Player {
    name: string; // Имя игрока
    coins: number; // Количество монет
    upgrades: 
    {crep: number[],
    sword: number[],
    warrior: number[],
    mine: number[],
    time: number[],
    hair: number[]
    }; // Массив улучшений
}

export const Storage = {
    fetchPlayerData: (): Player[] => {
        const storedData = localStorage.getItem('players');
        return storedData ? JSON.parse(storedData) : [];
    },
    
    addPlayer: (newName: string): Promise<Player[]> => {
        return new Promise((resolve, reject) => {
            const storedData = Storage.fetchPlayerData();
            if (!newName || typeof newName !== 'string') {
                reject({ message: "Имя должно быть строкой!" });
                return;
            }
            if (storedData.some(player => player.name === newName)) {
                reject({ message: "Это имя уже занято!" }); // Отказ, если имя уже существует
            } else {
                const newPlayer: Player = { 
                    name: newName, 
                    coins: 0, 
                    upgrades: {
                    crep: [0],
                    sword: [0],
                    warrior: [0],
                    mine: [0],
                    time: [0],
                    hair: [0]
                }};
                const updatedData = [...storedData, newPlayer];
                localStorage.setItem('players', JSON.stringify(updatedData));
                resolve(updatedData); // Возвращаем обновленный список игроков
            }
        });
    },

    fetchPlayerByName: (name: string): Promise<Player> => {
        return new Promise((resolve, reject) => {
            const storedData = Storage.fetchPlayerData();
            const player = storedData.find(player => player.name && player.name.trim().toLowerCase() === name.trim().toLowerCase());
            if (!player) {
                reject({ message: "Игрок не найден!" }); // Отказ, если игрок не найден
            } else {
                resolve(player); // Возвращаем данные игрока
            }
        });
    },
    
    updatePlayerCoins: (name: string, newCoins: number): Promise<Player[]> => {
        return new Promise((resolve, reject) => {
            const storedData = Storage.fetchPlayerData();
            const playerIndex = storedData.findIndex(player => player.name === name);
            if (playerIndex === -1) {
                reject({ message: "Игрок не найден!" });
            } else {
                storedData[playerIndex].coins = newCoins;
                localStorage.setItem('players', JSON.stringify(storedData));
                resolve(storedData);
            }
        });
    },

    updatePlayerUpgrades: (name: string, upgradeType: keyof Player['upgrades'], upgrade: number): Promise<Player[]> => {
        return new Promise((resolve, reject) => {
            const storedData = Storage.fetchPlayerData();
            const playerIndex = storedData.findIndex(player => player.name === name);
            
            if (playerIndex === -1) {
                reject({ message: "Игрок не найден!" });
                return;
            }
    
            const upgradesArray = storedData[playerIndex].upgrades[upgradeType];
            if (!Array.isArray(upgradesArray)) {
                // Если это не массив, создаем новый массив
                storedData[playerIndex].upgrades[upgradeType] = [];
            }
    
            // Добавляем улучшение, если его нет в массиве
            if (!storedData[playerIndex].upgrades[upgradeType].includes(upgrade)) {
                storedData[playerIndex].upgrades[upgradeType].push(upgrade);
            }
            
            localStorage.setItem('players', JSON.stringify(storedData));
            resolve(storedData);
        });
    },
}