const authService = async (url, body, onSuccess, onFailure) => {
    try {
        const promise = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(promise);
        const authToken = promise.headers.get('Authorization');
        console.log('authToken',authToken);
        document.cookie = `auth=${authToken}`;
        const response = await promise.json();
        console.log('response',response);
        if (response.email && authToken) {
            onSuccess({
                email: response.email,
                id: response._id
            })
        } else {

            onFailure();

        }
    } catch (err) {
        onFailure(err);
    }
}



export default authenticate;