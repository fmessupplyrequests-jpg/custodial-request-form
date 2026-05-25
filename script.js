// -------------------------------
// GLOBAL SETTINGS
// -------------------------------
const maxItems = 19;
let itemCount = 0;

const nameField = document.getElementById("requesterName");
const dateNeededField = document.getElementById("dateNeeded");
const supplyForm = document.getElementById("supplyForm");
const addItemBtn = document.getElementById("addItemBtn");
const submitBtn = document.getElementById("submitBtn");

// -------------------------------
// AUTO-SAVE REQUESTER NAME
// -------------------------------
nameField.value = localStorage.getItem("requesterName") || "";

nameField.addEventListener("input", () => {
  localStorage.setItem("requesterName", nameField.value);
  validateForm();
});

// -------------------------------
// PRODUCT DROPDOWN BUILDER
// -------------------------------
function buildProductOptions() {
  const categories = {};

  Object.entries(products).forEach(([key, product]) => {
    if (!categories[product.category]) {
      categories[product.category] = [];
    }

    categories[product.category].push({
      key,
      label: product.short
    });
  });

  let html = `<option value="" disabled selected hidden>Select product</option>`;

  Object.entries(categories).forEach(([category, items]) => {
    html += `<option class="category-header" disabled>${category}</option>`;

    items.forEach(item => {
      html += `<option value="${item.key}">${item.label}</option>`;
    });
  });

  html += `
    <option class="category-header" disabled>Custom Request</option>
    <option value="Custom Request">Custom Request</option>
  `;

  return html;
}

// -------------------------------
// CREATE ITEM BLOCK
// -------------------------------
function createItemBlock() {
  if (itemCount >= maxItems) return;

  itemCount++;

  const block = document.createElement("div");
  block.className = "item-block";

  block.innerHTML = `
    <label>Product</label>
    <select class="productSelect">
      ${buildProductOptions()}
    </select>

    <label>Description</label>
    <input type="text" class="descField" placeholder="" readonly>

    <label>Vendor</label>
    <input type="text" class="vendorField" placeholder="" readonly>

    <label>URL</label>
    <input type="text" class="urlField" placeholder="" readonly>

    <label>Unit Price</label>
    const price = item.querySelector(".priceField").value.trim();

    <label>Quantity</label>
    <input type="number" class="qtyField" min="1">
      if (!product || !qty || !price)

    <button class="remove-btn" type="button">Remove Item</button>
  `;

  supplyForm.appendChild(block);

  const productSelect = block.querySelector(".productSelect");
  const descField = block.querySelector(".descField");
  const vendorField = block.querySelector(".vendorField");
  const urlField = block.querySelector(".urlField");
  const priceField = block.querySelector(".priceField");
  const qtyField = block.querySelector(".qtyField");
  const removeBtn = block.querySelector(".remove-btn");

  productSelect.addEventListener("change", () => {
    qtyField.value = "";
    priceField.value = "";

    const value = productSelect.value;

    if (value === "Custom Request") {
      setCustomFields(descField, vendorField, urlField);
    } else {
      setProductFields(value, descField, vendorField, urlField, priceField);
    }

    validateForm();
  });

  qtyField.addEventListener("input", validateForm);
  priceField.addEventListener("input", validateForm);

  removeBtn.addEventListener("click", () => {
    block.remove();
    itemCount--;
    validateForm();
  });

  validateForm();
}

function setCustomFields(descField, vendorField, urlField) {
  descField.readOnly = false;
  vendorField.readOnly = false;
  urlField.readOnly = false;

  descField.placeholder = "enter item description";
  vendorField.placeholder = "enter vendor name";
  urlField.placeholder = "enter link to item (i.e. Amazon, Walmart, Target)";

  descField.value = "";
  vendorField.value = "";
  urlField.value = "";
}

function setProductFields(value, descField, vendorField, urlField, priceField) {
  const product = products[value];

  if (!product) {
    alert(`Product setup error: ${value} is missing from products.js`);
    return;
  }

  descField.readOnly = true;
  vendorField.readOnly = true;
  urlField.readOnly = true;

  descField.placeholder = "";
  vendorField.placeholder = "";
  urlField.placeholder = "";

  descField.value = product.description;
  vendorField.value = product.vendor;
  urlField.value = product.url;

  priceField.value = "Fetching...";

  fetchPriceFromURL(product.url).then(price => {
    priceField.value = price;
    validateForm();
  });
}

// -------------------------------
// FORM VALIDATION
// -------------------------------
function validateForm() {
  const requesterName = nameField.value.trim();
  const dateNeeded = dateNeededField.value.trim();
  const items = document.querySelectorAll(".item-block");
  const price = item.querySelector(".priceField").value.trim();
  
  let allItemsValid = items.length > 0;

  items.forEach(item => {
    const product = item.querySelector(".productSelect").value.trim();
    const qty = item.querySelector(".qtyField").value.trim();
    const desc = item.querySelector(".descField").value.trim();
    const vendor = item.querySelector(".vendorField").value.trim();
    const url = item.querySelector(".urlField").value.trim();
    const price = item.querySelector(".priceField").value.trim();
    
    if (product === "Custom Request") {
    if (!product || !qty || !desc || !vendor || !url || !price) {
      allItemsValid = false;
}
      }
  } else if (!product || !qty || !price) {
      allItemsValid = false;
}
    }
  
  submitBtn.disabled = !(requesterName && dateNeeded && allItemsValid);
}

// -------------------------------
// SUBMIT FORM TO APPS SCRIPT
// -------------------------------

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwGDxVeF8FfPnE23FO79esxBaHivlxGcXLXRDah4ujMljqfF_YelWySzA40Mm8Mk6TF/exec";

submitBtn.addEventListener("click", async () => {

  const requester =
    nameField.value.trim();

  const dateNeeded =
    dateNeededField.value;

  const blocks =
    document.querySelectorAll(".item-block");

  const items = [];

  blocks.forEach(block => {

    items.push({
      product:
        block.querySelector(".productSelect").value,

      quantity:
        block.querySelector(".qtyField").value,

      description:
        block.querySelector(".descField").value,

      vendor:
        block.querySelector(".vendorField").value,

      url:
        block.querySelector(".urlField").value,

      price:
        block.querySelector(".priceField").value
    });
  });

  const payload = {
    requester,
    dateNeeded,
    items
  };

  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  try {

    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type":
          "text/plain;charset=utf-8"
      },
      body: JSON.stringify(payload)
    });

    alert("Request submitted!");

    // Reset form
    supplyForm.innerHTML = "";

    itemCount = 0;

    createItemBlock();

    validateForm();

  } catch (err) {

    console.error(err);

    alert("Error submitting request.");
  }

  submitBtn.textContent =
    "Submit Request";

  validateForm();
});

// -------------------------------
// STARTUP
// -------------------------------
createItemBlock();
addItemBtn.addEventListener("click", createItemBlock);

