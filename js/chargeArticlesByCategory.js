document.addEventListener('DOMContentLoaded', () => {

    let navPageIndex = document.querySelectorAll('header nav ul li a')
    let articlesContainer = document.querySelector("body main > ul")


    let displayArticles = (articleContainer, data, category) => {
        dataLength = data.length
        for (let i = 0; i < data.length; i++) {
            if (data[i].category == category) {
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
    }

    let chargeArticlesByCategory = (category) => {
        let httpRequest = new XMLHttpRequest()
        httpRequest.open('GET', 'index.html', true)
        let showArticles = fetch("./articles.json")
            .then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        displayArticles(articlesContainer, data.articles, category)
                    })
                } else {
                    console.log("Error")
                }
                httpRequest.send(showArticles)
            })
    }


    navPageIndex[0].addEventListener('click', () => {
        articlesContainer.innerHTML = ""
        chargeArticlesByCategory("health")
    })

    navPageIndex[1].addEventListener('click', () => {
        articlesContainer.innerHTML = ""
        chargeArticlesByCategory("diet")
    })
    navPageIndex[2].addEventListener('click', () => {
        articlesContainer.innerHTML = ""
        chargeArticlesByCategory("food")
    })
})
