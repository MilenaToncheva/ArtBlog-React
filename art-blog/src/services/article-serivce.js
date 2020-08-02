const articleService={
    loadAll: function(){
        return fetch('http://localhost:9999/article/all')
        .then(res=>res.json())
        
    },
    load:function(id){
        return fetch(`http://localhost:9999/article/${id}`)
        .then(res=>res.json());
    }
    ,
    create:function(data){
        
        return fetch('http://localhost:9999/article/create',{
            method:"POST",
            headers: {
                'Content-type': 'application/json'
              },
              body: JSON.stringify(data),
              credentials: 'include'
            }).then(res => res.json());
       
    }

}
export default articleService;