const cartBody = document.getElementById("cartItems");

const itemCount = document.getElementById("itemCount");

const subtotal = document.getElementById("subtotal");

const grandTotal = document.getElementById("grandTotal");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart(){

    localStorage.setItem("cart",JSON.stringify(cart));

}

function renderCart(){

    cartBody.innerHTML="";

    let total=0;

    let count=0;

    if(cart.length===0){

        cartBody.innerHTML=`
        <tr>
            <td colspan="5" style="text-align:center;padding:40px;">
                Your cart is empty.
            </td>
        </tr>
        `;

    }

    cart.forEach(item=>{

        let itemTotal=item.price*item.quantity;

        total+=itemTotal;

        count+=item.quantity;

        cartBody.innerHTML+=`

        <tr>

            <td>

                <div class="product-info">

                    <img src="${item.image}" alt="${item.name}">

                    <div>

                        <h3>${item.name}</h3>

                        <p>${item.brand}</p>

                    </div>

                </div>

            </td>

            <td>$${item.price}</td>

            <td>

                <div class="quantity-box">

                    <button onclick="decreaseQuantity(${item.id})">-</button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseQuantity(${item.id})">+</button>

                </div>

            </td>

            <td>$${itemTotal}</td>

            <td>

                <button class="remove-btn"
                onclick="removeItem(${item.id})">

                <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

    itemCount.textContent=count;

    subtotal.textContent="$"+total;

    grandTotal.textContent="$"+total;

}

function increaseQuantity(id){

    let item=cart.find(p=>p.id===id);

    item.quantity++;

    saveCart();

    renderCart();

}

function decreaseQuantity(id){

    let item=cart.find(p=>p.id===id);

    item.quantity--;

    if(item.quantity<=0){

        cart=cart.filter(p=>p.id!==id);

    }

    saveCart();

    renderCart();

}

function removeItem(id){

    cart=cart.filter(p=>p.id!==id);

    saveCart();

    renderCart();

}

document.getElementById("clearCartBtn").onclick=function(){

    if(confirm("Clear entire cart?")){

        cart=[];

        saveCart();

        renderCart();

    }

}

renderCart();