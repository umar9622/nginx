const myBtn = document.getElementById("myBtn");
myBtn.addEventListener('click', function () {
  checkServer();
});

function checkServer() {
  fetch("http://127.0.0.1:5000/api/status")
    .then(response => response.json())
    .then(data => dis.textContent = `status : ${data.status} , message : ${data.message} , service : ${data.service}`)
    .catch(error => console.error(error))  ;

}



