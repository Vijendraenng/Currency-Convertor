const BASE_URL = `https://latest.currency-api.pages.dev/v1/currencies/`;

const dropdowns = document.querySelectorAll(`.selectOption`);
const btn = document.querySelector(`.btn`);
const fromCrr = document.querySelector(`.from select`);
const toCrr = document.querySelector(`.to select`);
const MsgElelment = document.querySelector(`.Msg`);

for (let select of dropdowns) {
  for (code in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = code;
    newOption.value = code;
    if (select.name === `from` && code === `USD`) {
      newOption.selected = `selected`;
    } else if (select.name === `to` && code === `INR`) {
      newOption.selected = `selected`;
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (Element) => {
  let country = Element.value;
  let countryCode = countryList[country];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/48.png`;
  let img = Element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener(`click`, async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(`.amount input`);
  let amtval = amount.value;
  if (amtval === "" || amtval < 0) {
    amount.value = 1;
    amtval = 1;
  }

  const url = `${BASE_URL}${fromCrr.value.toLowerCase()}.json`;
  let respons = await fetch(url);
  let data = await respons.json();
  let rate = data[fromCrr.value.toLowerCase()][toCrr.value.toLowerCase()];
  console.log(amtval);
  let finalAmount = amtval * rate;
  MsgElelment.innerText = `${amtval} ${fromCrr.value}= ${finalAmount} ${toCrr.value}`;
});
