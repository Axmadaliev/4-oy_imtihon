var searchInputEl = document.getElementById('searchInput')
var booklistTemplate = document.querySelector('.booklist-template').content
var bookListEl = document.querySelector('.book__list')
var pagination = document.querySelector('.pagination')
var showResult = document.querySelector('.amount__result')
var pageCount = document.querySelector('.pageCount')
var pagelinkPrev = document.querySelector('.pagePrev')
var pagelinkNext = document.querySelector('.pageNext')
var currentPage = 1
let response;
pagelinkPrev.textContent = '<'
var startIndex = 0

// pagination
window.addEventListener('click', (event)=>{
    var pageEl = event.target
    if(pageEl.dataset.task=="paginationbtnPrev"){

        if(currentPage>1){
            currentPage-=1
            getBooks().then(()=> {
                renderBooks(bookListEl)
            })
            renderPage()
            pageActive(pageEl)
        }
    }
    if(pageEl.dataset.task=="paginationbtnNext"){
        if(currentPage<Math.ceil(response.totalItems/10)){
            currentPage+=1
            getBooks().then(()=> {
                renderBooks(bookListEl)
            })
            renderPage()
        }
        if(currentPage == 1){
            pagelinkPrev.classList.add('disabled')
        }else{
            pagelinkPrev.classList.remove('disabled')
        }
    
        if(currentPage == Math.ceil(allBooks/10)){
            pagelinkNext.classList.add('disabled')
        }else{
            pagelinkNext.classList.remove('disabled')
        }
    }
    pageActive(pageEl)
    renderPage()

    
})


async function getBooks() {
    response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInputEl.value}&startIndex=${(currentPage-1)*10}`)
    response = await response.json()
    // let booksData = response.items
    allBooks = response.totalItems
    return response
}
var counter = 1
getBooks().then(()=> {
    renderBooks(bookListEl)
})
var errorSearch = document.querySelector('.error')
async function renderBooks(node){
        let booksData = response.items
        node.innerHTML = null      
        let bookListFragment = document.createDocumentFragment()
        if(!booksData){
            errorSearch.textContent = 'Books are not founded, please try again'
            node.classList.add('d-none')
        }node.classList.add('d-flex')
        booksData.forEach(element=>{
            let bookItemEl = document.importNode(booklistTemplate, true)
            if(element.volumeInfo.imageLinks){
                let bookImgEl = bookItemEl.querySelector('.book__img')
                // bookImgEl.setAttribute('scr', `${element.volumeInfo.imageLinks.thumbnail}`)
                bookImgEl.src= element.volumeInfo.imageLinks.thumbnail
            }else{
                let bookImgEl = bookItemEl.querySelector('.book__img')
                bookImgEl.src= `https://media.springernature.com/w306/springer-static/cover-hires/book/978-3-540-77978-0`
            }
            if(element.volumeInfo.title){
                let bookTitleEl = bookItemEl.querySelector('.book__title')
                bookTitleEl.textContent = element.volumeInfo.title
            }
            if(element.volumeInfo.authors){
                let bookAuthorEl = bookItemEl.querySelector('.book__author')
                bookAuthorEl.textContent = element.volumeInfo.authors
            }
            if(element.volumeInfo.publishedDate){
                let bookYearEl = bookItemEl.querySelector('.book__year')
                bookYearEl.textContent = element.volumeInfo.publishedDate
            }
            let filmBookMarkBtn = bookItemEl.querySelector('.bookmarkLink')
            filmBookMarkBtn.dataset.bookTitle = element.volumeInfo.title
            let filmMoreBtn = bookItemEl.querySelector('.moreInfoBtn')
            filmMoreBtn.dataset.bookTitle = element.volumeInfo.title
            bookListFragment.appendChild(bookItemEl)
        })
        
        // renderPagination(perPage)
        showResult.textContent = response.totalItems
        node.appendChild(bookListFragment)
        
        renderPage()
}


let pageDot = document.getElementById('pagedot')


let page1 = document.querySelector('.per_page1')
let page2 = document.querySelector('.per_page2')
let page3 = document.querySelector('.per_page3')
let page4 = document.querySelector('.per_page4')
function pageActive(count){
    var pagegeDiv=count.closest('ul')
    // var pageFocus = pagegeDiv.getElementsByClassName('page-link')
    // let pageFocus = pagination.querySelector('.page-link')
    // renderPage()
    // let items = pagination.getElementsByTagName('*')
    // console.log(items);
    // console.log(pagination.getElementsByTagName('*').length);
    if(count.textContent==currentPage){
        count.classList.add('page-focus')
    }else{
        count.classList.remove('page-focus')
    }
    // console.log(pageFocus.);
    // pageFocus.forEach(el=> {
    // console.log(el);

    //     // el.classList.remove('page-focus')
    //     if(el.textContent==currentPage){
    //         el.classList.add('page-focus')
    //     }else{
    //         el.classList.remove('page-focus')
    //     }
    // })

}
function renderPage(){
    response.totalItems
    if(currentPage == Math.ceil(allBooks/10)-5){
        pageDot.remove()
    }
    if(Math.ceil(allBooks/10) > 4){
        page1.textContent = currentPage
        page1.dataset.page = currentPage

        page2.textContent = Number(currentPage)+1
        page2.dataset.page = Number(currentPage)+1

        page3.textContent = Math.ceil(allBooks/10)-1
        page3.dataset.page = Math.ceil(allBooks/10)-1
        
        page4.textContent = Math.ceil(allBooks/10)
        page4.dataset.page = Math.ceil(allBooks/10)
    }
    
    
}

