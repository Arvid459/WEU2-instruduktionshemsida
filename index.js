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

      document.getElementById("name").value = "";
      document.getElementById("pNumber").value = "";
      document.getElementById("adress").value = "";
      document.getElementById("email").value = "";
      document.getElementById("subject").value = "";

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

function copyCode(button) {
  const code = button.nextElementSibling.innerText;
  navigator.clipboard
    .writeText(code)
    .then(() => {
      const originalText = button.textContent;
      button.textContent = "Copied!";
      setTimeout(() => {
        button.textContent = originalText;
      }, 1500);
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
}
document.getElementById("toggleButton").addEventListener("click", () => {
  const chatBox = document.getElementById("chatEllipse");
  chatBox.classList.toggle("open");
});



function toggleChat() {
  const chatBox = document.getElementById("chatBox");
  chatBox.style.display = chatBox.style.display === "block" ? "none" : "block";
}


async function sendPrompt() {
  const prompt = document.getElementById("userPrompt").value;
  document.getElementById("response").innerText = "Thinking...";

  const response = await fetch("http://127.0.0.1/something.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  const data = await response.json();
  document.getElementById("response").innerText =
    data.choices?.[0]?.message?.content || "No response.";
}
