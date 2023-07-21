const API_KEY="c4151b2faa8a451386e8e9c4a6425725";
const url = "https://newsapi.org/v2/everything?q=";

//call fetch news function
window.addEventListener('load', () => fetchNews("India"));

function reload() {
    window.location.reload();
}
//FETCH QUERY FROM THE API 
async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    //convert data to json
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles){
    //get container to store data
    const cardContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    //empty the container before filling again 
    cardContainer.innerHTML = "";

    //run a loop for all fetched articles
    articles.forEach((article) => {
        //if the image is present then only show else not
        if(!article.urlToImage)
        return;

        //clone all the content of card
        const cardClone = newsCardTemplate.content.cloneNode(true);

        fillDataInCard(cardClone, article);
        //push all the created clones in the card container
        cardContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    //fill data in card clone
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    //convert date to readable format 
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });
    newsSource.innerHTML = `${article.source.name} · ${date}`;

    //on clicking a news it will take to the url
    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

//Navigation bar Click function

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    //remove active class from old nav item when new is clicked
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");// mark cur nav with active class
}

//select the item in search button
const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text')

//onclicking the button
searchButton.addEventListener("click", () => {
    const query = searchText.value;
    //if no query then return
    if (!query) return;

    // else fetch news related to this query
    fetchNews(query);

    //when a query is searched, remove the selected nav item
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});