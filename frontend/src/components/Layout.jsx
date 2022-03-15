import React , {useContext} from 'react';
import {Link } from 'react-router-dom';

import './Layout.scss';

import {UserContext} from '../UserContext';
import logo from '../images/logo.svg';
import { AiFillPropertySafety } from 'react-icons/ai';
const Layout = (props) => {
    const {user, setUser} = useContext(UserContext);

    function removeListener(){
        document.removeEventListener('keydown');
    }
    if(!user){
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
                    
                    <ul >
                        <li className ='nav-item'>
                            <Link onClick={removeListener} to ='/'>Games</Link>
                        </li>

                        <li className='nav-item'>
                            <Link onClick={removeListener} to='/scoreboard'>Leader Board</Link>
                        </li>

                        <li className ='nav-item'>
                            <Link onClick={removeListener} to ='/'>Logout</Link>
                        </li>
                    </ul>
    
                </nav>
               
            </div>
        )
    }
    

}

export default Layout;