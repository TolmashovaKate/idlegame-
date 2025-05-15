import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./style/btn.css"
import './style/menu.css'

export default function Main() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); // Получаем текущий путь

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <div>
      {location.pathname !== "/" && (
      <div className='dropdown'>
        <p className='dropdbtn'><button className = "bon2"></button></p>
          <div className='dropdown-content'>
          <div className={`menu`}>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <h1>Меню</h1>
              <div className='center'>
                <Link to="/" onClick={toggleMenu}>
                  <button className='button1'>Главное меню</button>
                </Link>
              </div>
            <br/>
          </div>
        </div>
      </div>)}
    </div>
  );
}