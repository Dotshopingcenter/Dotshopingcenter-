
let cart = 0;

function addToCart(productName) {
    cart++;
    document.getElementById("cart-count").innerText = cart;
    alert(productName + " added to cart!");
}
