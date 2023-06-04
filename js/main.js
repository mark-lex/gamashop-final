//? ENTREGA FINAL

const shopContent = document.getElementById("shopContent");
const seeCart = document.getElementById("seeCart");
const modalContainer = document.getElementById("modalContainer");
const quantityCart = document.getElementById("quantityCart");

let cart = JSON.parse(localStorage.getItem("dataCart")) || [];

products.forEach((prod) => {
    let content = document.createElement("div")
    content.className = "gallery-products"
    content.innerHTML = `
    <img src="${prod.img}">
    <h4>${prod.name}</h4>
    <p class="price">S/${prod.price}</p>
    `;

    shopContent.append(content);

    let shop = document.createElement("button");
    shop.innerText = " Comprar ";
    shop.className = "shop-btn bx-cart"

    content.append(shop);

    shop.addEventListener("click", () => {
    const repeat = cart.some((repeatProduct) => repeatProduct.id === prod.id);

    if (repeat){
        cart.map ((product) => {
            if (product.id === prod.id){
                product.quantity++;
            }
        });
    } else{
        cart.push({
            id: prod.id,
            img: prod.img,
            name: prod.name,
            price: prod.price,
            quantity: prod.quantity,
        });
    }
        console.log(cart);
        cartCounter();
        saveLocal();
    });
});

//! Storage: almacenar datos
const saveLocal = () => {
    localStorage.setItem("dataCart", JSON.stringify(cart));
};