const products = [
  { name:"Shoes", price:1000, img:"https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=698&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name:"T-Shirt", price:500, img:"https://plus.unsplash.com/premium_photo-1673356302067-aac3b545a362?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHNoaXJ0fGVufDB8fDB8fHww" },
  { name:"Watch", price:1500, img:"https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0Y2h8ZW58MHx8MHx8fDA%3D" },
  { name:"tote bag",price:1200, img:"https://images.unsplash.com/photo-1614179689702-355944cd0918?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFnfGVufDB8fDB8fHww" }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

function loadProducts(list = products){
  const container = document.getElementById('products');
  container.innerHTML='';

  list.forEach((p,i)=>{
    const div = document.createElement('div');
    div.className='card';

    div.innerHTML = `
      <img src="${p.img}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <input type="number" min="1" value="1" id="qty${i}">
      <button onclick="addToCart(${i})">Add</button>
    `;

    container.appendChild(div);
  });
}

function addToCart(i){
  let qty = parseInt(document.getElementById('qty'+i).value);
  if(qty <= 0) return alert("Invalid quantity");

  cart.push({...products[i], qty});
  saveCart();
  displayCart();
}

function displayCart(){
  const cartDiv = document.getElementById('cartItems');
  cartDiv.innerHTML='';
  let total=0;

  cart.forEach((item,index)=>{
    let itemTotal = item.price * item.qty;
    total += itemTotal;

    cartDiv.innerHTML += `
      <div>
        ${item.name} x${item.qty} - ₹${itemTotal}
        <button onclick="removeFromCart(${index})">❌</button>
      </div>
    `;
  });

  document.getElementById('total').innerText = total;
}

function removeFromCart(index){
  cart.splice(index,1);
  saveCart();
  displayCart();
}

function filterProducts(){
  let val = document.getElementById('search').value.toLowerCase();
  let filtered = products.filter(p=>p.name.toLowerCase().includes(val));
  loadProducts(filtered);
}

function checkout(){
  if(cart.length === 0) return alert("Cart is empty!");

  alert("Order placed successfully 🎉");
  cart = [];
  saveCart();
  displayCart();
}

function scrollToProducts(){
  document.getElementById("productsSection").scrollIntoView({behavior:"smooth"});
}

loadProducts();
displayCart();