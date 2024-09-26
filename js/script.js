// User login and logout functionality
let userInfo = document.querySelector("#user_info");
let userD = document.querySelector("#user");
let links = document.querySelector("#links");

if (localStorage.getItem("username")) {
    links.remove();
    userD.innerHTML = localStorage.getItem("username");
}

let logOutBtn = document.querySelector("#logout");
logOutBtn.addEventListener("click", function () {
    localStorage.clear();
    setTimeout(() => {
        window.location = "login.html";
    }, 1500);
});
// Products data
let allProducts = document.querySelector(".products");
let products = [
    { id: 1, title: "shoe1", color: "gray", disc: "good classic", price: "130", imageUrl: "images/th (1).jpeg", select: false },
    { id: 2, title: "shoe2", color: "blue", disc: "good sports", price: "100", imageUrl: "images/th (2).jpeg", select: false },
    { id: 3, title: "shoe3", color: "gray", disc: "good classic", price: "90", imageUrl: "images/th (3).jpeg", select: false },
    { id: 4, title: "shoe4", color: "blue", disc: "good sports", price: "70", imageUrl: "images/th (4).jpeg", select: false },
    { id: 5, title: "shoe5", color: "green", disc: "good sports", price: "120", imageUrl: "images/th (5).jpeg", select: false },
    { id: 6, title: "shoe6", color: "white", disc: "good sports", price: "90", imageUrl: "images/th (6).jpeg", select: false },
    { id: 7, title: "shoe7", color: "blue", disc: "good sports", price: "80", imageUrl: "images/th (7).jpeg", select: false },
    { id: 8, title: "shoe8", color: "white", disc: "good sports", price: "60", imageUrl: "images/th.jpeg", select: false },
    { id: 9, title: "shoe9", color: "red", disc: "good sports", price: "100", imageUrl: "images/th.jpg", select: false },
];

function drawItems(items) {

    let y = items.map((item) => {
        return `
        <div class="product_item">
            <img class="product_item_img" src="${item.imageUrl}" alt="">
            <div class="product_item_desc">
                <span class="title">name: ${item.title}</span>
                <span class="color">color: ${item.color}</span>
                <span class="disc">disc: ${item.disc}</span>
                <span class="price">price: ${item.price}$</span>
            </div>
            <div class="product_item_action">
                <button class="add_to_cart" onClick="addToCart(${item.id})">Add</button>
                <i onClick="handleFavoriteClick(${item.id})" class="fas fa-heart loveCart" style="color: ${item.select ? 'red' : 'hsl(186, 8%, 76%)'};"></i>
            </div>
        </div>
        `;
    }).join(''); // .join('') is used to remove commas between items
    allProducts.innerHTML = y;



    // Add event listener to all heart icons after they are rendered


}

drawItems(products);


// Search functionality
let search = document.querySelector("#search");
let searchByName = document.querySelector("#search_by_name");

search.addEventListener("input", function () {
    let searchTerm = search.value.toLowerCase();
    filterProducts(searchTerm);
});

searchByName.addEventListener("input", function () {
    let searchTerm = searchByName.value.toLowerCase();
    filterProductsByName(searchTerm);
});

function filterProducts(searchTerm) {
    let filteredProducts = products.filter(product => {
        return product.title.toLowerCase().includes(searchTerm) || product.color.toLowerCase().includes(searchTerm) || product.disc.toLowerCase().includes(searchTerm);
    });
    drawItems(filteredProducts);
}

function filterProductsByName(searchTerm) {
    let filteredProducts = products.filter(product => {
        return product.title.toLowerCase().includes(searchTerm);
    });
    drawItems(filteredProducts);
}

// Cart functionality
let cartProductDiv = document.querySelector(".carts_products div");
let badge = document.querySelector(".badge");
let addedItem = localStorage.getItem("ProductsInCart") ? JSON.parse(localStorage.getItem("ProductsInCart")) : [];

// Update the cart display
function updateCartDisplay() {
    cartProductDiv.innerHTML = '';
    let itemCounts = {};
    addedItem.forEach(item => {
        if (itemCounts[item.id]) {
            itemCounts[item.id].count += 1;
        } else {
            itemCounts[item.id] = { ...item, count: 1 };
        }
    });

    Object.values(itemCounts).forEach(item => {
        cartProductDiv.innerHTML += `
            <pre style="font-size: 19px;">${item.title}   ${item.count}  <button style="border-style: none; background-color: #eaeaea; font-size: 19px; color: blue; cursor: pointer;" onclick="increaseCount(${item.id})">+</button> <button style="border-style: none; background-color: #eaeaea; font-size: 19px; color: blue; cursor: pointer;" onclick="decreaseCount(${item.id})">-</button></pre>`;
    });

    badge.style.display = "block";
    badge.innerHTML = addedItem.length;
}

updateCartDisplay();

if (localStorage.getItem("username")) {
    function addToCart(id) {
        let choosenItem = products.find((item) => item.id === id);
        addedItem = [...addedItem, choosenItem];
        localStorage.setItem("ProductsInCart", JSON.stringify(addedItem));
        updateCartDisplay();
    }
    function addTofav(id) {
        let choosenItem = products.find((item) => item.id === id);
        addedItem = [...addedItem, choosenItem];
        localStorage.setItem("ProductsInfav", JSON.stringify(addedItem));
        updateCartDisplay();
    }
    function handleFavoriteClick(id) {
        let item = products.find(product => product.id === id);
        if (item) {
            item.select = !item.select;
            drawItems(products);
            if (item.select) {
                addTofav(id);
            }
        }
    }

}
else {
    window.location = "login.html";
}

// Functions to increase and decrease count
function increaseCount(id) {
    let choosenItem = products.find((item) => item.id === id);
    addedItem = [...addedItem, choosenItem];
    localStorage.setItem("ProductsInCart", JSON.stringify(addedItem));
    updateCartDisplay();
    cartsProducts.style.display = "block"; // Keep the cart open
}

function decreaseCount(id) {
    let index = addedItem.findIndex(item => item.id === id);
    if (index !== -1) {
        addedItem.splice(index, 1);
        localStorage.setItem("ProductsInCart", JSON.stringify(addedItem));
        updateCartDisplay();
        cartsProducts.style.display = "block"; // Keep the cart open
    }
}

// Shopping cart toggle functionality
let shoppingCartIcon = document.querySelector(".shopping_cart");
let cartsProducts = document.querySelector(".carts_products");
shoppingCartIcon.addEventListener("click", opencart);

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

function opencart() {
    if (cartProductDiv.innerHTML != "") {
        if (cartsProducts.style.display == "block") {
            cartsProducts.style.display = "none";
        } else {
            cartsProducts.style.display = "block";
        }
    }
}
