const authenticate = async (url, body, onSuccess, onFailure) => {
    try {
        const promise = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const authToken = promise.headers.get('Authorization');
        //console.log('authToken',authToken);
        document.cookie = `auth=${authToken}`;
        const response = await promise.json();
       console.log('response',response.message);
       
        if (response.email && authToken) {
            onSuccess({
                email: response.email,
                id: response._id,
                authorName:response.authorName
            })
        } else {
const message=response.message;
console.log('I am in else');
            onFailure(message);

        }
    } catch (err) {
        console.log('I am in catch')
        console.log('Err',err)
        onFailure(err);
    }
}



export default authenticate;