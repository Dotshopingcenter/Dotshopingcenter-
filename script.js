import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
    getFirestore,
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyD5F0neUZryQSzxO3o8XpNdnWpeDxwuImo",
    authDomain: "dot-shopping-center.firebaseapp.com",
    projectId: "dot-shopping-center",
    storageBucket: "dot-shopping-center.firebasestorage.app",
    messagingSenderId: "673341901162",
    appId: "1:673341901162:web:eab55a275f11015e1a7d13"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let cart = [];

function addToCart(productName) {
    cart.push(productName);

    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.innerText = cart.length;
    }

    alert(productName + " added to cart!");
}

function viewCart() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
    } else {
        alert("Items in cart:\n\n" + cart.join("\n"));
    }
}

async function loadProducts() {
    const container = document.getElementById("products-container");

    try {
        const snapshot = await getDocs(collection(db, "products"));

        container.innerHTML = "";

        snapshot.forEach((doc) => {
            const product = doc.data();

            const name = product.Name || product.name || "Unnamed Product";
            const price = product.Price || product.price || "0";
            const description =
                product.Description ||
                product.description ||
                "No description available.";

            container.innerHTML += `
                <div class="product">
                    <h3>${name}</h3>
                    <p><strong>Price:</strong> $${price}</p>
                    <p>${description}</p>
                    <button onclick="addToCart('${name}')">
                        🛒 Add to Cart
                    </button>
                </div>
            `;
        });

    } catch (error) {
        console.error("Error loading products:", error);
        container.innerHTML = "<p>Unable to load products.</p>";
    }
}

function searchProducts() {
    const searchText = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const products = document.querySelectorAll(".product");

    products.forEach((product) => {
        product.style.display =
            product.innerText.toLowerCase().includes(searchText)
                ? "block"
                : "none";
    });
}

window.addToCart = addToCart;
window.viewCart = viewCart;
window.searchProducts = searchProducts;

loadProducts();
