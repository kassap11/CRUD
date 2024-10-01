let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let disacount = document.getElementById("disacount");
let total = document.getElementById("total");
let category = document.getElementById("category");
let count = document.getElementById("count");
let submit = document.getElementById("submit");
let mode = "create";
let tem;

// console.log(title, price, taxes, ads, category, count, total, disacount);
//get total:
function gettotal() {
  if (price.value != " ") {
    let result = +price.value + +taxes.value + +ads.value - +disacount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = " ";
    total.style.background = "rgb(144, 35, 35);";
  }
}

//create product

let datapro;
if (localStorage.product != null) {
  datapro = JSON.parse(localStorage.product);
} else {
  datapro = [];
}

submit.onclick = function () {
  let newpro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    disacount: disacount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };

  //count
  if (mode === "create") {
    if (newpro.count > 1) {
      for (let i = 0; i < newpro.count; i++) {
        datapro.push(newpro);
      }
    } else {
      datapro.push(newpro);
    }
  } else {
    datapro[tem] = newpro;
    mode = "create";
    submit.innerHTML="create";
    count.style.display = "block";
  }

  localStorage.setItem("product", JSON.stringify(datapro));
  // console.log(datapro);
  cleardata();
  showdata();
};

//clear data

function cleardata() {
  (title.value = ""),
    (price.value = ""),
    (ads.value = ""),
    (taxes.value = ""),
    (category.value = ""),
    (disacount.value = ""),
    (total.innerHTML = ""),
    (count.value = "");
}

//show Data
function showdata() {
  let table = " ";
  for (let i = 0; i < datapro.length; i++) {
    table += `
         <tr>
                        <td>${i}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].disacount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="delet(${i})"  id="delete">delete</button></td>

                    </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
  // let btndelet=document.getElementById("")
}

showdata(); //عشان الداله تشتغل ع طول مش شرط اضغط ع الزرار

function delet(i) {
  datapro.splice(i, 1);
  localStorage.product = JSON.stringify(datapro); // عشان لما احذف عنصر يتحذف من localstorage
  showdata(); //عشان كل مره بعد اما احذف العنصر يتغير ف الصفحه
}

//updata
function updateData(i) {
  title.value = datapro[i].title;
  price.value = datapro[i].price;
  taxes.value = datapro[i].taxes;
  ads.value = datapro[i].ads;
  disacount.value = datapro[i].disacount;
  gettotal();
  count.style.display = "none";
  category.value = datapro[i].category;
  submit.innerHTML = "update";
  mode = "update";
  tem = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
