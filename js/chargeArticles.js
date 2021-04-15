document.addEventListener('DOMContentLoaded', () => {

    let articlesContainer = document.querySelector("body main > ul")
    let details = document.querySelector('main details')

    let button = document.createElement('button')

    let articlesToDisplay = 3
    let articlesDisplayed = 0
    let dataLength

    button.classList.add('more-articles')
    button.appendChild(document.createTextNode("Charger plus d'articles"))
    document.querySelector('main').insertBefore(button, details)

    let displayArticles = (articleContainer, data) => {
        dataLength = data.length
        for (let i = articlesDisplayed; i < articlesToDisplay; i++) {
            articleContainer.innerHTML += `   
        <li>
            <img src="./asset/img/articles/${data[i].img}" alt="${data[i].title}">      
            <article id="article${data[i].id}">
                <h2>${data[i].title}</h2>
                <ul>
                    <li> <p>${data[i].content}</p></li>
                    <li>  <p>${data[i].date} - #${data[i].category}</p></li>
                </ul>  
            </article>
        </li>`
        }
    }

    let chargeArticle = () => {
        let httpRequest = new XMLHttpRequest()
        httpRequest.open('GET', 'index.html', true)

        let showArticles = fetch("./articles.json")
            .then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        displayArticles(articlesContainer, data.articles)
                    })
                } else {
                    console.log("Error")
                }
                httpRequest.send(showArticles)
            })
    }

    button.addEventListener('click', () => {
        if (button.className === "more-articles") {
            articlesDisplayed += 3
            articlesToDisplay += 3
            if (dataLength - 3 <= articlesDisplayed) {
                button.textContent = "Aucun article disponible"
                button.classList.remove("more-articles")
                chargeArticle()
            } else {
                chargeArticle()
            }
        }
    })


    chargeArticle()
})
