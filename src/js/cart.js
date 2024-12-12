
document.addEventListener("DOMContentLoaded", function() {
    renderCartItems();  
    updateCartIcon();  
});

function storeCartData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getCartData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

function updateCartIcon() {
    const cart = getCartData("cartItemsArray");
    const cartIcon = document.getElementById("cart-icon");

  
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

    if (itemCount > 0) {
        cartIcon.classList.add("filled");  
        cartIcon.setAttribute("data-count", itemCount);  
    } else {
        cartIcon.classList.remove("filled");  
        cartIcon.removeAttribute("data-count");  
    }
}

// --------------- CART BASKET ---------------------------// 

const shoppingCart = document.querySelector(".shopping-cart"); 
const totalSum = document.querySelector(".total-sum"); 

function renderCartItems() {
    const cart = getCartData("cartItemsArray"); 
    shoppingCart.textContent = "";
   

    if (cart.length === 0) {
        const emtyCartMessage = document.createElement("p");
        emtyCartMessage.textContent = "Your Cart is Empty"; 
        shoppingCart.appendChild(emtyCartMessage);
        totalSum.innerText = "0"; 
        return;
    }

    let total = 0; 

    cart.forEach((item) => {
        const itemContainer = document.createElement("div"); 
        itemContainer.classList.add("item-container"); 

        const itemImage = document.createElement("img");
        itemImage.classList.add("item-image");
        
        const matchingColor = window.items.find(product => product.name === item.name)
        ?.colors.find(color => color.color === item.color);

        if (matchingColor && matchingColor.imageUrl.length > 0) {
        itemImage.src = matchingColor.imageUrl[0];
        } 

        itemImage.alt = `${item.name} image`;
        itemContainer.appendChild(itemImage);

        const productName = document.createElement("h3");
        productName.textContent = item.name;
        itemContainer.appendChild(productName);

        const itemDetails = document.createElement("p");
        itemDetails.textContent = `Color: ${item.color}, Size: ${item.size}`;
        itemContainer.appendChild(itemDetails);

        const quantityInput = document.createElement("input");
        quantityInput.type = "number";  
        quantityInput.min = "1";  
        quantityInput.value = item.quantity;  
        quantityInput.classList.add("quantity-input");

        // *  Validating and Updating Cart Item Quantity

        quantityInput.addEventListener("input", () => {
            const newQuantity = parseInt(quantityInput.value, 10);
                if (isNaN(newQuantity) || newQuantity < 1) {
                        quantityInput.value = item.quantity;  
                        return;
                }
                updateCartItemQuantity(item.id, newQuantity); 
            });

            const price = document.createElement("p");
            price.textContent = `Pris: ${item.price * item.quantity} NOK`;
            itemContainer.appendChild(price);
    
        // * remove button 
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove Item";
        removeButton.classList.add("remove-button");
        removeButton.addEventListener("click", () => {
            removeFromCart(item.id); 
        });
        itemContainer.append( quantityInput, removeButton); 
        shoppingCart.appendChild(itemContainer);
        total += item.price * item.quantity; 
    });
    const totalSumElement = document.querySelector(".total-sum");
    totalSumElement.textContent = `Total: ${total} NOK`;

}

// * Cart Management Functions: Handling Item Quantity Updates and Removals

function updateCartItemQuantity(itemId, newQuantity) {
    const cart = getCartData("cartItemsArray");
    const itemIndex = cart.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
        cart[itemIndex].quantity = newQuantity;
        storeCartData("cartItemsArray", cart);
        renderCartItems();  
    }
}


function removeFromCart(itemId) {
    let cart = getCartData("cartItemsArray");
    cart = cart.filter(item => item.id !== itemId);

    storeCartData("cartItemsArray", cart);

    renderCartItems();  
    updateCartIcon();
}

// ---------------- CHECK OUT ----------------------//

const checkOutButton = document.querySelector(".checkout-button");

checkOutButton.addEventListener("click", () => {
    clearCart();  
    alert("Your cart is now empty!");
});

function clearCart() {
    localStorage.removeItem("cartItemsArray");
    
    renderCartItems();
    updateCartIcon();
}; 