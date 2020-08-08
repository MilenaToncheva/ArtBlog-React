import getCookie from '../utils/getCookie.js';

const articleService = {
    loadAll: async function () {
        const promise = await fetch('http://localhost:9999/article/all', {
            method: "GET",
            headers: {
                'Authorization': getCookie('auth')
            }
        });
        const articles = await promise.json();

        return articles;
    },

    load: async function (id) {

        const promise = await fetch(`http://localhost:9999/article/details-article/${id}`, {
            method: "GET",
            headers: {
                'Authorization': getCookie('auth')
            }
        });

        const article = promise.json();
        console.log('Article', article);
        return article;

    },
    loadMyArticles: async function () {
        const promise = await fetch('http://localhost:9999/article/my-articles', {
            method: "GET",
            headers: {
                'Authorization': getCookie('auth')
            }});
            const articles=await promise.json();
          return articles;
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