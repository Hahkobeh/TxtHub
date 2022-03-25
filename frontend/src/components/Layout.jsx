import React , {useContext} from 'react';
import {Link } from 'react-router-dom';

import './Layout.scss';


import logo from '../images/logo.svg';
import { AiFillPropertySafety } from 'react-icons/ai';

const Layout = (props) => {
    function removeListener(){
        localStorage.removeItem('currentChallenge');
        document.removeEventListener('keydown');
    }

    function logout(){
        localStorage.clear();
    }


    if(!localStorage.getItem('username')){
        return(

            
            <div className='header'>
                
                <nav className='navbar'>
                    <h1 className='nav'>TxTHub</h1>
                    <h1 className='nav game'>{props.Game}</h1>
                    
                    <ul >
                        
                        <li className ='nav-item'>
                            <Link onClick={removeListener} to ='/'>Games</Link>
                        </li>

                        <li className='nav-item'>
                            <Link onClick={removeListener} to='/scoreboard'>Leader Board</Link>
                        </li>
                        
                        <li className ='nav-item'>
                            <Link onClick={removeListener} to ='/signup'>Sign up</Link>
                        </li>
                        <li className ='nav-item'>
                            <Link onClick={removeListener} to ='/login'>Login</Link>
                        </li>
                    </ul>
    
                </nav>
               
            </div>
        )
    }else{
        return(

            <div className='header'>
                <nav className='navbar'>
                    <img  className = 'logo'/>
                    <h1 className='nav'>TxTHub</h1>
                    <h1 className='nav game'>{props.Game}</h1>
                    
                    <ul >
                        <li className ='nav-item'>
                            <Link onClick={removeListener} to ='/'>Games</Link>
                        </li>

                        <li className='nav-item'>
                            <Link onClick={removeListener} to='/scoreboard'>Leader Board</Link>
                        </li>

                        <li className ='nav-item'>
                            <Link onClick={removeListener} to ='/challenges'>Challenges</Link>
                        </li>

                        <li className ='nav-item'>
                            <Link onClick={logout} to ='/'>Logout</Link>
                        </li>
                    </ul>
    
                </nav>
               
            </div>
        )
    }
    

}

export default Layout;