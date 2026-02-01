
const drinks = [
  { name:"Better Beer", kcal:131, c:3.75 }
];

const UNITS = {
  ml:1,
  schooner:425,
  bottle:375
};

const rows = document.getElementById("drinkRows");

function addRow(){
  const div = document.createElement("div");
  div.className="trow";

  div.innerHTML = `
    <select>
      <option>Better Beer</option>
    </select>

    <select class="unit">
      <option value="ml">mL</option>
      <option value="schooner">Schooner</option>
      <option value="bottle">Bottle</option>
    </select>

    <input type="number" step="1" placeholder="Qty"/>

    <div class="cell kcal">0</div>
    <div class="cell carb">0</div>
    <button onclick="this.parentElement.remove()">✕</button>
  `;

  const unitSel = div.querySelector(".unit");
  const amt = div.querySelector("input");
  const kcal = div.querySelector(".kcal");
  const carb = div.querySelector(".carb");

  function calc(){
    const ml = (Number(amt.value)||0) * UNITS[unitSel.value];
    const mult = ml/100;
    kcal.textContent = Math.round(mult*131);
    carb.textContent = (mult*3.75).toFixed(1);
  }

  unitSel.onchange = calc;
  amt.oninput = calc;

  rows.appendChild(div);
}

document.getElementById("addDrink").onclick = addRow;
document.getElementById("clearDrink").onclick = ()=> rows.innerHTML="";
