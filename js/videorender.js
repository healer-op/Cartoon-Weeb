const params = new URLSearchParams(document.location.search);
var name = params.get("link");

fetch(`https://mapi.mrhealer.repl.co/tv/video/${name}`)
.then(response =>{
    if(!response.ok){
        throw Error("ERROR");
    }
    return response.json();})
.then(data => {
  var player = new Playerjs({id:"player", autoplay:"1", file:data.link});
})


fetch(`https://mapi.mrhealer.repl.co/tv/${name}`)
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