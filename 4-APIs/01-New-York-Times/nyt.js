const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'; //1
const key = '1da469080194439f99af805fef7cfb43'; //2
let url; //3

//SEARCH FORM
const searchTerm = document.querySelector('.search');
const startDate = document.querySelector('.start-date');
const endDate = document.querySelector('.end-date');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');

//RESULTS NAVIGATION
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.prev');
const nav = document.querySelector('nav');

nav.style.display = 'none';
let pageNumber = 0;
console.log('PageNumber:', pageNumber);
let displayNav = false;

//RESULTS SECTION
const section = document.querySelector('section');

searchForm.addEventListener('submit', fetchResults);
nextBtn.addEventListener('click', nextPage);
previousBtn.addEventListener('click', previousPage);

function fetchResults(e) {
    e.preventDefault();
    console.log(e); 
    url = baseURL + '?api-key=' + key + '&page=' + pageNumber + '&q=' + searchTerm.value;
    console.log("URL:", url);
    if(startDate.value !== '') {
        console.log(startDate.value)
        url += '&begin_date=' + startDate.value;
    };

    if(endDate.value !== '') {
        url += '&end_date=' + endDate.value;
    };

    fetch(url)
    .then(function(result) {
        return result.json();
    }) .then(function(json) {
        displayResults(json);
    });
}

function displayResults(json) {
    let articles = json.response.docs;
    
    while(section.firstChild) {         //while is a loop     //firstChild is the first thing that shows up
        section.removeChild(section.firstChild);
    }
    let articles = json.response.docs;

        if(articles.length === 0) {
                console.log("No results");
        } else {
            for (let i = 0; i < articles.length; i++) {
                let article = document.createElement('article');
                let heading = document.createElement('h2');
                let link = document.createElement('a');
                let img = document.createElement('img');
                let para = document.createElement('p');            
                let clearfix = document.createElement('div');

                let current = articles[i];
                console.log("Current:", current);

                link.href = current.web_url;
                link.textContent = current.headline.main;

                para.textContent = 'Keywords: ';

                for(let j = 0; j < current.keywords.length; j++) {
                    let span = document.createElement('span');              //span is a tag  //span in HTML is good for puts keywords side by side
                    span.textContent += current.keywords[j].value + '';   
                    para.appendChild(span);
                }

                if(current.multimedia.length > 0) {
                    img.src = 'http://www.nytimes.com/' + current.multimedia[0].url;
                    img.alt = current.headline.main;
                }

                clearfix.setAttribute('class', 'clearfix');

                article.appendChild(heading);
                heading.appendChild(link);
                article.appendChild(img);
                article.appendChild(para);                
                article.appendChild(clearfix);
                section.appendChild(article);
            }
        }

        if(articles.length === 10) {
            nav.style.display = 'block'; // shows the nav display if 10 items are in the array
        } else {
            nav.style.display = 'none'; // hides the nav display if less than 10 items are in the array
        }
    
    //console.log("DisplayResults", json);
 //console.log(json.response.docs);
};


function nextPage(e) {
    pageNumber++;
    fetchResults(e);
    console.log("Page number:", pageNumber);
}

function previousPage(e) {
    if(pageNumber > 0) {
        pageNumber--;
    } else {
        return;
    }
    fetchResults(e);
    console.log("Page:", pageNumber);;
}
