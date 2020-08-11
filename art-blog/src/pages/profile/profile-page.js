import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../../components/core/page-layout/page-layout.js';
import Profile from '../../components/profile/profile.js';
import loadUserInfo from '../../services/user-service.js'
const ProfilePage = () => {
    const [user, setUser] = useState({});
    const params = useParams();
    const id = params.id;
        
    const loadInfo = async (id) => {
        const userDb = await loadUserInfo(id);
        setUser(userDb);
        
    }
    useEffect(() => {
        loadInfo(id);
        return () => { }
    }, [id])
    return (
        <PageLayout>
            <Profile authorName={user.authorName} cv={user.cv} avatar={user.avatar} email={user.email} />
        </PageLayout>
    );
}
export default ProfilePage;