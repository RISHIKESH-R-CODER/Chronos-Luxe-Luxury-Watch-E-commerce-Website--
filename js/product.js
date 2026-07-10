// ==============================
// GET PRODUCT ID FROM URL
// ==============================

const params = new URLSearchParams(window.location.search);

const productId = Number(params.get("id"));

const product = products.find(p => p.id === productId);

// ==============================
// PAGE ELEMENTS
// ==============================

const mainImage = document.getElementById("mainImage");
const thumbnailContainer = document.getElementById("thumbnailContainer");

const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productDescription = document.getElementById("productDescription");

const productBrand = document.getElementById("productBrand");
const productCategory = document.getElementById("productCategory");

const quantityInput = document.getElementById("quantity");

const plusBtn = document.getElementById("plusBtn");
const minusBtn = document.getElementById("minusBtn");

const addCartBtn = document.getElementById("addCart");

const relatedProducts = document.getElementById("relatedProducts");

// ==============================
// PRODUCT NOT FOUND
// ==============================

if (!product) {

    document.querySelector(".product-details").innerHTML = `
        <h2 style="text-align:center;color:white">
            Product not found.
        </h2>
    `;

    throw new Error("Invalid product id");

}

// ==============================
// LOAD PRODUCT
// ==============================

productName.textContent = product.name;

productPrice.textContent = "$" + product.price;

productBrand.textContent = product.brand;

productCategory.textContent = product.category;

productDescription.textContent =
    product.description ||
    "Experience luxury craftsmanship with premium materials, timeless elegance, and exceptional precision.";

// ==============================
// MAIN IMAGE
// ==============================

mainImage.src = product.image;

// ==============================
// THUMBNAILS
// ==============================

const images = product.images || [
    product.image,
    product.image,
    product.image,
    product.image
];

images.forEach((img, index) => {

    const image = document.createElement("img");

    image.src = img;

    if(index===0){

        image.classList.add("active");

    }

    image.onclick = function(){

        mainImage.src = img;

        document.querySelectorAll(".thumbnail-images img")
        .forEach(i=>i.classList.remove("active"));

        image.classList.add("active");

    };

    thumbnailContainer.appendChild(image);

});

// ==============================
// QUANTITY
// ==============================

plusBtn.onclick = () => {

    quantityInput.value++;

};

minusBtn.onclick = () => {

    if(quantityInput.value>1){

        quantityInput.value--;

    }

};

// ==============================
// ADD TO CART
// ==============================

addCartBtn.onclick = function(){

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    let existing =
        cart.find(item=>item.id===product.id);

    const qty = Number(quantityInput.value);

    if(existing){

        existing.quantity += qty;

    }else{

        cart.push({

            ...product,

            quantity: qty

        });

    }

    localStorage.setItem("cart",
        JSON.stringify(cart));

    alert("Added to Cart!");

};

// ==============================
// RELATED PRODUCTS
// ==============================

const related = products
.filter(p=>p.id!==product.id)
.slice(0,4);

related.forEach(item=>{

    relatedProducts.innerHTML += `

    <div class="product-card">

        <img src="${item.image}">

        <h3>${item.name}</h3>

        <p>${item.brand}</p>

        <h4>$${item.price}</h4>

        <button onclick="location.href='product.html?id=${item.id}'">

            View Details

        </button>

    </div>

    `;

});