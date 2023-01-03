const url = "http://localhost:8080/clientB/home";
fetch(url, {
  method: "GET",
  mode: "no-cors",
})
  .then((res) => res.json())
  .then((response) => console.log("Success:", response))
  .catch((error) => console.error("Error:", error));
