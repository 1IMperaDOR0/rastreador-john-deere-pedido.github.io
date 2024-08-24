const q = (el) => document.querySelector(el)
const qa = (el) => document.querySelectorAll(el)

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

let cart = []
let modalQt = 1

// Listagem dos kits
kitJson.map((item, index) => {
    let kitItem = q('.pedidos .pedido').cloneNode(true)

    kitItem.setAttribute('data-key', index)
    kitItem.querySelector('.kitImg img').src = item.img
    kitItem.querySelector('.kitName').innerHTML = item.name
    kitItem.querySelector('.kitDescription').innerHTML = item.description
    kitItem.querySelector('.kitTitle').innerHTML = item.title
    kitItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault()
        let key = e.target.closest('.pedido').getAttribute('data-key')
        modalQt = 1
        modalKey = key

        q('.kitInfo--qt').innerHTML = modalQt
        q('.kitBig img').src = kitJson[key].img
        q('.kitInfo h1').innerHTML = kitJson[key].name
        q('.kitInfo--desc').innerHTML = kitJson[key].description
        q('.kitInfo--size.selected').classList.remove('selected')
        qa('.kitInfo--size').forEach((size, sizeIndex) => {
            if(sizeIndex == 2){
                size.classList.add('selected')
            }
            size.querySelector('span').innerHTML = kitJson[key].sizes[sizeIndex]
        })
        

        q('.kitWindowArea').style.opacity = 0
        q('.kitWindowArea').style.display = 'flex'
        setTimeout(() => {
            q('.kitWindowArea').style.opacity = 1
        }, 200)
    })

    q('.kit-area').appendChild(kitItem)
})

// Eventos do Modal
function closeModal(){
    q('.kitWindowArea').style.opacity = 0
    setTimeout(() => {
        q('.kitWindowArea').style.display = 'none'
    }, 500)
}

qa('.kitInfo--cancelButton, .kitInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal)
})
q('.kitInfo--qtmais').addEventListener('click', () => {
    modalQt++
    q('.kitInfo--qt').innerHTML = modalQt
})
q('.kitInfo--qtmenos').addEventListener('click', () => {
    if(modalQt > 1){
        modalQt--
        q('.kitInfo--qt').innerHTML = modalQt
    }
})
qa('.kitInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', () => {
        q('.kitInfo--size.selected').classList.remove('selected')
        size.classList.add('selected')
    })
})
q('.kitInfo--addButton').addEventListener('click', () => {
    let size = parseInt(q('.kitInfo--size.selected').getAttribute('data-key'))

    let identifier = kitJson[modalKey].id+'@'+size

    let key = cart.findIndex((item) => item.identifier == identifier)

    if(key > -1){
        cart[key].qt += modalQt
    } else{ 
        cart.push({
            identifier,
            id:kitJson[modalKey].id,
            size,
            qt:modalQt
        })
    }
    updateCart()
    closeModal()
})

let closeCart = q(".closeCart")
closeCart.addEventListener("click", () => {
    let aside = q('aside')
    aside.style.display = 'none'
})

let kitAdd = qa(".kitAdd")
kitAdd.forEach((item) => {
    item.addEventListener("click", () => {
        let kitWindowArea = q(".kitWindowArea")
        kitWindowArea.style.display = "flex"
    })
})

let cancel = q(".kitInfo--cancelButton")
cancel.addEventListener("click", () => {
    let kitWindowArea = q(".kitWindowArea")
    kitWindowArea.style.display = "none"
})

function updateCart() {
    q('.menuOpenner span').innerHTML = cart.length

    if(cart.length > 0){

        q('.cart').innerHTML = ''

        q('.menuOpenner').addEventListener('click', () => {
            if(cart.length > 0){
                let aside = q('aside')
                aside.style.display = 'block'
            }
        })

        for(let i in cart){
            function kitSizeName(){
                if(cart[i].size == 0){
                    return 'P'
                } else if(cart[i].size == 1){
                    return 'M'
                } else{
                    return 'G'
                }
            }

            let kitItem = kitJson.find((item) => item.id == cart[i].id)
            let cartItem = q('.models .cart--item').cloneNode(true)
            let kitName = `${kitItem.name} (${kitSizeName()})`
            
            cartItem.querySelector('img').src = kitItem.img
            cartItem.querySelector('.cart--item-nome').innerHTML = kitName
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                cart[i].qt++
                updateCart()
            })
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if(cart[i].qt > 1){
                    cart[i].qt--
                } else{
                    cart.splice(i, 1)
                }
                updateCart()
            })

            q('.cart').append(cartItem)
        }

    } else{
        let aside = q('aside')
        aside.style.display = 'none'
    }
}