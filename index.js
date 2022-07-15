const page1El = document.getElementById('page1');
const page2El = document.getElementById('page2');
const listContainerEl = document.getElementById('listContainer');
const loaderEl = document.getElementById('loader');

let apiURL = 'https://fakestoreapi.com/products';

// create function to get product data from api 
async function getProducts() {
    const res = await fetch(`${apiURL}`);
    const data = await res.json();

    productUI(data);
    console.log(data);
}
// function to fetch product details
async function getProductDetails(id) {
    const res = await fetch(`${apiURL}/${id}`);
    const data = await res.json();
    console.log(data);
    productDetailsUI(data);
}

// function to show product in UI
function productUI(data) {
    loaderEl.style.display = 'none';
    data.forEach(product => {
        let list = document.createElement('li');
        list.setAttribute('data-set-id', `${product.id}`);
        list.innerHTML = `
        <h3>${product.title}</h3>`
        listContainerEl.appendChild(list);

        list.addEventListener('click', function () {
            loaderEl.style.display = 'flex';
            page1El.classList.add('hide');
            let id = this.getAttribute('data-set-id');
            console.log(id);
            getProductDetails(id);
        });
    });
}


// function to show productDetails in UI
function productDetailsUI(data) {
    loaderEl.style.display = 'none';
    page2El.style.display = 'flex';
    let productDetail = document.createElement('div');
    productDetail.classList.add('productDetails');
    productDetail.innerHTML = `
        <div class="productImg" id="productImg">
          <img src="${data.image}">
        </div>
        <div class="productPrice">
            <h3>${data.title}</h3>
            <h4>Price : Rs ${data.price}</h4>
            <h4>Rating : ${data.rating.rate} / 5</h4>
            <h4>Category : ${data.category}</h4>
            <div class="productDescription">
                <p>${data.description}</p>
            </div>
        </div>`
    page2El.appendChild(productDetail);
}

getProducts();
