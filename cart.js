// cart empty
if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
}

function renderCart() {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let cartItemsDiv = document.getElementById('cart-items');
    let cartBillDiv = document.getElementById('cart-bill');
    let total = 0;
    let deliveryFee = 95;
    let discount = 0;
    let gst = 70;

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
        cartBillDiv.innerHTML = `
            <div class="bill-details">
                <div class="row">
                    <div class="col">Item Total</div>
                    <div class="col text-right">₹0</div>
                </div>
                <div class="row">
                    <div class="col">Delivery Fee</div>
                    <div class="col text-right">₹0</div>
                </div>
                <div class="row">
                    <div class="col">Extra discount for you</div>
                    <div class="col text-right text-success">-₹0</div>
                </div>
                <div class="row">
                    <div class="col">GST & Other Charges</div>
                    <div class="col text-right">₹0</div>
                </div>
                <hr>
                <div class="row to-pay">
                    <div class="col">TO PAY</div>
                    <div class="col text-right">₹0</div>
                </div>
            </div>
        `;
        return;
    }

    let html = '';
    cart.forEach((item, idx) => {
        let itemTotal = item.price * item.qty;
        total += itemTotal;
        html += `
        <div class="d-flex align-items-center mb-3">
            <img src="${item.img}" class="cart-item-img" alt="${item.name}">
            <div class="flex-grow-1">
                <div class="font-weight-bold">${item.name}</div>
                <div class="text-muted small">${item.category || ''}</div>
            </div>
            <div class="d-flex align-items-center">
                <button class="btn btn-outline-secondary btn-sm qty-btn" onclick="updateQty(${idx},-1)">-</button>
                <span class="mx-2">${item.qty}</span>
                <button class="btn btn-outline-secondary btn-sm qty-btn" onclick="updateQty(${idx},1)">+</button>
            </div>
            <div class="ml-3 font-weight-bold">₹${itemTotal}</div>
            <button class="btn btn-danger btn-sm ml-2" onclick="removeItem(${idx})">Remove</button>
        </div>
        `;
    });

   
    if (total > 300) discount = 25;

    let billHtml = `
        <div class="bill-details">
            <div class="row">
                <div class="col">Item Total</div>
                <div class="col text-right">₹${total}</div>
            </div>
            <div class="row">
                <div class="col">Delivery Fee</div>
                <div class="col text-right">₹${deliveryFee}</div>
            </div>
            <div class="row">
                <div class="col">Extra discount for you</div>
                <div class="col text-right text-success">-₹${discount}</div>
            </div>
            <div class="row">
                <div class="col">GST & Other Charges</div>
                <div class="col text-right">₹${gst}</div>
            </div>
            <hr>
            <div class="row to-pay">
                <div class="col">TO PAY</div>
                <div class="col text-right">₹${total + deliveryFee + gst - discount}</div>
            </div>
        </div>
    `;

    cartItemsDiv.innerHTML = html;
    cartBillDiv.innerHTML = billHtml;
}


function updateQty(idx, change) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart[idx].qty += change;
    if (cart[idx].qty < 1) cart[idx].qty = 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}


function removeItem(idx) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.splice(idx, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

renderCart();