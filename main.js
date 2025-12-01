
document.addEventListener("DOMContentLoaded", () => {
    const fadeEls = document.querySelectorAll(".fade");
    fadeEls.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }, index * 120);
    });

    const cards = document.querySelectorAll(".card");
    cards.forEach((c, i) => {
        setTimeout(() => {
            c.style.opacity = "1";
            c.style.transform = "translateY(0)";
        }, 200 + i * 150);
    });
});



const db = {
    save(key, value){
        localStorage.setItem(key, JSON.stringify(value));
    },
    load(key){
        try { return JSON.parse(localStorage.getItem(key)) || []; }
        catch { return []; }
    }
};


function login(){
    const u = document.getElementById("user").value;
    const p = document.getElementById("pass").value;

    if(u === "" || p === ""){
        alert("Please enter username and password.");
        return;
    }

    db.save("loggedUser", { username: u });
    alert("Login Successful!");
    window.location.href = "../index.html";
}



function addToCart(name, price){
    let cart = db.load("cart");

    cart.push({
        name,
        price,
        time: new Date().toLocaleString()
    });

    db.save("cart", cart);
    alert(name + " added to cart!");
}



function showCart(){
    const box = document.getElementById("cartBox");
    if(!box) return;

    const cart = db.load("cart");

    if(cart.length === 0){
        box.innerHTML = "<p>No items in cart.</p>";
        return;
    }

    let html = "";
    let total = 0;

    cart.forEach(item => {
        html += `
        <div class="card fade" style="margin:15px 0;">
            <h3>${item.name}</h3>
            <p>₹${item.price}</p>
            <small>${item.time}</small>
        </div>
        `;
        total += item.price;
    });

    html += `<h2 style="margin-top:20px;">Total: ₹${total}</h2>`;
    box.innerHTML = html;
}




function saveMilk(){
    let qty = document.getElementById("milkQty").value;
    let fat = document.getElementById("milkFat").value;
    let snf = document.getElementById("milkSnf").value;

    if(qty === "" || fat === "" || snf === ""){
        alert("Please enter all fields.");
        return;
    }

    let milkData = db.load("milkRecords");

    milkData.push({
        qty,
        fat,
        snf,
        date: new Date().toLocaleString()
    });

    db.save("milkRecords", milkData);
    alert("Milk entry saved!");
    loadMilk();
}



function loadMilk(){
    let box = document.getElementById("milkList");
    if(!box) return;

    let data = db.load("milkRecords");

    if(data.length === 0){
        box.innerHTML = "<p>No milk records available.</p>";
        return;
    }

    box.innerHTML = data.map(r => `
        <div class="card fade">
            <h3>${r.qty} Liters</h3>
            <p>FAT: ${r.fat}% &nbsp; | &nbsp; SNF: ${r.snf}%</p>
            <small>${r.date}</small>
        </div>
    `).join("");
}




function addFarmer(){
    let name = document.getElementById("farmerName").value;
    let contact = document.getElementById("farmerContact").value;

    if(name === "" || contact === ""){
        alert("Please enter all fields.");
        return;
    }

    let farmers = db.load("farmers");

    farmers.push({
        id: farmers.length + 1,
        name,
        contact,
        joined: new Date().toLocaleDateString()
    });

    db.save("farmers", farmers);
    alert("Farmer added successfully!");
    loadFarmers();
}

function loadFarmers(){
    let box = document.getElementById("farmerList");
    if(!box) return;

    let list = db.load("farmers");

    if(list.length === 0){
        box.innerHTML = "<p>No farmers added.</p>";
        return;
    }

    box.innerHTML = list.map(f => `
        <div class="card fade">
            <h3>${f.name}</h3>
            <p>${f.contact}</p>
            <small>ID: ${f.id} – Joined: ${f.joined}</small>
        </div>
    `).join("");
}
