const q = (el) => document.querySelector(el)
const qa = (el) => document.querySelectorAll(el)

let modalQt = 1

let menu = q(".menu")
menu.addEventListener("click", () => {
    let nav = q('nav')
    nav.style.display = 'block'
    menu.style.display = 'none'
})

let close = q(".close")
close.addEventListener("click", () => {
    let nav = q('nav')
    nav.style.display = 'none'
    menu.style.display = 'block'
})

q('.kitInfo--qtmais.p').addEventListener('click', () => {
    modalQt++
    q('.kitInfo--qt.p').innerHTML = modalQt
})
q('.kitInfo--qtmenos.p').addEventListener('click', () => {
    if(modalQt > 1){
        modalQt--
        q('.kitInfo--qt.p').innerHTML = modalQt
    }
})
qa('.kitInfo--size.p').forEach((size, sizeIndex) => {
    size.addEventListener('click', () => {
        q('.kitInfo--size.p.selected').classList.remove('selected')
        size.classList.add('selected')
    })
})