var overlayContainer = document.querySelector('.moreOverlay')
var cancelBtn = document.querySelector('#overlayCancelBtn')

cancelBtn.addEventListener('click', e=> {
    e.preventDefault()
    overlayContainer.classList.add('d-none')
})
window.addEventListener('click', event=> {  
    if(event.target.dataset.more==='moreInfo'){
        let clickedEl = event.target
        // let bookbyTitle = clickedEl.dataset.bookTitle
        let closest = clickedEl.closest('li')
        var bookName = closest.querySelector('.book__title').textContent
        overlayContainer.classList.remove('d-none')
    }
    getBooks().then(()=> {
        renderOverlayBook(bookName)
    })
    

})

async function getBooks() {
    response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInputEl.value}&startIndex=${(currentPage-1)*10}`)
    response = await response.json()
    allBooks = response.totalItems
    bookItem = response.items
    bookByTitle = response.items.volumeInfo

}


async function renderOverlayBook(bookByTitle){
        let booksData = response.items
        booksData.forEach(element=>{
            var overlayBook = document.querySelector('.overlay')
            // console.log(booksData.element.volumeInfo.title);
            if(element.volumeInfo.title===bookByTitle){
                if(element.volumeInfo.imageLinks){
                    // document.body.style.background= 'red'
                    let bookImgEl = overlayBook.querySelector('#overlayBook__img')
                    // bookImgEl.setAttribute('scr', `${element.volumeInfo.imageLinks.thumbnail}`)
                    bookImgEl.src= element.volumeInfo.imageLinks.thumbnail
                }else{
                    let bookImgEl = overlayBook.querySelector('.book__img')
                    bookImgEl.src= `https://media.springernature.com/w306/springer-static/cover-hires/book/978-3-540-77978-0`
                }
                if(element.volumeInfo.title){
                    let bookTitleEl = overlayBook.querySelector('.overlay__book__title')
                    bookTitleEl.textContent = element.volumeInfo.title
                }
                if(element.volumeInfo.authors.length=1){
                    let bookAuthorEl1 = overlayBook.querySelector('#author1')
                    bookAuthorEl1.textContent = element.volumeInfo.authors
                    let bookAuthorEl2 = overlayBook.querySelector('#author2')
                    bookAuthorEl2.classList.add('d-none')
                } else {
                    let bookAuthorEl1 = overlayBook.querySelector('#author1')
                    bookAuthorEl1.textContent = element.volumeInfo.authors[0]
                    let bookAuthorEl2 = overlayBook.querySelector('#author2')
                    bookAuthorEl2.textContent = element.volumeInfo.authors[1]
                }                
                            
                if(element.volumeInfo.publishedDate){
                    let bookPublishedEl = overlayBook.querySelector('#published')
                    bookPublishedEl.textContent = element.volumeInfo.publishedDate
                }
                if(element.volumeInfo.publishers){
                    let bookPublishersEl = overlayBook.querySelector('#publishers')
                    bookPublishersEl.textContent = element.volumeInfo.publisher
                }
                if(element.volumeInfo.description){
                    let bookDescEl = overlayBook.querySelector('#description')
                    bookDescEl.textContent = element.volumeInfo.description
                }
                if(element.volumeInfo.kind){
                    let bookCategoriesEl = overlayBook.querySelector('#categories')
                    bookCategoriesEl.textContent = element.volumeInfo.kind
                }
                if(element.volumeInfo.pageCount){
                    let bookpageCountEl = overlayBook.querySelector('#pageCount')
                    bookpageCountEl.textContent = element.volumeInfo.pageCount
                }
                overlayContainer.appendChild(overlayBook)                
            }
        })
}

