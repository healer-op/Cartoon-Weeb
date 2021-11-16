fetch('https://mapi.mrhealer.repl.co/tv')
.then(response =>{
    if(!response.ok){
        throw Error("ERROR");
    }
    return response.json();})
.then(data => {
    var dataf = data;
    // data.imgs.map((img, i) => `<a href="${data.links[i]}" etc`  )
    //  `<a href="${data.links[i]}" etc`  )
    var link = data.links
    for(var j=0;j<data.titles.length;j++){
        link[j] = btoa(link[j]);
    }
    const html = data.titles.map((img, i) =>{
        return `
                <div class="col-sm-6">
                    <div class="card text-white bg-dark mb-3">
                      <div class="card-body">
                        <h5 class="card-title">${data.titles[i]}</h5>
                        <p class="card-text">
                        Watch ${data.titles[i]} for free on cn.weeb.eu.org .
                        </p>
                        <a href="view.html?link=${link[i]}" class="btn btn-light">Watch Now</a>
                      </div>
                    </div>
                  </div>`;
    }).join('');
    document.querySelector("#row").insertAdjacentHTML("afterbegin", html);
})
//<img class="card-img-top" src="../bootstrap4/img_avatar1.png" alt="Card image" style="width:100%">