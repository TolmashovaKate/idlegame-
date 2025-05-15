import React, { useState } from "react";
import './style/btn.css'
import './style/menu.css'
import { UpC, UpHair, UpM, UpS, UpTime, UpWar } from "./upgrade";
import { Storage } from "./name_storage";

export default function UpBut({firstName, coin, setCoin, crep, setCrep, sword, setSword, warrior, setWarrior, hair, setHair, mine, setMine, time, setTime}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen((isOpen) => !isOpen);

    const upCrep = () => {
        if (coin >= UpC.amount[crep] && crep < 20)
        {setCoin(coin - UpC.amount[crep]);
            setCrep(crep + 1);    
            Storage.updatePlayerUpgrades(firstName, 'crep', crep+1);
        } else {
            alert('Не хватает монет');
        }
    }

    const upSword = () => {
        if (coin >= UpS.amount[sword] && sword < 20)
        {setCoin(coin - UpS.amount[sword]);
            setSword(sword + 1);   
            Storage.updatePlayerUpgrades(firstName, 'sword', sword+1);
        } else {
            alert('Не хватает монет');
        }
    }

    const upWarrior = () => {
        if (coin >= UpWar.amount[warrior] && warrior < 20)
        {setCoin(coin - UpWar.amount[warrior]);
            setWarrior(warrior + 1);     
            Storage.updatePlayerUpgrades(firstName, 'warrior', warrior+1); 
        } else {
            alert('Не хватает монет');
        }
    }

    const upHair = () => {
        if (coin >= UpHair.amount[hair] && hair < 4)
        {setCoin(coin - UpHair.amount[hair]);
            setHair(hair + 1);       
            Storage.updatePlayerUpgrades(firstName, 'hair', hair+1);
        } else {
            alert('Не хватает монет');
        }
    }

    const upMine = () => {
        if (coin >= UpM.amount[mine] && mine < 15)
        {setCoin(coin - UpM.amount[mine]);
            setMine(mine + 1);
            Storage.updatePlayerUpgrades(firstName, 'mine', mine+1);
        } else {
            alert('Не хватает монет');
        }
    }

    const upTime = () => {
        if (coin >= UpTime.amount[time] && time < 4)
        {setCoin(coin - UpTime.amount[time]);
            setTime(time + 1);      
            Storage.updatePlayerUpgrades(firstName, 'time', time+1); 
        } else {
            alert('Не хватает монет');
        }
    }

    return(
        <div>
        <button className="btn1" onClick={toggleMenu}>{isMenuOpen ? '' : 'Открыть меню улучшений'}</button>
          {isMenuOpen && (
            <div className={`menu1 ${isMenuOpen ? 'open' : ''}`}>
                <h4>Меню улучшений</h4>
                <div className='center'>
                    <ul className="ul">
                        <li><p className ="h7">Улучшить Криппера - {crep} ур.</p>
                        {crep < 20 ?(<button className={`btn`} onClick={upCrep}>
                        Стоимость: {UpC.amount[crep]} $
                        </button>):
                        (<p className="h8">МАКСИМАЛЬНЫЙ УРОВЕНЬ</p>)}</li>
                        <br/>
                        <li><p className ="h7">Улучшить меч - {sword} ур.</p>
                        {sword < 20 ?
                        (<button className={`btn ${!(coin >= UpS.amount[sword]) ? 'but' : ''}`} onClick={upSword}>
                        Стоимость: {UpS.amount[sword]} $
                        </button>):
                        (<p className="h8">МАКСИМАЛЬНЫЙ УРОВЕНЬ</p>)}</li>
                        <br/>
                        {sword > 10 && (
                            <>
                            <li><p className ="h7">Нанять воинов - {warrior} ур.</p>
                            {warrior < 20 ?(
                            <button className={`btn ${!(coin >= UpWar.amount[warrior]) ? 'but' : ''}`} onClick={upWarrior}>     
                            Стоимость: {UpWar.amount[warrior]} $
                            </button>):
                            (<p className="h8">МАКСИМАЛЬНЫЙ УРОВЕНЬ</p>)}</li>
                            <br/>
                            <li><p className ="h7">Улучшить воинов в шахтах - {mine} ур.</p>
                            {mine < 15 ?(
                            <button className={`btn ${!(coin >= UpM.amount[mine]) ? 'but' : ''}`} onClick={upMine}>
                            Стоимость: {UpM.amount[mine]} $
                            </button>):
                            (<p className="h8">МАКСИМАЛЬНЫЙ УРОВЕНЬ</p>)}</li>
                            <br/>
                                {coin >= UpHair.amount[hair] && (<li><p className ="h7">Исследовать шахту - {hair} ур.</p>
                                {hair < 4 ?(<button className={`btn ${!(coin >= UpTime.amount[hair]) ? 'but' : ''}`} onClick={upHair}>
                                Стоимость: {UpHair.amount[hair]} $</button>):
                                (<p className="h8">МАКСИМАЛЬНЫЙ УРОВЕНЬ</p>)}</li>)}
                            </>
                        )}
                        <li><p className ="h7">Тренировать воинов - {time} ур.</p>
                        {time < 5 ?(
                        <button className={`btn ${!(coin >= UpTime.amount[time]) ? 'but' : ''}`} onClick={upTime}>
                        Стоимость: {UpTime.amount[time]} $
                        </button>):
                        (<p className="h8">МАКСИМАЛЬНЫЙ УРОВЕНЬ</p>)}</li>
                        <br/>
                        <br/>
                        <br/>
                        <li><button className='btn2' onClick={() => {setIsMenuOpen(false), toggleMenu}}>Закрыть меню</button></li>
                    </ul>
                </div>                
            </div>)}
        </div>
    )
}