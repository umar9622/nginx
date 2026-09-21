let serverAvailable = false;

const myBtn = document.getElementById("myBtn");
myBtn.addEventListener('click', function () {
  checkServer();
});

const addnum = document.getElementById("addBtn");
addnum.addEventListener('click', function(){
  addfuc();
})

function checkServer() {
  fetch("http://127.0.0.1:5000/status")
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
    .catch(() => dis.textContent = "Cannot connect to backend");

}

function addfuc() {
  const num1 = document.getElementById("number1");
  const num2 = document.getElementById("number2");

  const data = {
    num1: Number(num1.value),
    num2: Number(num2.value)
  };
      fetch("http://127.0.0.1:5000/calculator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
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
            disTotal.textContent = `Backend response: ${result.data.result}`;
          } else {
            disTotal.textContent = `Backend response: ${result.statusText} - ${result.status}`;
        }
        
      })
      .catch(error => console.error(error));
}
