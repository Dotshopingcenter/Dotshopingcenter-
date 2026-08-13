<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seller Dashboard - Dot Shopping Center</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

<header>
    <h1>🛍️ Dot Shopping Center</h1>
    <p>Seller Dashboard</p>
</header>

<nav>
    <a href="index.html">Home</a>
    <a href="seller.html">Seller Dashboard</a>
</nav>

<section>
    <h2>➕ Add Product</h2>

    <form id="productForm">

        <label>Product Name</label><br>
        <input
            type="text"
            id="name"
            placeholder="Product Name"
            required
        >

        <br><br>

        <label>Price</label><br>
        <input
            type="number"
            id="price"
            placeholder="Price"
            required
        >

        <br><br>

        <label>Product Description</label><br>
        <textarea
            id="description"
            placeholder="Product Description"
            required
        ></textarea>

        <br><br>

        <button type="submit">
            ➕ Add Product
        </button>

    </form>

    <p id="message"></p>

    <p>
        <a href="index.html">⬅️ Back to Home</a>
    </p>
</section>

<script type="module">

import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc
}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


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


const form = document.getElementById("productForm");
const message = document.getElementById("message");


form.addEventListener("submit", async function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const price = document.getElementById("price").value;
    const description =
        document.getElementById("description").value.trim();


    if (!name || !price || !description) {
        message.innerText = "Please fill in all fields.";
        return;
    }


    try {

        await addDoc(collection(db, "products"), {

            name: name,
            price: Number(price),
            description: description

        });


        message.innerText =
            "✅ Product added successfully!";


        form.reset();


    } catch (error) {

        console.error(error);

        message.innerText =
            "❌ Error adding product.";

    }

});

</script>

</body>
</html>
