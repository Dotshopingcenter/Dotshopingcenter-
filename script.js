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
let allProducts = [];

// Cart
window.addToCart = function(productName) {
    cart.push(productName);

    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.innerText = cart.length;
    }

    alert(productName + " added to cart!");
};

window.viewCart = function() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
    } else {
        alert("Items in cart:\n\n" + cart.join("\n"));
    }
};

// Load products from Firebase
async function loadProducts() {
    const container = document.getElementById("products-container");

    try {
        const snapshot = await getDocs(collection(db, "products"));

        allProducts = [];

        snapshot.forEach((doc) => {
            allProducts.push({
                id: doc.id,
                ...doc.data()
            });
        });

        displayProducts(allProducts);

    } catch (error) {
        console.error("Firebase error:", error);

        container.innerHTML =
            "<p>Unable to load products. Please try again later.</p>";
    }
}

// Display products
function displayProducts(products) {
    const container = document.getElementById("products-container");

    container.innerHTML = "";

    if (products.length === 0) {
        container.innerHTML = "<p>No products available.</p>";
        return;
    }

    products.forEach((product) => {

        const card = document.createElement("div");
        card.className = "product";

        const name = product.name || "Unnamed Product";
        const price = product.price || "0";
        const description =
            product.description || "No description available.";

        card.innerHTML = `
            <h3>${name}</h3>
            <p><strong>Price:</strong> $${price}</p>
            <p>${description}</p>

            <button onclick="addToCart('${name.replace(/'/g, "\\'")}')">
                🛒 Add to Cart
            </button>
        `;

        container.appendChild(card);
    });
}

// Search products
window.searchProducts = function() {

    const searchInput = document.getElementById("searchInput");

    const searchText =
        searchInput.value.toLowerCase().trim();

    const filteredProducts = allProducts.filter((product) => {

        const name =
            (product.name || "").toLowerCase();

        const description =
            (product.description || "").toLowerCase();

        return (
            name.includes(searchText) ||
            description.includes(searchText)
        );
    });

    displayProducts(filteredProducts);
};

// Start
loadProducts();
