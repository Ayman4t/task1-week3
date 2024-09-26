// Get cart and favorite products from localStorage
let ProductsInCart = localStorage.getItem("ProductsInCart");
let ProductsInfav = localStorage.getItem("ProductsInfav");

let allProducts = document.querySelector(".products");
let favoriteones = document.querySelector(".favoriteones");
let totalPrice = document.querySelector(".totalPrice");

// If there are products in the cart, draw them
if (ProductsInCart) {
    let item = JSON.parse(ProductsInCart);
    drawCartProducts(item);
}

// If there are products in favorites, draw them
if (ProductsInfav) {
    let item = JSON.parse(ProductsInfav);
    drawFavProducts(item);
}

// Function to draw products in the cart
function drawCartProducts(products) {
    let sum = 0;

    // Count the occurrences of each product
    let itemCounts = {};
    products.forEach(item => {
        if (itemCounts[item.id]) {
            itemCounts[item.id].count += 1;
        } else {
            itemCounts[item.id] = { ...item, count: 1 };
        }
    });

    // Generate the HTML for each product
    let y = Object.values(itemCounts).map((item) => {
        return `
        <div class="product_item">
            <img class="product_item_img" src="${item.imageUrl}" alt="">
            <div class="product_item_desc">
                <span class="title">${item.title}</span>
                <span class="color">${item.color}</span>
                <span class="disc">disc: ${item.disc}</span>
                <span class="price">price: ${item.price}$</span>
                <span class="count">Count: ${item.count} 
                    <button class="adjust_count" onClick="increaseCount(${item.id})">+</button>
                    <button class="adjust_count" onClick="decreaseCount(${item.id})">-</button>
                </span>
            </div>
            <div class="product_item_action">
                <button class="remove_to_cart" onClick="removeFromCart(${item.id})">Remove</button>
            </div>
        </div>
        `;
    }).join('');

    // Insert the generated HTML into the container
    allProducts.innerHTML = y;

    // Calculate the total price
    Object.values(itemCounts).forEach(item => {
        let num = parseFloat(item.price) * item.count;
        sum += num;
    });

    if (sum === 0) {
        totalPrice.style.display = "none";
    } else {
        totalPrice.style.display = "block";
        totalPrice.innerHTML = `Total Price: $${sum.toFixed(2)}`;
    }
}

// Function to draw favorite products
function drawFavProducts(products) {
    let itemCounts = {};
    products.forEach(item => {
        if (itemCounts[item.id]) {
            itemCounts[item.id].count += 1;
        } else {
            itemCounts[item.id] = { ...item, count: 1 };
        }
    });

    // Generate the HTML for each product
    let y = Object.values(itemCounts).map((item) => {
        return `
        <div class="product_item">
            <img class="product_item_img" src="${item.imageUrl}" alt="">
            <div class="product_item_desc">
                <span class="title">${item.title}</span>
                <span class="color">${item.color}</span>
                <span class="disc">disc: ${item.disc}</span>
                <span class="price">price: ${item.price}$</span>
             
            </div>
            <div class="product_item_action">
                <button class="remove_to_cart" onClick="removeFromFav(${item.id})">Remove</button>
            </div>
        </div>
        `;
    }).join('');

    // Insert the generated HTML into the container
    favoriteones.innerHTML = y;
}

// Function to remove a product from the cart
function removeFromCart(id) {
    let products = localStorage.getItem("ProductsInCart");
    if (products) {
        let carts = JSON.parse(products);
        let index = carts.findIndex(item => item.id === id);
        if (index !== -1) {
            carts.splice(index, 1);
            localStorage.setItem("ProductsInCart", JSON.stringify(carts));
            drawCartProducts(carts);
        }
    }
}

// Function to remove a product from favorites
function removeFromFav(id) {
    let products = localStorage.getItem("ProductsInfav");
    if (products) {
        let favorites = JSON.parse(products);
        let index = favorites.findIndex(item => item.id === id);
        if (index !== -1) {
            favorites.splice(index, 1);
            localStorage.setItem("ProductsInfav", JSON.stringify(favorites));
            drawFavProducts(favorites);
        }
    }
}

// Function to increase the count of a product in the cart
function increaseCount(id) {
    let products = localStorage.getItem("ProductsInCart");
    if (products) {
        let carts = JSON.parse(products);
        let chosenItem = carts.find((item) => item.id === id);
        carts = [...carts, chosenItem];
        localStorage.setItem("ProductsInCart", JSON.stringify(carts));
        drawCartProducts(carts);
    }
}

// Function to decrease the count of a product in the cart
function decreaseCount(id) {
    let products = localStorage.getItem("ProductsInCart");
    if (products) {
        let carts = JSON.parse(products);
        let index = carts.findIndex(item => item.id === id);
        if (index !== -1) {
            carts.splice(index, 1);
            localStorage.setItem("ProductsInCart", JSON.stringify(carts));
            drawCartProducts(carts);
        }
    }
}

// Add event listeners to favorite heart icons
function addFavoriteEventListeners() {
    let loveCarts = document.querySelectorAll('.loveCart');
    loveCarts.forEach(loveCart => {
        loveCart.addEventListener('click', function() {
            let productID = parseInt(loveCart.dataset.id);
            let favoriteItems = localStorage.getItem("ProductsInfav") ? JSON.parse(localStorage.getItem("ProductsInfav")) : [];

            // Toggle favorite status
            let index = favoriteItems.findIndex(item => item.id === productID);
            if (index !== -1) {
                favoriteItems.splice(index, 1);
                loveCart.style.color = "black";
            } else {
                let product = products.find(item => item.id === productID);
                favoriteItems.push(product);
                loveCart.style.color = "red";
            }

            localStorage.setItem("ProductsInfav", JSON.stringify(favoriteItems));
            drawFavProducts(favoriteItems);
        });
    });
}

// Draw initial products and add favorite event listeners
drawItems(products);
addFavoriteEventListeners();

// Make functions globally accessible
window.removeFromCart = removeFromCart;
window.increaseCount = increaseCount;
window.decreaseCount = decreaseCount;
window.removeFromFav = removeFromFav;

// // Update the drawItems function to add dataset id to loveCart elements
// function drawItems(items) {
//     let y = items.map((item) => {
//         return `
//         <div class="product_item">
//             <img class="product_item_img" src="${item.imageUrl}" alt="">
//             <div class="product_item_desc">
//                 <span class="title">name: ${item.title}</span>
//                 <span class="color">color: ${item.color}</span>
//                 <span class="disc">disc: ${item.disc}</span>
//                 <span class="price">price: ${item.price}$</span>
//             </div>
//             <div class="product_item_action">
//                 <button class="add_to_cart" onClick="addToCart(${item.id})">Add</button>
//                 <i class="far fa-heart fav loveCart" data-id="${item.id}"></i>
//             </div>
//         </div>
//         `;
//     }).join(''); // .join('') is used to remove commas between items
//     allProducts.innerHTML = y;
    
// }
