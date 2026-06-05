const searchInput =
document.getElementById("searchInput");

searchInput.addEventListener("keyup", function(){

let value = this.value.toLowerCase();

let products =
document.querySelectorAll(".product");

products.forEach(product => {

let text =
product.innerText.toLowerCase();

product.style.display =
text.includes(value)
? "block"
: "none";

});

});