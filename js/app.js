const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};

loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  console.log(allProducts)
  for (const product of allProducts) {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${product.image}></img>
      </div>
      <p>${product.title.substr(0,50)}</p>
      <p>Category: ${product.category}</p>
      <h5>Price: $ ${product.price}</h5>
      <p class='text-muted'><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i> ${product.rating.rate}</p>
      <h6>Review: ${product.rating.count}</h6>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-primary">add to cart</button>
      <button id="details-btn" class="btn btn-success" onclick="detail(${product.id})">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal()

  document.getElementById("total-Products").innerText = count;
};

const detail = async id => {
  let url = `https://fakestoreapi.com/products/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.price)
  const container = document.getElementById('detail-container');
  container.textContent = '';
  const div = document.createElement('div');
  div.classList.add('card');
  div.innerHTML = `
   <div class='row'>
   <div class='col-5'>
   <img src="${data.image}" height="200px" class="card-img-top" alt="...">
  </div>
  <div class="col-7">
    <h5 class="card-title">${data.category}</h5>
    <p class="card-text">${data.description}</p>
    <p class='text-muted'><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i> ${data.rating.rate}</p>
    <h4>Price: $ ${data.price}</h4>
    <button class="btn btn-primary text-center">Buy Now</button>
  </div>
   </div>
  `;
  container.appendChild(div)
}

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }

};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
updateTotal()