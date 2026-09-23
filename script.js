document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
  }

  const newsletterForm = document.querySelector("#newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", e => {
      e.preventDefault();
      alert("Thank you for subscribing!");
      newsletterForm.reset();
    });
  }

  const contactForm = document.querySelector("#contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", e => {
      e.preventDefault();
      alert("Thank you! Your message has been received.");
      contactForm.reset();
    });
  }

  const tabs = document.querySelectorAll(".menu-tabs .tab");
  const products = document.querySelectorAll(".menu-product");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const filter = tab.dataset.filter;
      products.forEach(product => {
        product.style.display =
          filter === "all" || product.dataset.category === filter ? "" : "none";
      });
    });
  });

  let cart = JSON.parse(localStorage.getItem("crunchiesCart") || "[]");
  const cartCount = document.querySelector("#cartCount");
  const cartItems = document.querySelector("#cartItems");
  const cartTotal = document.querySelector("#cartTotal");

  function money(number) {
    return "₦" + number.toLocaleString();
  }

  function renderCart() {
    if (!cartCount || !cartItems || !cartTotal) return;
    cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);

    if (cart.length === 0) {
      cartItems.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
      cartTotal.textContent = "₦0";
      return;
    }

    cartItems.innerHTML = cart.map((item, index) => `
      <div class="cart-row">
        <span>${item.name} × ${item.qty}</span>
        <strong>${money(item.price * item.qty)}
          <button class="remove-item" data-index="${index}" style="margin-left:10px;border:0;background:none;color:#e31b23;cursor:pointer">Remove</button>
        </strong>
      </div>
    `).join("");

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    cartTotal.textContent = money(total);

    document.querySelectorAll(".remove-item").forEach(button => {
      button.addEventListener("click", () => {
        cart.splice(Number(button.dataset.index), 1);
        localStorage.setItem("crunchiesCart", JSON.stringify(cart));
        renderCart();
      });
    });
  }

  document.querySelectorAll(".add-cart").forEach(button => {
    button.addEventListener("click", () => {
      const name = button.dataset.name;
      const price = Number(button.dataset.price);
      const existing = cart.find(item => item.name === name);

      if (existing) existing.qty += 1;
      else cart.push({ name, price, qty: 1 });

      localStorage.setItem("crunchiesCart", JSON.stringify(cart));
      renderCart();
      alert(name + " added to your order.");
    });
  });

  const checkoutBtn = document.querySelector("#checkoutBtn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (!cart.length) {
        alert("Please add an item first.");
        return;
      }
      alert("Demo checkout: your order is ready to be connected to a real ordering system.");
    });
  }

  renderCart();
});
