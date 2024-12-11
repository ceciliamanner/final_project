const items = [
    {
        name: "Wunder Puff 600-Down-Fill-Jacket",
        price: 2980, 
        category: "Outwear", 
        colors: [
            { color:"brown", imageUrl: ["./assets/images/w-product1-brown.webp", "./assets/images/w-product2-brown2.webp" ]},
            { color:"green", imageUrl: ["./assets/images/w-product1-green.webp", "./assets/images/w-product1-green2.webp" ]},
        ],
        sizes:["S", "M", "L"],
        description: "This wonderfully warm down puffer has a cinchable waist and hem that lets you customize the shape and keep out cold drafts.",

    },
    {
        name: "lululemon Align™ Cami Dress",
        price: 1580, 
        category: "Dresses", 
        colors: [
            { color:"black", imageUrl: ["./assets/images/dress-black-1.webp", "./assets/images/dress-black-2.webp" ]},
            { color:"white", imageUrl: ["./assets/images/dresses-white-1.webp", "./assets/images/dress-white-2.webp" ]},
        ],
        sizes:["S", "M", "L"],
        description: "Get the buttery softness of lululemon Align™ in a dress. Powered by Nulu™ fabric and made with a built-in shorts liner, your poses and postures have never felt this free.", 
    },
    {
        name: "Oversized Pullover Wordmark",
        price: 1280, 
        category: "Sweaters", 
        colors: [
            { color:"black", imageUrl: ["./assets/images/sweater-black-1.webp", "./assets/images/sweater-black-2.webp" ]},
            { color:"mint green", imageUrl: ["./assets/images/sweater-green-1.webp", "./assets/images/sweater-green-2.webp" ]},
        ],
        sizes:["S", "M", "L"],
        description: "Serious about softness. This sweatshirt is all about fleecy fabric and pairs perfectly with our Scuba sweatpants.", 
    },
    {
        name: "Unisex Classic Ball Cap Wordmark",
        price: 380, 
        category: "Accessories", 
        colors: [
            { color:"brown", imageUrl: ["./assets/images/hat-brown-1.webp", "./assets/images/hat-brown-2.webp" ]},
            { color:"green", imageUrl: ["./assets/images/hat-green-1.webp", "./assets/images/hat-green-2.webp" ]},
        ],
        sizes:["One Size"],
        description: "Adjustable back closure tucks into a secret garage and helps you customize your fit", 
    },
];

// GET DOM ELEMENTS
const sortButtons = document.querySelectorAll(".sort-button");
const itemsCardContainer = document.querySelector(".items-container");

// GLOBAL VARIABLES
let selectedColor = null;
let selectedSize = null; 

// INITIAL RENDER
window.addEventListener("DOMContentLoaded", () => {
    renderItems(items); 
});

function selectColor(color) {
    selectedColor = color.color;
    console.log(selectedColor); //

    const productImage = document.querySelector(".product-image");
    productImage.src = color.imageUrl[0];
}

function selectSize(size) {
    selectedSize = size; 
    console.log(selectedSize); // 
}

//---------------------------- Product Display --------------------------// 

