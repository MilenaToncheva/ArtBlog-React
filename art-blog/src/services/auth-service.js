const authService = async (url, body, onSuccess, onFailure) => {
    try {
        const promise = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const authToken = promise.headers.get('Authorization');

        document.cookie = `auth=${authToken}`;
        console.log('Promise message get', promise.get(message));
        const response = await promise.json();
        console.log('response', response.message);

        if (response.email && authToken) {
            onSuccess({
                email: response.email,
                id: response._id
            })
        } else {

            const message = response.text();

            onFailure(message);

        }
    } catch (err) {

        onFailure(err);
    }
}

export default authenticate;