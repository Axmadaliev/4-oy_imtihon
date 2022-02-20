// var searchInputEl = document.getElementById('searchInput')
// async function getBooks() {
//     response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInputEl.value}&startIndex=${(currentPage-1)*10}`)
//     response = await response.json()
//     let booksData = response.items
//     allBooks = response.totalItems
//     return response
// }
window.addEventListener('click', event=>{
    let elem = event.target
    if(elem.dataset.search === 'search'){
        bookListEl.innerHTML = ''
        getBooks().then(()=>{
            try {
                if(!response){
                    errorSearch.textContent = 'Books are not founded, please try again'
                    bookListEl.classList.add('d-none')
                }bookListEl.classList.add('d-flex')
                renderBooks(bookListEl)
            } catch (error) {
                console.log(error.message);
            }
        })
    }
})
// if(!booksData){
//     errorSearch.textContent = 'Books are not founded, please try again'
//     node.classList.add('d-none')
// }node.classList.add('d-flex')
// searchInputEl.addEventListener('keyup', ()=> {
//     bookListEl.innerHTML = ''
//         getBooks().then(()=>{
//             try {
//                 renderBooks(bookListEl)
//             } catch (error) {
//                 console.log(error.message);
//             }
//         })
// })
