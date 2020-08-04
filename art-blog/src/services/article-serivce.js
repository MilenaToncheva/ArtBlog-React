import getCookie from '../utils/getCookie.js';

const articleService = {
    loadAll: async function () {
        const promise=await fetch('http://localhost:9999/article/all', {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                'Authorization': getCookie('auth')
            }
        });
        const articles = await promise.json();
       
        return articles;
    },

    load: async function (id) {

        const promise = await fetch(`http://localhost:9999/article/${id}`);

        const article = promise.json();
        return article;

    },

    create: async function (data) {

        return await fetch('http://localhost:9999/article/create-article', {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'Authorization': getCookie('auth')
            },
            body: JSON.stringify(data)

        });
    }
}
export default articleService;