function renderItems (itemsArray) {
    itemsCardContainer.textContent = "";

    itemsArray.forEach(item => {
        // ITEM CARD
        const card = document.createElement("div"); 
        card.classList.add("product-card"); 

        const imageContainer = document.createElement("div"); 
        imageContainer.classList.add("image-container"); 

        const descriptionContainer = document.createElement("div"); 
        descriptionContainer.classList.add("description-container");
    
        const productName = document.createElement("h3");
        const productPrice = document.createElement("span");

        // SELECT COLOR
        const selectColorContainer = document.createElement("div"); 
        selectColorContainer.classList.add("color-select-container");

        item.colors.forEach(color => {
            const colorButton = document.createElement("button");
            colorButton.classList.add("color-button");
            colorButton.textContent = color.color; 
            colorButton.dataset.color = color.color;
            colorButton.addEventListener("click", () => selectColor(color));
            selectColorContainer.append(colorButton); 
        }); 


        // ONE IMAGE ON THE CARD ------* ? 
        const productImage = document.createElement("img"); 
        productImage.classList.add("product-image");
        const firstColor = item.colors[0]; 
        if (firstColor && firstColor.imageUrl.length > 0){
            productImage.src = firstColor.imageUrl[0]; 
            productImage.alt = `${item.name} image`;
            imageContainer.appendChild(productImage);
        }


        // SELECT SIZE
        const selectSizeContainer = document.createElement("div");
        selectSizeContainer.classList.add("size-select-container");

        item.sizes.forEach(size => {
            const sizeButton = document.createElement("button");
            sizeButton.classList.add("size-button");
            sizeButton.textContent = size;
            sizeButton.dataset.size = size; 
            sizeButton.addEventListener("click", () => selectSize(size));
            selectSizeContainer.append(sizeButton);
        }); 

        // ADD TO CART BUTTON 
        const addToCartButton = document.createElement("button"); 
        addToCartButton.classList.add("add-to-cart-button");
        addToCartButton.textContent = "Add to Cart";

        addToCartButton.addEventListener("click", () => {
            if (!selectedColor || !selectedSize){
                return;
            }

            const cartItem = {
                id: Date.now(), 
                name: item.name,
                price: item.price, 
                color: selectedColor, 
                size: selectedSize,
                quantity: 1, 
                imageUrl: item.imageUrl,
            };

            const cart = getCartData("cartItemsArray");
            const existingItemIndex = cart.findIndex(
                (cartItem) =>
                    cartItem.name === item.name &&
                    cartItem.color === selectedColor &&
                    cartItem.size === selectedSize
            );
            
            if (existingItemIndex > -1) {
                cart[existingItemIndex].quantity += 1; // Öka kvantiteten
            } else {
                cart.push(cartItem); // Lägg till som ny produkt
            }

            storeCartData("cartItemsArray", cart);
            updateCartIcon();

            alert(`${item.name} has been added to your cart.`);

        });
            
        itemsCardContainer.append(card); 

        card.append(
            imageContainer, 
            descriptionContainer, 
            addToCartButton,
        ); 
       
        descriptionContainer.append(
            productName,
            productPrice,
            selectColorContainer,
            selectSizeContainer,
        );
        const productDescription = document.createElement("p");
        productDescription.classList.add("product-description");
        productDescription.textContent = item.description;  
        descriptionContainer.appendChild(productDescription);    

        productName.textContent = item.name; 
        productPrice.textContent = `Price: ${item.price} NOK`;
       

    });
};


// SORTING FUNCTION
const sortItems = (event) => {
    let sortedItems = [...items]; 

    sortButtons.forEach((button) => {
        button.classList.remove("active");
    });

    const sortType = event.target.dataset.sort;
    

    if (sortType === "All") {
        sortedItems = [...items];  // Show all items
        event.target.classList.add("active");
    } else if (sortType === "Outwear" || sortType === "Dresses" || sortType === "Sweaters" || sortType === "Accessories") {
        // Filter by category
        sortedItems = sortedItems.filter(item => item.category === sortType);
        event.target.classList.add("active");
    } else if (sortType === "price-high") {
        // Sort by price (high to low)
        sortedItems = sortedItems.sort((a, b) => b.price - a.price);
        event.target.classList.add("active");
    } else if (sortType === "price-low") {
        // Sort by price (low to high)
        sortedItems = sortedItems.sort((a, b) => a.price - b.price);
        event.target.classList.add("active");
    }

    renderItems(sortedItems);  // Re-render the items based on the sorted array
};

// Add event listeners to the sort buttons
sortButtons.forEach((button) => {
    button.addEventListener("click", (e) => sortItems(e));
});