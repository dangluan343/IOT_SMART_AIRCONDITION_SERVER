console.log("errorS");
const tempData = document.querySelector(".airCondition .btn-temp");
let tempValue = parseInt(tempData.innerHTML.split(" ")[0]);
const airConditionIcon = document.querySelector(
  ".airCondition .airCondition-filter"
);

const lightSensor = document.querySelector(".sensor .light");
const humiditySensor = document.querySelector(".sensor .humidity");
const temperatureSensor = document.querySelector(".sensor .temperature");

const airConditionPower = document.querySelector(".airCondition .power");
const airConditionMode = document.querySelector(".airCondition .mode");
const airConditionSwing = document.querySelector(".airCondition .swing");
const airConditionWind = document.querySelector(".airCondition .wind");

const fanSwing = document.querySelector(".fan .swing");
const fanSpeed = document.querySelector(".fan .speed");

const fanIcon = document.querySelector(".fan .fa-fan");
// let airConditionData = {
//   power: airConditionPower.innerHTML,
//   mode: airConditionMode.innerHTML,
//   temperature: `${tempValue}`,
//   swing: airConditionSwing.innerHTML,
//   wind: airConditionWind.innerHTML,
// };

// let fanData = {
//   swing: fanSwing.innerHTML,
//   speed: fanSpeed.innerHTML,
// };

async function firstLoad() {
  const fanBefore = {
    swing: fanSwing.innerHTML,
  };
  const airConditionBefore = {
    power: airConditionPower.innerHTML,
    swing: airConditionSwing.innerHTML,
  };

  const url = "http://localhost:8080/server";
  await fetch(url, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((response) => {
      lightSensor.innerHTML = response.light;
      humiditySensor.innerHTML = response.humi;
      temperatureSensor.innerHTML = response.temp;

      airConditionPower.innerHTML = response.airCondition.power;
      airConditionMode.innerHTML = response.airCondition.mode;
      tempValue = parseInt(response.airCondition.temp);
      airConditionSwing.innerHTML = response.airCondition.swing;
      airConditionWind.innerHTML = response.airCondition.wind;

      fanSpeed.innerHTML = response.fan.speed;
      fanSwing.innerHTML = response.fan.swing;
    })
    .catch((error) => console.error("Error:", error));

  // air condition

  if (airConditionPower.innerHTML !== airConditionBefore.power) {
    toggle(
      document.querySelector(".airCondition .power+.value button"),
      "airCondition",
      "power"
    );
  }
  toggleMode(airConditionMode, "airCondition", "mode");

  let newTemp = tempValue + " C";
  tempData.innerHTML = newTemp;
  if (airConditionSwing.innerHTML !== airConditionBefore.swing) {
    toggle(
      document.querySelector(".airCondition .swing+.value button"),
      "airCondition",
      "swing"
    );
  }
  toggleMode(airConditionWind, "airCondition", "wind");
  // fan
  if (fanSwing.innerHTML !== fanBefore.swing) {
    toggle(document.querySelector(".fan .swing+.value button"), "fan", "swing");
  }
  toggleMode(fanSpeed, "fan", "speed");
}
setTimeout(firstLoad, 500);
setInterval(firstLoad, 10000);

function toggle(currentElement, device, control) {
  const children = currentElement.innerHTML;
  if (control === "power" && device === "airCondition") {
    airConditionIcon.classList.toggle("active");
  }
  var newChild = "";
  const changeEle = document.querySelector(`.${device} .${control}`);
  if (children.includes("off")) {
    newChild = `<i class="fa-solid fa-toggle-on active"></i>`;
    changeEle.innerHTML = "1";
  } else {
    newChild = `<i class="fa-solid fa-toggle-off"></i>`;
    changeEle.innerHTML = "0";
  }
  currentElement.innerHTML = newChild;
}

function changeTemp(i) {
  tempValue += i;
  let newTemp = tempValue + " C";
  tempData.innerHTML = newTemp;
}

function toggleMode(currentElement, device, control) {
  const currentElementValue = currentElement.innerHTML;
  const listMode = document.querySelectorAll(
    `.${device} .btn-group.${control} .btn`
  );
  const changeEle = document.querySelector(`.${device} .${control}`);
  listMode.forEach((element) => {
    element.classList.remove("active");

    if (currentElementValue === element.innerHTML) {
      element.classList.add("active");
      changeEle.innerHTML = currentElementValue;
    }
  });
  if (device === "fan" && currentElementValue !== "0") {
    fanIcon.classList.add("active");
  } else if (device === "fan" && currentElementValue === "0") {
    fanIcon.classList.remove("active");
  }
}

function sendData() {
  let airConditionData = {
    power: airConditionPower.innerHTML,
    mode: airConditionMode.innerHTML,
    temp: `${tempValue}`,
    swing: airConditionSwing.innerHTML,
    wind: airConditionWind.innerHTML,
  };

  let fanData = {
    swing: fanSwing.innerHTML,
    speed: fanSpeed.innerHTML,
  };
  const data = {
    airConditionData,
    fanData,
  };
  const url = "http://localhost:8080/clientB/update/node";
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((response) => console.log("Success:", JSON.stringify(response)))
    .catch((error) => console.log("Error:", error));
}
