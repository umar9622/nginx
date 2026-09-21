let serverAvailable = false;

// CHECK SERVER BUTTON
const myBtn = document.getElementById("myBtn");
myBtn.addEventListener("click", function () {
  checkServer();
});

// CALCULATOR BUTTON
const addnum = document.getElementById("addBtn");
addnum.addEventListener("click", function () {
  addfuc();
});

// CHECK BACKEND STATUS
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
      // Update backend availability
      serverAvailable = result.ok;
      if (result.ok) {
        dis.textContent =
          `HTTP ${result.status} - ${result.data.message}`;
      } else {
        dis.textContent =
          `HTTP ${result.status} - ${result.statusText}`;
      }
    })

    .catch(error => {
      serverAvailable = false;
      dis.textContent = "Cannot connect to backend";
      console.error(error);

    });
}
// CALCULATOR
function addfuc() {
 // didn't send request if backend is unavailable
  if (!serverAvailable) {
    disTotal.textContent = "Backend is unavailable";
    return;
  }
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
      return response.json().then(data => ({
        ok: response.ok,
        status: response.status,
        statusText: response.statusText,
        data: data
      }));
    })
    .then(result => {
      if (result.ok) {
        disTotal.textContent =
          `Backend response: ${result.data.result}`;
      } else {
        // Backend responded but with an error
        serverAvailable = false;
        disTotal.textContent =
          `Backend response: ${result.statusText} - ${result.status}`;
      }
    })
    .catch(error => {
      // Backend completely unreachable
      serverAvailable = false;
      disTotal.textContent =
        "Cannot connect to backend";
      console.error(error);

    });

}
