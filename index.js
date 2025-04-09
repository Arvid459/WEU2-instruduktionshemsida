
  async function fetchLastUpdated() {
    try {
      const response = await fetch("https://api.github.com/repos/Arvid459/WEU2-instruduktionshemsida/commits");
      const data = await response.json();
      const latestCommit = data[0].commit.committer.date;
      const formattedDate = new Date(latestCommit).toLocaleDateString("sv-SE", {
        year: "numeric", month: "long", day: "numeric"
      });
      document.getElementById("lastUpdate").textContent = `Senast uppdaterad: ${formattedDate}`;
    } catch (error) {
      document.getElementById("lastUpdate").textContent = "Kunde inte hämta uppdateringsdatum.";
      console.error(error);
    }
  }

  fetchLastUpdated();

