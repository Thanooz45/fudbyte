
const dishes = [
    {
        name: "Pizza Hut",
        price: 199,
        img: "https://res.cloudinary.com/dkspz8wwt/image/upload/v1750835981/Screenshot_2025-06-25_124923_xetaqa.png",
        category: "Pizza",
        rating: 4.2
    },
    {
        name: "Indian Coffee House",
        price: 149,
        img: "https://res.cloudinary.com/dkspz8wwt/image/upload/v1750835924/Screenshot_2025-06-25_124825_qe0ayg.png",
        category: "Coffee",
        rating: 4.4
    },
    {
        name: "Pastas By Pizza Hut",
        price: 179,
        img: "https://res.cloudinary.com/dkspz8wwt/image/upload/v1750835791/Screenshot_2025-06-25_124619_anzfkc.png",
        category: "Pasta",
        rating: 3.7
    },
    {
        name: "Tasty Talk",
        price: 129,
        img: "https://res.cloudinary.com/dkspz8wwt/image/upload/v1750836012/Ham_Sandwich_011-1-49227336bc074513aaf8fdbde440eafe_ufkfl0.jpg",
        category: "Sandwich",
        rating: 3.4
    },
    {
        name: "Veg Noodles",
        price: 99,
        img: "https://res.cloudinary.com/dkspz8wwt/image/upload/v1750835731/Screenshot_2025-06-25_124516_bc2qbn.png",
        category: "Noodles",
        rating: 4.0
    },
    {
        name: "Chicken Curry",
        price: 249,
        img: "https://res.cloudinary.com/dkspz8wwt/image/upload/v1750835597/Screenshot_2025-06-25_124212_estvek.png",
        category: "Curry",
        rating: 4.5
    },
    {
        name: "Fish Curry",
        price: 349,
        img: "https://res.cloudinary.com/dkspz8wwt/image/upload/v1750836183/thumb__1200_0_0_0_auto_ji6qgx.jpg",
        category: "Curry",
        rating: 4.5
    },
    {
        name: "Chicken Noodles",
        price: 150,
        img: "https://res.cloudinary.com/dkspz8wwt/image/upload/v1750836151/Spicy-Chicken-Hakka-Noodles-Recipe_i2to6d.jpg",
        category: "Noodles",
        rating: 4.3
    },
    {
        name: "Chicken pasta",
        price: 150,
        img: "https://res.cloudinary.com/dkspz8wwt/image/upload/v1750836351/Creamy-Basil-Chicken-Pasta_-done_b9pjvj.jpg",
        category: "Pasta",
        rating: 4.7
    },
    {
        name: "Chicken biryani",
        price: 200,
        img: "https://res.cloudinary.com/dkspz8wwt/image/upload/v1750837311/Chicken-Biryani-Recipe_haxwcm.jpg",
        category: "Biryani",
        rating: 4.2
    }
];


function renderDishes(list) {
    const menuList = document.getElementById('menu-list');
    menuList.innerHTML = '';
    list.forEach(dish => {
        const col = document.createElement('div');
        col.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-4";
        col.innerHTML = `
            <div class="card menu-card h-100 shadow-sm">
                <div class="menu-card-img-container">
                    <img src="${dish.img}" class="card-img-top" alt="${dish.name}">
                </div>
                <div class="card-body">
                    <h5 class="card-title mb-1">${dish.name}</h5>
                    <div class="text-success font-weight-bold mb-1" style="font-size: 1rem;">
                        <span>&#11044;</span> ${dish.rating} 
                    </div>
                    <div class="text-muted small">${dish.category}</div>
                    <div class="mt-2 font-weight-bold">₹${dish.price}</div>
                    <button class="btn btn-sm btn-primary add-to-cart-btn" 
                        data-name="${dish.name}" 
                        data-price="${dish.price}"
                        data-img="${dish.img}">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
        menuList.appendChild(col);
    });
    attachAddToCart();
}


function attachAddToCart() {
    document.querySelectorAll('.add-to-cart-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const price = parseInt(this.getAttribute('data-price'));
            const img = this.getAttribute('data-img');
            let cart = JSON.parse(localStorage.getItem('cart') || '[]');
            let found = cart.find(item => item.name === name);
            if (found) {
                found.qty += 1;
            } else {
                cart.push({ name, price, img, qty: 1 });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            this.textContent = "Added!";
            setTimeout(() => { this.textContent = "Add to Cart"; }, 1000);
        });
    });
}


function setupFilters() {
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const cat = this.getAttribute('data-category');
            if (cat === "All") {
                renderDishes(dishes);
            } else {
                renderDishes(dishes.filter(d => d.category === cat));
            }
        });
    });
}


renderDishes(dishes);
setupFilters();