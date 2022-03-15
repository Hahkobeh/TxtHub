import React, {useContext} from 'react';
import Layout from '../components/Layout';
import {UserContext} from "../UserContext";

function ProfilePage(){
    const {user, setUser} = useContext(UserContext);

    return(
        <div>
            <h1>{user.username}</h1>
            <h1>{user.password}</h1>
            <h1>{user.id}</h1>

        </div>
    )
}

export default ProfilePage;