var bookMarkList = document.getElementById('bookmarkBox')
let bookmarkTemplate = document.getElementById('bookmarkBoxtemplate').content
let localBooks = []

if(window.localStorage.getItem('bookMark')){
    localBooks = JSON.parse(window.localStorage.getItem('bookMark'))
    renderBookmark(localBooks)
}

window.addEventListener('click', event => {
    let elem = event.target
    if(elem.dataset.task === 'bookmark') setBookmarks(elem)
    if(elem.dataset.task === 'delet') deletBook(elem)
})
function setBookmarks(elem){    
    let markBooks = {
        title:elem.closest('section').querySelector('.book__title').textContent,
        author:elem.closest('section').querySelector('.book__author').textContent
    }         
    renderBookmark([markBooks], elem)
}

function renderBookmark(Arr, elem = ''){
    let bookFragment = document.createDocumentFragment()
    Arr.forEach(item => {
        let cloneBook = document.importNode(bookmarkTemplate, true)
        
        let title = cloneBook.querySelector('.bookmarks__title')
        title.textContent = item.title
        
        let author = cloneBook.querySelector('.bookmarks__author')
        author.textContent = item.author
        bookFragment.appendChild(cloneBook)
    })

    if(elem){
        let includes = false        
        localBooks.forEach(item => {
            if(item.title === elem.closest('section').querySelector('.book__title').textContent){
                includes = true
            }
        })       
        if(includes === false){
            bookMarkList.appendChild(bookFragment)
            localBooks.push(Arr[0])
            window.localStorage.setItem('bookMark', JSON.stringify(localBooks))   
        }
    } else {
        bookMarkList.appendChild(bookFragment)
    }    
}

function deletBook(elem){
    elem.closest('.bookmark').remove()
    let titleOfBook = elem.closest('.bookmark').querySelector('.bookmark__title').textContent
    localBooks = localBooks.filter(item => {
        return item.title !== titleOfBook
    })
    console.log(localBooks);
    window.localStorage.setItem('bookMark', JSON.stringify(localBooks))
}
