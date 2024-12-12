// * Sign up Form - localStorage// 

const signUpForm = document.querySelector(".sign-up-form");
const emailInput = document.querySelector(".form__email"); 
const passwordInput = document.querySelector(".form__password");


const users = []; 

const storeData = (dataKey, dataValue) => {
    localStorage.setItem(dataKey, dataValue);
};

signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = {
        id: Date.now(),
        userEmail: emailInput.value,
        userPassword: passwordInput.value,
    };

    emailInput.value = "";
    passwordInput.value = ""; 
    
    users.push(user);
    storeData("usersArray", JSON.stringify(users));
    
    console.log(users);

    // * Pop up greeting
    const popup = document.createElement("div");
    popup.classList.add("popup-container");
    
    const greeting = document.createElement("p"); 
    greeting.innerText = `Welcome to the community!`; 
    
    const startShoppingButton = document.createElement("button");
    startShoppingButton.innerText = "Start Shopping";
    startShoppingButton.classList.add("popup-button");
    
    popup.append(greeting, startShoppingButton); 
    document.body.appendChild(popup); 
    
    startShoppingButton.addEventListener("click", () => {
        window.location.href = "product.html"; 
                
    });
      
});

const dataFromStorage = JSON.parse(localStorage.getItem("usersArray"));
console.log(dataFromStorage);

