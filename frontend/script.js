const myBtn = document.getElementById("myBtn");
myBtn.addEventListener('click', function () {
  checkServer();
});

function checkServer() {
  fetch("http://127.0.0.1:5000/api/status")
    .then(response => {
      console.log(response);
      return response.json().then(data => ({
        status: response.status,
        ok: response.ok,
        statusText: response.statusText,
        data: data
      }));
    })
    
    .then(result => {
      if (result.ok) {
        dis.textContent = `HTTP ${result.status} - ${result.data.message}`;
      } else {
        dis.textContent = `HTTP ${result.status} - ${result.statusText}`;
      }
    })
    .catch(error => console.error(error));

}



