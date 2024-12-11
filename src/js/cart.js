
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
const checkOutBotton = document.querySelector(".checkout-button");

function renderCartItems() {
    const cart = getCartData("cartItemsArray"); 
    shoppingCart.textContent = "";
   

    if (cart.lenght === 0) {
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
        
        // * display image [0] of choosen color
        if (item.colors && item.selectedColor) {
            // Safely find the selected color from item.colors array
            const selectedColor = item.colors.find(color => color.color === item.selectedColor);

            // If the selected color is found, set the image source, else fallback to default
            if (selectedColor) {
                itemImage.src = selectedColor.imageUrl[0];  // Use the first image URL for the selected color
            } else {
                // Fallback if the selectedColor is not found, use a default image or the first color
                itemImage.src = item.colors[0].imageUrl[0];
            }

            itemImage.alt = item.name;
        } else {
            // If colors or selectedColor are missing, use a default fallback image
            itemImage.src = 'default-image.jpg'; // Placeholder or fallback image
            itemImage.alt = item.name;
        }



        /* const selectedColor = item.colors.find(color => color.color === item.selectedColor); 
        itemImage.src = selectedColor.imageUrl[0];
        itemImage.alt = item.name; */
        itemContainer.appendChild(itemImage);

        const productName = document.createElement("h3");
        productName.textContent = item.name;
        itemContainer.appendChild(productName);

        const itemDetails = document.createElement("p");
        itemDetails.textContent = `Color: ${item.selectedColor || 'N/A'}, Size: ${item.size}`;
        /* itemDetails.textContent = `Color: ${item.color}, Size: ${item.size}`; */
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