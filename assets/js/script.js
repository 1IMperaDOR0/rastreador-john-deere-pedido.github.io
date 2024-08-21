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

let openCart = q(".menuOpenner")
openCart.addEventListener("click", () => {
    let aside = q('aside')
    aside.style.display = 'block'
})

let closeCart = q(".closeCart")
closeCart.addEventListener("click", () => {
    let aside = q('aside')
    aside.style.display = 'none'
})