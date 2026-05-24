// -------------------------------
// EMAILJS SETUP
// -------------------------------
emailjs.init("9Oy_yjfgv48qihRMN");

// -------------------------------
// GLOBAL SETTINGS
// -------------------------------
const maxItems = 19;
let itemCount = 0;

const nameField = document.getElementById("requesterName");
const dateNeeded = dateNeededField.value.trim();
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
// PRICE SCRAPER
// -------------------------------
async function fetchPriceFromURL(url) {
  if (!url || url.toUpperCase() === "TBD") {
    return "PRICE NOT AVAILABLE";
  }

  try {
    const response = await fetch(
      `https://gentle-field-d67e.michaeljleathers.workers.dev/?url=${encodeURIComponent(url)}`
    );

    const html = await response.text();
    const clean = html.replace(/\s+/g, " ").toLowerCase();
    let match;

    match = clean.match(/"pricetopay":\s*\{\s*"amount":\s*([0-9]+\.[0-9]+)/);
    if (match) return `$${match[1]}`;

    match = clean.match(/"priceamount":\s*"([0-9]+\.[0-9]+)/);
    if (match) return `$${match[1]}`;

    match = clean.match(/"price":\s*"\$([0-9]+\.[0-9]+)"/);
    if (match) return `$${match[1]}`;

    match = clean.match(/"price":\s*"([0-9]+\.[0-9]+)"/);
    if (match) return `$${match[1]}`;

    match = clean.match(/"current_retail":\s*([0-9]+\.[0-9]+)/);
    if (match) return `$${match[1]}`;

    match = clean.match(/"price":\s*([0-9]+\.[0-9]+)/);
    if (match) return `$${match[1]}`;

    match = clean.match(/"itemprice":\s*"([0-9]+\.[0-9]+)"/);
    if (match) return `$${match[1]}`;

    match = clean.match(/"offerprice":\s*"([0-9]+\.[0-9]+)"/);
    if (match) return `$${match[1]}`;

    match = clean.match(/\$([0-9]+\.[0-9]+)/);
    if (match) return `$${match[1]}`;

    return "PRICE NOT AVAILABLE";
  } catch (err) {
    console.error("Price lookup failed:", err);
    return "PRICE NOT AVAILABLE";
  }
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

    <input type="hidden" class="priceField" value="">

    <label>Quantity</label>
    <input type="number" class="qtyField" min="1">

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

  urlField.addEventListener("input", () => {
    if (productSelect.value !== "Custom Request") return;

    const url = urlField.value.trim();

    if (url.length < 5) {
      priceField.value = "";
      validateForm();
      return;
    }

    priceField.value = "Fetching...";

    fetchPriceFromURL(url).then(price => {
      priceField.value = price;
      validateForm();
    });
  });

  qtyField.addEventListener("input", validateForm);

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
  const items = document.querySelectorAll(".item-block");

  let allItemsValid = items.length > 0;

  items.forEach(item => {
    const product = item.querySelector(".productSelect").value.trim();
    const qty = item.querySelector(".qtyField").value.trim();
    const desc = item.querySelector(".descField").value.trim();
    const vendor = item.querySelector(".vendorField").value.trim();
    const url = item.querySelector(".urlField").value.trim();

    if (product === "Custom Request") {
      if (!product || !qty || !desc || !vendor || !url) {
        allItemsValid = false;
      }
    } else if (!product || !qty) {
      allItemsValid = false;
    }
  });

  submitBtn.disabled = !(requesterName && dateNeeded && allItemsValid);
}

// -------------------------------
// SUBMIT FORM
// -------------------------------
submitBtn.addEventListener("click", () => {
  const requester = nameField.value.trim();
  const dateNeeded = dateNeededField.value;
  const dateNeeded = dateNeededField.value;
  const timestamp = new Date().toLocaleString();
  const blocks = document.querySelectorAll(".item-block");

  let emailBody = `
Custodial Supply Request
Submitted by: ${requester}
Date: ${timestamp}

`;

  blocks.forEach((block, index) => {
    const product = block.querySelector(".productSelect").value;
    const qty = block.querySelector(".qtyField").value;
    const desc = block.querySelector(".descField").value;
    const vendor = block.querySelector(".vendorField").value;
    const url = block.querySelector(".urlField").value;
    const price = block.querySelector(".priceField").value;

    emailBody += `
Item ${index + 1}:
Product: ${product}
Quantity: ${qty}
Description: ${desc}
Vendor: ${vendor}
URL: ${url}
Unit Price: ${price}

`;
  });

  emailjs.send("service_gjboq38", "template_xob2g87", {
    subject: "Custodial Supply Request",
    message: emailBody
  }).then(() => {
    alert("Request submitted!");
  }).catch(err => {
    alert("Error sending request.");
    console.error(err);
  });
});

// -------------------------------
// STARTUP
// -------------------------------
createItemBlock();
addItemBtn.addEventListener("click", createItemBlock);
submitBtn.disabled = !(requesterName && dateNeeded && allItemsValid);
