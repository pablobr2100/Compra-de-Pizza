let cart = [];
let modalQt = 1;
let modalKey = 0;

const dqs = (el) => document.querySelector(el);
const dqa = (el) => document.querySelectorAll(el);

pizzaJson.map((item, index) => {
    let pizzaItem = dqs('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
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
        dqs('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        dqs('.pizzaInfo--size.selected').classList.remove('selected');
        dqa('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if (sizeIndex == 2) {
                size.classList.add('selected');
            }

            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];

        });

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

function updateCart() {
    if (cart.length > 0) {
        dqs('aside').classList.add('show');
        dqs('.cart').innerHTML = '';

        for (const i in cart) {
            let pizzaItem = pizzaJson.find((item)=>item.id == cart[i].id);
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
            let pizzaName = `${pizzaItem.name} (${pizzaSize})`;

            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;

            dqs('.cart').append(cartItem);
        }
    } else {
        dqs('aside').classList.remove('show');
    }
}