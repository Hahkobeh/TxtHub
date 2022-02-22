import React , {useContext} from 'react';
import {Link } from 'react-router-dom';

import './Layout.scss';

import {UserContext} from '../UserContext';
import logo from '../images/logo.svg';
import { AiFillPropertySafety } from 'react-icons/ai';
const Layout = (props) => {
    const {user, setUser} = useContext(UserContext);

    if(!user){
        return(

            
            <div className='header'>
                
                <nav className='navbar'>
                    <h1 className='nav'>TxtHub</h1>
                    <h1 className='nav game'>{props.Game}</h1>
                    
                    <ul >
                        <li className ='nav-item'>
                            <Link to ='/'>Games</Link>
                        </li>
                        <li className ='nav-item'>
                            <Link to ='/signup'>Sign up</Link>
                        </li>
                        <li className ='nav-item'>
                            <Link to ='/login'>Login</Link>
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
                            <Link to ='/'>Games</Link>
                        </li>
                        <li className ='nav-item'>
                            <Link to ='/scores'>Scores</Link>
                        </li>
                        <li className ='nav-item'>
                            <Link to ='/'>Logout</Link>
                        </li>
                    </ul>
    
                </nav>
               
            </div>
        )
    }
    

}

export default Layout;