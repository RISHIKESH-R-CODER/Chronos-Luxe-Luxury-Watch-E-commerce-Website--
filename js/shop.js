const container = document.getElementById("productContainer");

const searchInput = document.getElementById("searchInput");
const brandFilter = document.getElementById("brandFilter");
const categoryFilter = document.getElementById("categoryFilter");
const priceFilter = document.getElementById("priceFilter");
const sortProducts = document.getElementById("sortProducts");

let filteredProducts = [...products];


// ===========================
// RENDER PRODUCTS
// ===========================

function renderProducts(list) {

    container.innerHTML = "";

    if (list.length === 0) {
        container.innerHTML = "<p style='color:white'>No products found</p>";
        return;
    }

    list.forEach(product => {

        container.innerHTML += `

        <div class="product-card">

            <div class="product-click"
                 onclick="openProduct(${product.id})">

                <img src="${product.image}" alt="${product.name}">

                <h3>${product.name}</h3>

                <p>${product.brand}</p>

                <p class="price">$${product.price}</p>

            </div>

            <button onclick="addToCart(${product.id})">
                Add to Cart
            </button>

        </div>

        `;

    });

}

function openProduct(id){

    window.location.href = `product.html?id=${id}`;

}


// ===========================
// FILTER FUNCTION
// ===========================

function applyFilters() {

    let temp = [...products];

    // Search
    const searchValue = searchInput.value.toLowerCase();

    if (searchValue) {
        temp = temp.filter(p =>
            p.name.toLowerCase().includes(searchValue)
        );
    }

    // Brand filter
    if (brandFilter.value !== "all") {
        temp = temp.filter(p =>
            p.brand === brandFilter.value
        );
    }

    // Category filter
    if (categoryFilter.value !== "all") {
        temp = temp.filter(p =>
            p.category === categoryFilter.value
        );
    }

    // Price filter
    if (priceFilter.value !== "all") {
        temp = temp.filter(p =>
            p.price <= Number(priceFilter.value)
        );
    }

    // Sorting
    if (sortProducts.value === "low") {
        temp.sort((a, b) => a.price - b.price);
    }

    if (sortProducts.value === "high") {
        temp.sort((a, b) => b.price - a.price);
    }

    if (sortProducts.value === "name") {
        temp.sort((a, b) => a.name.localeCompare(b.name));
    }

    filteredProducts = temp;

    renderProducts(filteredProducts);
}


// ===========================
// EVENT LISTENERS
// ===========================

searchInput.addEventListener("input", applyFilters);
brandFilter.addEventListener("change", applyFilters);
categoryFilter.addEventListener("change", applyFilters);
priceFilter.addEventListener("change", applyFilters);
sortProducts.addEventListener("change", applyFilters);


// ===========================
// INITIAL LOAD
// ===========================

renderProducts(products);


// ===========================
// ADD TO CART (basic mock)
// ===========================

function addToCart(id) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existing = cart.find(item => item.id === id);

    if(existing){

        existing.quantity++;

    }else{

        let product = products.find(p => p.id === id);

        cart.push({
            ...product,
            quantity:1
        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product added to cart!");

}