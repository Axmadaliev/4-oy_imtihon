var bookMarkList = document.getElementById('bookmarkBox')
let bookmarkTemplate = document.getElementById('bookmarkBoxtemplate').content
let PlayListBooks = []

if(window.localStorage.getItem('bookMark')){
    PlayListBooks = JSON.parse(window.localStorage.getItem('bookMark'))
    renderBookmark(PlayListBooks)
}

window.addEventListener('click', event => {
    let elem = event.target
    if(elem.dataset.add === 'bookmark') console.log(elem);
    if(elem.dataset.task === 'bookmark') setBookmarks(elem)
    if(elem.dataset.task === 'delete') deletBook(elem)
})
function setBookmarks(elem){    
    console.log(elem.closest('li').querySelector('.book__title'))
    console.log(elem.closest('li').querySelector('.book__author'))
    let likeBooks = {
        title:elem.closest('li').querySelector('.book__title').textContent,       
        author:elem.closest('li').querySelector('.book__author').textContent
    }         
    renderBookmark([likeBooks], elem)
}

function renderBookmark(arr, elem = ''){
    let bookFragment = document.createDocumentFragment()
    arr.forEach(item => {
        let cloneBook = document.importNode(bookmarkTemplate, true)
        let title = cloneBook.querySelector('.bookmarks__title')
        title.textContent = item.title
                
        let author = cloneBook.querySelector('.bookmarks__author')
        author.textContent = item.author
        bookFragment.appendChild(cloneBook)
    })

    if(elem){
        let includes = false        
        PlayListBooks.forEach(item => {
            if(item.title === elem.closest('ul').querySelector('.book__title').textContent){
                includes = true
            }
        })       
        if(includes === false){
            bookMarkList.appendChild(bookFragment)
            PlayListBooks.push(arr[0])
            window.localStorage.setItem('bookMark', JSON.stringify(PlayListBooks))   
        }
    } else {
        bookMarkList.appendChild(bookFragment)
    }    
}

function deletBook(elem){
    elem.closest('li').remove()
    let bookTitle = elem.closest('li').querySelector('.bookmark__title').textContent
    PlayListBooks = PlayListBooks.filter(item => {
        return item.title !== bookTitle
    })
    console.log(PlayListBooks);
    window.localStorage.setItem('bookMark', JSON.stringify(PlayListBooks))
}
