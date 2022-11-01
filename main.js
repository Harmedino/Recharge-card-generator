let network1 = document.getElementById("text");
let amount1 = document.getElementById("amount");
let display = document.getElementById("serial");
let gPin;
let generatedPin = document.getElementById("generate");
let save = document.getElementById("save");
let myar = [];
let data;
let err = document.getElementById("err");
let err2 = document.getElementById("err2");
let date = new Date();
// console.log(date.getHours());
let hour = date.getHours();
let minute = date.getMinutes();
console.log(hour, minute);

function generate() {
  if (amount.value == "") {
    err.innerHTML = "Amount cannot be empty";
    err.hidden = false;
    setTimeout(() => {
      err.hidden = true;
    }, 3000);
    return;
  } else if (amount.value < 100) {
    err.innerHTML = "Amount should be greater than #100";
    err.hidden = false;
    setTimeout(() => {
      err.hidden = true;
    }, 3000);
    return;
  }

  getPin();
  generatedPin.hidden = false;
  save.hidden = false;
}

function savePin() {
  let network1 = document.getElementById("text").value;
  let amount1 = document.getElementById("amount").value;
  data = {
    network: network1,
    amount: amount1,
    pin: gPin,
    status: "UNUSED",
  };
  myar.push(data);
  create();
  generatedPin.hidden = true;
  save.hidden = true;
}

function create() {
  localStorage.setItem("cardTable", JSON.stringify(myar));
  show();
}

function show() {
  display.innerHTML = "";
  display.innerHTML += `<tr>
    <th>S/N</th>
        <th>NETWORK</th>
        <th>AMOUNT</th>
        <th>CODE</th>
        <th>STATUS</th>
        <th>TIME</th>
        <th>ACTION</th>
    </tr>`;
  myar.forEach(function (ele, i) {
    display.innerHTML += `<tr>
    <td> ${i + 1}</td> 
    <td> ${ele.network}</td> 
    <td> ${ele.amount}</td> 
    <td> ${ele.pin}</td> 
    <td> <p>${ele.status}</p> </td> 
    <td> <p>${hour}:${minute}</p> </td> 
    <td> <button class=" w-50 btn btn-danger " onclick='del(${i})'>Del</button> </td> 
    </tr>`;
  });
}
function del(params) {
  // alert();
  myar.splice(params, 1);
  create();
}
let pin;
function getPin() {
  pin = Math.trunc(10000000000 + Math.random() * 9000000000);
  generatedPin.innerHTML = pin;

  if (network1.value == "MTN") {
    gPin = `*555*${pin}#`;
  }
  if (network1.value == "AIRTEL") {
    gPin = `*126*${pin}#`;
  }
  if (network1.value == "GLO") {
    gPin = `*126*${pin}#`;
  }
  if (network1.value == "9MOBILE") {
    gPin = `*111*${pin}#`;
  }
  // gPin.value = pin;
}

seen = false;
let load = document.getElementById("load");
function loadCard() {
  if (load.value == "") {
    err2.innerHTML = "Pin Cannot be empty";
    err2.hidden = false;
    setTimeout(() => {
      err2.hidden = true;
    }, 3000);
  } else {
    myar.forEach((element, index) => {
      if (load.value === element.pin) {
        if (element.status == "USED") {
          err2.innerHTML = "Pin is already used";
          err2.hidden = false;
          setTimeout(() => {
            err2.hidden = true;
          }, 3000);
          seen = true;
        } else if (element.status !== "USED" && load.value !== "") {
          none.hidden = false;
          sho.innerHTML = `YOU HAVE SUCCESSFULLY RECHARGE ${ele.amount} CARD`;
          setTimeout(() => {}, 3000);
          myar[index].status = "USED";
          localStorage.setItem("cardTable", JSON.stringify(myar));
          create();
        }
      } else {
        err2.innerHTML = "INVALID PIN";
        err2.hidden = false;
        setTimeout(() => {
          err2.hidden = true;
        }, 3000);
      }
    });
  }
}

let items;
function localStorageData() {
  let items = localStorage.getItem("cardTable");
  if (items) {
    myar = JSON.parse(items);
  } else {
    myar = myar;
  }
  show();
}
localStorageData();
