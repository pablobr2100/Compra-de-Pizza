let cart = [];
let modalQt = 1;
let modalKey = 0;

const dqs = (el) => document.querySelector(el);
const dqa = (el) => document.querySelectorAll(el);

let sizeData = 2;

pizzaJson.map((item, index) => {
    let pizzaItem = dqs('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        madalQt = 1;
        modalKey = key;

        dqs('.pizzaBig img').scr = pizzaJson[key].img;
        dqs('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        dqs('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        dqs('.pizzaInfo--size.selected').classList.remove('selected');
        dqa('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if (sizeIndex == 2) {
                size.classList.add('selected');
            }

            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];

        });

        dqs('.pizzaInfo--actualPrice').innerHTML = `R$ ${item.price[sizeData].toFixed(2)}`;

        dqs('.pizzaInfo--qt').innerHTML = modalQt;

        dqs('.pizzaWindowArea').style.opacity = 0;
        dqs('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            dqs('.pizzaWindowArea').style.opacity = 1;
        }, 200);
    });

    dqs('.pizza-area').append(pizzaItem);
});



function closeModal() {
    dqs('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
        dqs('.pizzaWindowArea').style.display = 'none';
    }, 500);
    sizeData = 2;
    modalQt = 1;
}

dqa('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
});

dqs('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if (modalQt > 1) {
        modalQt--;
        dqs('.pizzaInfo--qt').innerHTML = modalQt;
    }
});
dqs('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQt++;
    dqs('.pizzaInfo--qt').innerHTML = modalQt;
});

dqa('.pizzaInfo--size').forEach((size, sizeIndex) => {

    size.addEventListener('click', (e) => {
        dqs('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
        sizeData = parseInt(dqs('.pizzaInfo--size.selected').getAttribute('data-key'));
        dqs('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[modalKey].price[sizeData].toFixed(2)}`;
    });

});


dqs('.pizzaInfo--addButton').addEventListener('click', () => {
    let size = parseInt(dqs('.pizzaInfo--size.selected').getAttribute('data-key'));

    let identifier = pizzaJson[modalKey].id + '@' + size;

    let key = cart.findIndex((item) => item.identifier == identifier);

    if (key > -1) {
        cart[key].qt += modalQt;
    } else {
        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,
            size,
            qt: modalQt
        });
    }
    updateCart();
    closeModal();
});

dqs('.menu-openner').addEventListener('click', ()=>{
    if (cart.length > 0) {
        dqs('aside').style.left = 0;
    }
});
dqs('.menu-closer').addEventListener('click', ()=>{
    dqs('aside').style.left = '100vw';
});

function updateCart() {
    dqs('.menu-openner span').innerHTML = cart.length;

    if (cart.length > 0) {
        dqs('aside').classList.add('show');
        dqs('.cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for (const i in cart) {
            let pizzaItem = pizzaJson.find((item)=>item.id == cart[i].id);
            let iSize = cart[i].size;
            subtotal += pizzaItem.price[iSize] * cart[i].qt;

            let cartItem = dqs('.models .cart--item').cloneNode(true);

            let pizzaSize;
            switch (cart[i].size) {
                case 0:
                    pizzaSize = 'P';
                    break;
                case 1:
                    pizzaSize = 'M';
                    break;
                case 2:
                    pizzaSize = 'G';
                    break;    
            }
            let pizzaName = `${pizzaItem.name} (${pizzaSize}) (R$ ${pizzaItem.price[iSize].toFixed(2)})`;

            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
                if (cart[i].qt > 1) {
                    cart[i].qt--;
                } else {
                    cart.splice(i, 1);
                }
                updateCart();
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                cart[i].qt++;
                updateCart();
            });

            dqs('.cart').append(cartItem);
        }

        desconto = subtotal * 0.1;
        total = subtotal - desconto;

        dqs('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        dqs('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        dqs('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

    } else {
        dqs('aside').classList.remove('show');
        dqs('aside').style.left = '100vw';
    }
}

dqs('.cart--finalizar').addEventListener('click', ()=>{
    alert('Compra Realizada com sucesso!');
    cart = [];
    updateCart();
});