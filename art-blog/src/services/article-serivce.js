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
        const article = await promise.json();
        return article;
    },

    loadMyArticles: async function () {
        const promise = await fetch('http://localhost:9999/article/my-articles', {
            method: "GET",
            headers: {
                'Authorization': getCookie('auth')
            }
        });
        const articles = await promise.json();
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
    },
    delete: async function (id) {

        return await fetch(`http://localhost:9999/article/delete-article/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': getCookie('auth')
            }
        });

    },
    edit: async function (id, data) {
        return await fetch(`http://localhost:9999/article/edit-article/${id}`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json',
                'Authorization': getCookie('auth')
            },
            body: JSON.stringify(data)
        });

    }
}
export default articleService;