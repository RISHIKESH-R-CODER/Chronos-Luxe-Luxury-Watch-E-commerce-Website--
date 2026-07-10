function openProduct(id){

    window.location.href = `product.html?id=${id}`;

}

function addToCart(id){

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