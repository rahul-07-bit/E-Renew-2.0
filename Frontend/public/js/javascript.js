document.getElementById('recycle-form').addEventListener('submit', (event) => {
  event.preventDefault();

  const itemType = document.getElementById('item-type').value;
  const condition = document.getElementById('condition').value;
  const weight = parseFloat(document.getElementById('weight').value) || 0;
  const materials = Array.from(
    document.querySelectorAll('input[name="materials"]:checked')
  ).map((checkbox) => checkbox.value);
  const price = document.getElementById('price-value').textContent;

  const itemData = {
    itemType,
    condition,
    weight,
    materials,
    price,
  };

  // Store item in localStorage
  let items = JSON.parse(localStorage.getItem('recycledItems')) || [];
  items.push(itemData);
  localStorage.setItem('recycledItems', JSON.stringify(items));

  alert('Item submitted successfully!');
  document.getElementById('recycle-form').reset(); // Reset the form
  document.getElementById('price-value').textContent = '₹0'; // Reset price

  fetchItems(); // Refresh table
});

// Fetch items from LocalStorage
function fetchItems() {
  const items = JSON.parse(localStorage.getItem('recycledItems')) || [];
  const tableBody = document.querySelector('#items-table tbody'); // Select table body

  tableBody.innerHTML = ''; // Clear existing rows

  items.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.itemType}</td>
      <td>${item.condition}</td>
      <td>${item.weight}</td>
      <td>${item.materials.join(', ')}</td>
      <td>${item.price}</td>
      <td>
        <button onclick="deleteItem(${index})">Remove</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Delete an item from LocalStorage
function deleteItem(index) {
  let items = JSON.parse(localStorage.getItem('recycledItems')) || [];
  items.splice(index, 1); // Remove item by index
  localStorage.setItem('recycledItems', JSON.stringify(items));
  fetchItems(); // Refresh the table after deletion
}

// Load items on page load
fetchItems();

// Automatically refresh table every 5 seconds
setInterval(fetchItems, 5000); // Adjust the interval as needed
