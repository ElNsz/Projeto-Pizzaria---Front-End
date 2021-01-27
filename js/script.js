let cart = [];
let modalQt = 1;

const qs = (el) => document.querySelector(el);
const qsa = (el) => document.querySelectorAll(el);

// Lista das pizzas
pizzaJson.map((item, index) => {
    let pizzaItem = qs('.models .pizza-item').cloneNode(true); // Clonar a class models

    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`; // Coloca o preço fixando dois zeros depois da virgula em numeros inteiros
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name; // Colocar o nome da pizza
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description; // Colocar a descrição da pizza
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault(); // Tirar o evento de atualizar a pagina ao clicar no link
        let key = e.target.closest('.pizza-item').getAttribute('data-key'); // Identifica qual pizza eu cliquei
        modalQt = 1;
        modalKey = key;

        // Referente ao modal
        qs('.pizzaBig img').src = pizzaJson[key].img;
        qs('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        qs('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        qs('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        qs('.pizzaInfo--size.selected').classList.remove('selected');
        qsa('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if (sizeIndex == 2) {
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });

        qs('.pizzaInfo--qt').innerHTML = modalQt;

        qs('.pizzaWindowArea').style.opacity = 0;
        qs('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            qs('.pizzaWindowArea').style.opacity = 1;
        }, 200);

    })

    qs('.pizza-area').append(pizzaItem);
});

function closeModal() {
    qs('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
        qs('.pizzaWindowArea').style.display = 'none';
    }, 500)
}
qsa('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
})

qs('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if (modalQt > 1) {
        modalQt--;
        qs('.pizzaInfo--qt').innerHTML = modalQt;
    }
});
qs('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQt++;
    qs('.pizzaInfo--qt').innerHTML = modalQt;
});
qsa('.pizzaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', (e) => {
        qs('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});

qs('.pizzaInfo--addButton').addEventListener('click', () => {
    let size = parseInt(qs('.pizzaInfo--size.selected').getAttribute('data-key')); // Identifica o tamanho da pizza

    let identificador = pizzaJson[modalKey].id + '@' + size;

    let key = cart.findIndex((item) => item.identificador == identificador);

    if (key > -1) {
        cart[key].qt += modalQt;
    } else {
        cart.push({
            identificador,
            id: pizzaJson[modalKey].id,
            size,
            qt: modalQt
        });
    }
    closeModal();
});