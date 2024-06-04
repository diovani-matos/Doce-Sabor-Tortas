const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");

let cart = [];

// função para abrir o modal ao clicar no botao do carrinho

cartBtn.addEventListener("click", function () {
  updateCartModal();
  cartModal.style.display = "flex";
});

// fechar o modal ao clicar fora dele

cartModal.addEventListener("click", function (event) {
  if (event.target === cartModal) {
    cartModal.style.display = "none";
  }
});

// fechar o modal clicando no botao fechar

closeModalBtn.addEventListener("click", function () {
  cartModal.style.display = "none";
});

menu.addEventListener("click", function (event) {
  let parentButton = event.target.closest(".add-to-cart-btn");

  if (parentButton) {
    const name = parentButton.getAttribute("data-name");
    const price = parseFloat(parentButton.getAttribute("data-price"));

    addToCart(name, price);
  }
});

// função para add no carrinho

function addToCart(name, price) {
  const hasItem = cart.find((item) => item.name === name);

  if (hasItem) {
    hasItem.quantity += 1;
    Toastify({
      text: "Item adicionado ao carrinho!",
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "#6FC408",
      },
    }).showToast();
  } else {
    cart.push({
      name,
      price,
      quantity: 1,
    });
    Toastify({
      text: "Item adicionado ao carrinho!",
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "#6FC408",
      },
    }).showToast();
  }

  updateCartModal();
}

//atualizar o carrinho

function updateCartModal() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add(
      //   "flex",
      //   "justify-between",
      "mb-4"
      //   "flex-col"
    );

    cartItemElement.innerHTML = `
            <div class="flex items-center justify-between border-slate-400 border-2 p-2 rounded">
                <div>
                    <p class="font-bold">${item.name}</p>
                    <p>Qtd: ${item.quantity}</p>
                    <p class="font-bold mt-2">R$ ${item.price.toFixed(2)}</p>
                </div>
            

                <button class="bg-red-500 text-white p-1 rounded remove-item-modal" data-name="${
                  item.name
                }"
                >
                    Remover
                </button>
            </div>
        `;

    total += item.price * item.quantity;

    cartItemsContainer.appendChild(cartItemElement);
  });

  cartTotal.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  cartCounter.innerHTML = cart.length;
}

// função para remover item do carrinho

cartItemsContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-item-modal")) {
    const name = event.target.getAttribute("data-name");
    Toastify({
      text: "Removido do carrinho",
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "#ef4444",
      },
    }).showToast();

    removeItemCart(name);
  }
});

function removeItemCart(name) {
  const index = cart.findIndex((item) => item.name === name);

  if (index !== -1) {
    const item = cart[index];

    if (item.quantity > 1) {
      item.quantity -= 1;
      updateCartModal();
      return;
    }

    cart.splice(index, 1);
    updateCartModal();
  }
}

addressInput.addEventListener("input", function (event) {
  let inputValue = event.target.value;

  if (inputValue !== "") {
    addressInput.classList.remove("border-red-500");
    addressWarn.classList.add("hidden");
  }
});

checkoutBtn.addEventListener("click", function () {
  const isOpen = checkOpen();
  if (!isOpen) {
    Toastify({
      text: "Desculpe, mas estamos fechado!",
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "#ef4444",
      },
    }).showToast();
    return;
  }

  if (cart.length === 0) return;
  if (addressInput.value === "") {
    addressWarn.classList.remove("hidden");
    addressInput.classList.add("border-red-500");
    return;
  }

  //enviar pedido via api wpp

  const cartItems = cart
    .map((item) => {
      return ` ${item.name} Quantidade: (${item.quantity}) Preço: R$${item.price} |`;
    })
    .join("");

  const message = encodeURIComponent(cartItems);
  const phone = "+5551994477827"; // telefone do restaurante

  window.open(
    `https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`,
    "_blank"
  );

  cart = [];
  updateCartModal();
});

// verificar restaurante aberto

function checkOpen() {
  const data = new Date();
  const hora = data.getHours();
  return hora >= 18 && hora < 23;
}

const spanItem = document.getElementById("date-span");
const isOpen = checkOpen();

if (isOpen) {
  spanItem.classList.remove("bg-red-500");
  spanItem.classList.add("bg-green-600");
} else {
  spanItem.classList.remove("bg-green-600");
  spanItem.classList.add("bg-red-500");
}
