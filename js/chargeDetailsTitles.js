document.addEventListener('DOMContentLoaded', () => {

    let articleListTitleByCategory = document.querySelectorAll('main details ul li section ul')

    let displayCategoryList = (articleListContainer, data, category) => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].category == category) {
                articleListContainer.innerHTML += `<li><a href="#article${data[i].id}">${data[i].title}</a></li>`
            }
        }
    }

    let chargeCategoryList = (category, rang) => {
        let httpRequest = new XMLHttpRequest()
        httpRequest.open('GET', 'index.html', true)
        let showArticles = fetch("./articles.json")
            .then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        displayCategoryList(articleListTitleByCategory[rang], data.articles, category)
                    })
                } else {
                    console.log("Error")
                }
                httpRequest.send(showArticles)
            })
    }

    chargeCategoryList("health", 0)
    chargeCategoryList("food", 1)
    chargeCategoryList("diet", 2)
})
