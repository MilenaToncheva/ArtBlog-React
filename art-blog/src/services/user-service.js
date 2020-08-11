import getCookie from '../utils/getCookie.js';
const loadUserInfo = async (id) => {
    const promise = await fetch(`http://localhost:9999/user/${id}`, {
       headers: {
        'Authorization': getCookie('auth')
    }
    });
    const user=await promise.json();
    return user;
}

export default loadUserInfo;