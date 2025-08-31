// Telegram API
if (window.Telegram) {
  Telegram.WebApp.ready();
  Telegram.WebApp.MainButton.setText("Подключить автоматизацию");
  Telegram.WebApp.MainButton.show();
}

// Переход между страницами
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// Демо-данные
const products = Array.from({ length: 70 }, (_, i) => ({
  name: `Товар #${i+1}`,
  category: ["Электроника","Одежда","Детские товары"][i % 3],
  stock: Math.floor(Math.random() * 200),
  price: (Math.random() * 5000 + 500).toFixed(0),
  competitorPrice: (Math.random() * 5000 + 500).toFixed(0),
  photo: "https://via.placeholder.com/50"
}));

// Отрисовка дашборда
function renderDashboard() {
  document.getElementById("total-products").textContent = products.length;
  const issues = products.filter(p => p.stock === 0 || Number(p.price) > Number(p.competitorPrice) * 1.1);
  document.getElementById("issues-count").textContent = issues.length;
  document.getElementById("time-saved").textContent = "8 ч / неделю";
  document.getElementById("lost-sales").textContent = "45 000 ₽";
  document.getElementById("achievements").innerHTML = `<p>🏅 Достижение: Неделя без простоев</p>`;
}

// Таблица товаров
function renderProducts() {
  const tbody = document.getElementById("product-table");
  tbody.innerHTML = "";
  products.forEach(p => {
    const status = p.stock === 0 ? "❌ Нет в наличии" : "✅ В наличии";
    tbody.innerHTML += `
      <tr>
        <td><img src="${p.photo}"></td>
        <td>${p.name}</td>
        <td>${p.category}</td>
        <td>${p.stock}</td>
        <td>${p.price}</td>
        <td>${status}</td>
      </tr>
    `;
  });
}

// Таблица цен
function renderPrices() {
  const tbody = document.getElementById("price-table");
  tbody.innerHTML = "";
  products.slice(0,10).forEach(p => {
    let rec = "Ок";
    if (Number(p.price) > Number(p.competitorPrice) * 1.05) rec = "Снизить";
    if (Number(p.price) < Number(p.competitorPrice) * 0.95) rec = "Повысить";
    tbody.innerHTML += `
      <tr>
        <td>${p.name}</td>
        <td>${p.price}</td>
        <td>${p.competitorPrice}</td>
        <td>${rec}</td>
      </tr>
    `;
  });
}

// Графики
function renderCharts() {
  new Chart(document.getElementById("salesChart"), {
    type: 'line',
    data: {
      labels: ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"],
      datasets: [{ label: 'Продажи (₽)', data: [12000,15000,10000,18000,20000,25000,22000] }]
    }
  });
  new Chart(document.getElementById("stockChart"), {
    type: 'bar',
    data: {
      labels: ["Электроника","Одежда","Детские"],
      datasets: [{ label: 'Остатки', data: [500,300,400] }]
    }
  });
  new Chart(document.getElementById("timeChart"), {
    type: 'doughnut',
    data: {
      labels: ["Сэкономлено","Потрачено"],
      datasets: [{ data: [8,32], backgroundColor:["#4caf50","#ddd"] }]
    }
  });
}

// Подключение магазинов
document.getElementById("connect-form").addEventListener("submit", e => {
  e.preventDefault();
  localStorage.setItem("ozonKey", document.getElementById("ozon-key").value);
  localStorage.setItem("wbKey", document.getElementById("wb-key").value);
  alert("Ключи сохранены (демо)");
});

// Инициализация
renderDashboard();
renderProducts();
renderPrices();
renderCharts();
