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


/* CART */

window.addToCart = function(productName) {

    cart.push(productName);

    document.getElementById("cart-count").innerText =
        cart.length;

    alert(productName + " added to cart!");
};


window.viewCart = function() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

    } else {

        alert(
            "Items in cart:\n\n" +
            cart.join("\n")
        );

    }

};


/* LOAD PRODUCTS */

async function loadProducts() {

    const container =
        document.getElementById("products-container");

    try {

        const snapshot =
            await getDocs(
                collection(db, "products")
            );


        allProducts = [];


        snapshot.forEach((doc) => {

            const product = doc.data();

            allProducts.push(product);

        });


        displayProducts(allProducts);


    } catch (error) {

        console.error(
            "Firebase error:",
            error
        );

        container.innerHTML =
            "<p>❌ Unable to load products.</p>";

    }

}


/* DISPLAY PRODUCTS */

function displayProducts(products) {

    const container =
        document.getElementById(
            "products-container"
        );


    container.innerHTML = "";


    if (products.length === 0) {

        container.innerHTML =
            "<p>No products available.</p>";

        return;

    }


    products.forEach((product) => {

        const name =
            product.name ||
            product.Name ||
            "Unnamed Product";


        const price =
            product.price ??
            product.Price ??
            0;


        const description =
            product.description ||
            product.Description ||
            "No description available.";


        const card =
            document.createElement("div");


        card.className = "product";


        card.innerHTML = `

            <h3>${name}</h3>

            <p>
                <strong>Price:</strong>
                $${price}
            </p>

            <p>
                ${description}
            </p>

            <button>
                🛒 Add to Cart
            </button>

        `;


        card
            .querySelector("button")
            .addEventListener(
                "click",
                function() {

                    window.addToCart(name);

                }
            );


        container.appendChild(card);

    });

}


/* SEARCH */

window.searchProducts = function() {

    const input =
        document.getElementById(
            "searchInput"
        );


    const searchText =
        input.value
            .toLowerCase()
            .trim();


    const filtered =
        allProducts.filter(
            function(product) {

                const name =
                    (
                        product.name ||
                        product.Name ||
                        ""
                    ).toLowerCase();


                const description =
                    (
                        product.description ||
                        product.Description ||
                        ""
                    ).toLowerCase();


                return (
                    name.includes(searchText) ||
                    description.includes(searchText)
                );

            }
        );


    displayProducts(filtered);

};


/* START */

loadProducts();
