let instructionsBTN = document.querySelector(".instructionsBtn");
let instructionsDropDown = document.querySelector(".instructionsDropDown");
let submitForm = document.getElementById("submit");

instructionsBTN.onclick = function () {
  changeVisibility(instructionsDropDown);
};

async function fetchLastUpdated() {
  try {
    const response = await fetch(
      "https://api.github.com/repos/Arvid459/WEU2-instruduktionshemsida/commits"
    );
    const data = await response.json();
    const latestCommit = data[0].commit.committer.date;
    const formattedDate = new Date(latestCommit).toLocaleDateString("sv-SE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    document.getElementById("lastUpdate").textContent = `${formattedDate}`;
  } catch (error) {
    document.getElementById("lastUpdate").textContent =
      "Kunde inte hämta uppdateringsdatum.";
    console.error(error);
  }
}

fetchLastUpdated();

submitForm.onclick = async function (e) {
  e.preventDefault();

  let name = document.getElementById("name").value;
  let pNumber = document.getElementById("pNumber").value;
  let adress = document.getElementById("adress").value;
  let email = document.getElementById("email").value;
  let subject = document.getElementById("subject").value;

  console.log(
    name + " " + pNumber + " " + adress + " " + email + " " + subject
  );
  try {
    const response = await fetch("http://127.0.0.1/sendmail.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        pNumber: pNumber,
        adress: adress,
        email: email,
        subject: subject,
      }),
    });
    const data = await response.json();
    if (data.status === "success") {
      submitForm.value = "Message sent!";

      // Clear form fields
      document.getElementById("name").value = "";
      document.getElementById("pNumber").value = "";
      document.getElementById("adress").value = "";
      document.getElementById("email").value = "";
      document.getElementById("subject").value = "";

      // Wait 5 seconds, then reset button
      setTimeout(() => {
        submitForm.value = "Submit";
      }, 2000);
    } else {
      alert("Error: " + data.message);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Could not send email.");
  }
};

document.addEventListener("click", function (e) {
  if (!e.target.closest(".instructionsDropDown-container")) {
    instructionsDropDown.style.display = "none";
  }
});

function changeVisibility(e) {
  e.style.display = e.style.display === "block" ? "none" : "block";
}

/*




*/
