document.getElementById('recycle-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Get form data
  const itemType = document.getElementById('item-type').value;
  const condition = document.getElementById('condition').value;
  const weight = document.getElementById('weight').value;

  // Handle materials checkboxes
  const materials = [];
  document.querySelectorAll('input[name="materials"]:checked').forEach(function(checkbox) {
    materials.push(checkbox.value);
  });

  // Calculate price (for simplicity, this is a dummy formula)
  let price = 0;
  if (condition === 'Working') price = weight * 10;
  if (condition === 'Damaged') price = weight * 5;
  if (condition === 'Non-Functional') price = weight * 2;

  // Store data in localStorage (for now, just a simple store)
  const itemData = { itemType, condition, materials, weight, price };
  let items = JSON.parse(localStorage.getItem('items')) || [];
  items.push(itemData);
  localStorage.setItem('items', JSON.stringify(items));

  // Redirect to shopkeeper page
  window.location.href = 'shopkeeper.html';
});
