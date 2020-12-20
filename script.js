let modalQt = 1;

const dqs = (el) => document.querySelector(el);
const dqa = (el) => document.querySelectorAll(el);

pizzaJson.map((item, index) => {
    let pizzaItem = dqs('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        madalQt = 1;

        dqs('.pizzaBig img').scr = pizzaJson[key].img;
        dqs('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        dqs('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        dqs('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        dqs('.pizzaInfo--size.selected').classList.remove('selected');
        dqa('.pizzaInfo--size').forEach((size, sizeIndex)=>{
            if (sizeIndex == 2) {
                size.classList.add('selected');
            }

            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];

        }); 

        dqs('.pizzaInfo--qt').innerHTML = modalQt;

        dqs('.pizzaWindowArea').style.opacity = 0;
        dqs('.pizzaWindowArea').style.display = 'flex';
        setTimeout(()=>{
            dqs('.pizzaWindowArea').style.opacity = 1;
        }, 200);
    });

    dqs('.pizza-area').append( pizzaItem );
});



function closeModal() {
    dqs('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        dqs('.pizzaWindowArea').style.display = 'none';
    }, 500);
}

dqa('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
});

dqs('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if (modalQt > 1) {
        modalQt--;
        dqs('.pizzaInfo--qt').innerHTML = modalQt;
    }
});
dqs('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQt++;
    dqs('.pizzaInfo--qt').innerHTML = modalQt;
});

dqa('.pizzaInfo--size').forEach((size, sizeIndex)=>{
    
    size.addEventListener('click', (e)=>{
        dqs('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });

}); 