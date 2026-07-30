let cart = [];

function addToCart(productName) {
    cart.push(productName);

    document.getElementById("cart-count").innerText = cart.length;

    alert(productName + " added to cart!");
}
