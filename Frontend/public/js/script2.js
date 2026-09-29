// === PRICE CALCULATOR FUNCTION ===
document.getElementById("calculate-btn").addEventListener("click", calculatePrice);

function calculatePrice() {
  const itemType = document.getElementById("item-type").value;
  const condition = document.getElementById("condition").value;
  const materials = Array.from(
    document.querySelectorAll('input[name="materials"]:checked')
  );
  const weight = parseFloat(document.getElementById("weight").value);

  let basePrice = 0;
  switch (itemType) {
    case "Smartphone": basePrice = 200; break;
    case "Tablet": basePrice = 100; break;
    case "Laptop": basePrice = 500; break;
    case "Desktop": basePrice = 200; break;
    case "Refrigerator":
    case "Washing Machine": basePrice = 300; break;
    case "Microwave": basePrice = 100; break;
    case "Air Conditioner": basePrice = 150; break;
    case "TV": basePrice = 250; break;
    case "Printer": basePrice = 90; break;
    case "Gaming Console": basePrice = 120; break;
    case "Router": basePrice = 50; break;
    case "Smartwatch": basePrice = 40; break;
    case "Digital Camera": basePrice = 254; break;
    case "Electric Kettle":
    case "Blender":
    case "Toaster": basePrice = 70; break;
    default: basePrice = 25; break;
  }

  if (condition === "Damaged") basePrice *= 0.7;
  else if (condition === "Non-Functional") basePrice *= 0.4;

  materials.forEach((material) => {
    if (material.value === "Gold") basePrice += 20;
    else if (material.value === "Silver") basePrice += 15;
    else if (material.value === "Copper") basePrice += 10;
    else if (material.value === "Plastic") basePrice += 5;
  });

  if (!isNaN(weight) && weight > 0) {
    basePrice += weight * 5;
  }

  document.getElementById("price-value").textContent = `₹${basePrice.toFixed(2)}`;
}

// === SAVE FORM DATA TO LOCAL STORAGE ===
const form = document.getElementById("recycle-form");
const storageInfo = document.getElementById("storage-info");
const storedDataDiv = document.getElementById("stored-data");
const viewDataBtn = document.getElementById("view-data");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const itemType = document.getElementById("item-type").value;
  const condition = document.getElementById("condition").value;
  const weight = parseFloat(document.getElementById("weight").value) || 0;
  const materials = Array.from(
    document.querySelectorAll('input[name="materials"]:checked')
  ).map((checkbox) => checkbox.value);
  const price = document.getElementById("price-value").textContent;

  // Create item object
  const newRecord = {
    itemType,
    condition,
    weight,
    materials,
    price,
    date: new Date().toLocaleString()
  };

  // Get old data (if any)
  let records = JSON.parse(localStorage.getItem("recycledItems")) || [];
  records.push(newRecord);
  localStorage.setItem("recycledItems", JSON.stringify(records));

  // Update UI
  storageInfo.innerHTML = `
    ✅ Record saved successfully!<br>
    📁 Storage Key: <code>recycledItems</code>
  `;

  // Reset form & price
  form.reset();
  document.getElementById("price-value").textContent = "₹0";
});

// === VIEW SAVED RECORDS ===
viewDataBtn.addEventListener("click", () => {
  const records = JSON.parse(localStorage.getItem("recycledItems")) || [];
  if (records.length === 0) {
    storedDataDiv.innerHTML = "No records found.";
    return;
  }

  storedDataDiv.innerHTML = records.map((r, i) => `
    <p><strong>${i + 1}. ${r.itemType}</strong> (${r.condition}) - ${r.weight} kg<br>
    Materials: ${r.materials.join(", ") || "None"}<br>
    Price: ${r.price}<br>
    <em>${r.date}</em></p><hr>
  `).join("");
});

// === OPTIONAL: CLEAR ALL RECORDS ===
const clearBtn = document.createElement("button");
clearBtn.textContent = "Clear All Records";
clearBtn.style.marginTop = "10px";
clearBtn.addEventListener("click", () => {
  localStorage.removeItem("recycledItems");
  storedDataDiv.innerHTML = "";
  storageInfo.textContent = "🗑️ All records cleared.";
});
storedDataDiv.insertAdjacentElement("afterend", clearBtn);
