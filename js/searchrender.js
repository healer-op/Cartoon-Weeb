function render(){

var term = document.getElementById('search').value;

fetch(`https://mapi.mrhealer.repl.co/tv/search/${term}`)
.then(response =>{
    if(!response.ok){
        throw Error("ERROR");
    }
    return response.json();})
.then(data => {
    
    document.getElementById('found').innerHTML = `${data.titles.length} Active Search Results Found on ${term}`;
    if(data.titles.length == 0){
        document.getElementById('found').innerHTML = `No Active Search Results Found on ${term}`;
    }
    document.getElementById('non').style.display ="block";
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
}