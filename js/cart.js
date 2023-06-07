//? ENTREGA FINAL
//! Ejecutando compra de productos

const paintCart = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
        <h1 class="modal-header-title">Carrito</h1>
    `;
    modalContainer.append(modalHeader);

    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "✕";
    modalbutton.className = "modal-header-button";

    modalbutton.addEventListener ("click", () => {
        modalContainer.style.display = "none";
    });

    modalHeader.append(modalbutton);

    //modal body
if (cart.length > 0) {
    cart.forEach((prod) => {
        let cartCont = document.createElement("div");
        cartCont.className = "modal-cont";
        cartCont.innerHTML = `
        <img src="${prod.img}">
        <h5>${prod.name}</h5>
        <p>S/${prod.price}</p>
        <span class="minus"> - </span>
        <p>Cantidad: ${prod.quantity}</p>
        <span class="plus"> + </span>
        <p>Total: S/${prod.quantity * prod.price}</p>
        <span class="delete-product bx bx-trash bx-tada-hover">  </span>
        `;

        modalContainer.append(cartCont);

        let minus = cartCont.querySelector(".minus");
        minus.addEventListener("click", () => {
            if(prod.quantity !== 1){
                prod.quantity--;
            };
            saveLocal();
            paintCart();
        });

        let plus = cartCont.querySelector(".plus");
        plus.addEventListener("click", () => {
            prod.quantity++
            saveLocal();
            paintCart();
        });

        let del = cartCont.querySelector (".delete-product");
        del.addEventListener("click", () => {
            Toastify({
                text: "Producto eliminado",
                duration: 3000,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #7b48db, #9f63ff)",
                    borderRadius: "8px",
                    textTransform: "uppercase",
                    fontSize: "0.8rem"
                },
                onClick: function(){} // Callback after click
            }).showToast();

            delProduct(prod.id);
        });
    });

    //modal footer
    const total = cart.reduce((acc, a) => acc + a.price * a.quantity, 0);

    const totalBuying = document.createElement("div");
    totalBuying.className = "total-content";
    totalBuying.innerHTML = `
    <p>Total a pagar: S/${total}</p>
    `;
    modalContainer.append(totalBuying);

    const eraseCart = document.createElement ("button");
    eraseCart.className = "erase-btn";
    eraseCart.innerText = `Vaciar carrito
    `;
    totalBuying.appendChild(eraseCart);

    eraseCart.addEventListener("click", () => {

        Swal.fire({
            title: '¿Estás seguro?',
            icon: 'question',
            html: `Se van a borrar ${cart.reduce((acc,a) => acc + a.quantity, 0)} productos`,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                cart = [];
                saveLocal();
                paintCart(); 
                cartCounter();
            }
        })
    });

}else{
    const modalText = document.createElement("h2");
    modalText.className = "modal-body";
    modalText.innerText = "Tu carrito está vacío ☹️ ";
    modalContainer.append(modalText);
}
};

seeCart.addEventListener("click", paintCart);

const delProduct = (id) => {
    const foundId = cart.find((element) => element.id === id);

    console.log (foundId);

    cart = cart.filter((cartId) => {
        return cartId !== foundId;
    });
    cartCounter();
    saveLocal();
    paintCart();
};

const cartCounter = () => {
    quantityCart.style.display = "block";
    const cartLength = cart.length;
    localStorage.setItem("cartLength", JSON.stringify(cartLength));
    quantityCart.innerText = JSON.parse(localStorage.getItem("cartLength"));
};
cartCounter();