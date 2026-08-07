import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

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

window.addToCart = function(productName) {
    cart.push(productName);
    document.getElementById("cart-count").innerText = cart.length;
    alert(productName + " added to cart!");
}

window.viewCart = function() {
    alert("Items in cart:\n\n" + cart.join("\n"));
}

async function loadProducts() {
    const snapshot = await getDocs(collection(db, "products"));
    snapshot.forEach((doc) => {
        console.log(doc.data());
    });
}

loadProducts();
