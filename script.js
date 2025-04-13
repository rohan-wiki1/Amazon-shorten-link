async function shortenUrl() {
    const longUrl = document.getElementById("longUrl").value;
    if (!longUrl) {
      document.getElementById("result").innerText = "Please enter a URL.";
      return;
    }
  
    const token = "d4eb52703f3c99c45e41d1955371fb177bd65842";  // Secure your API token
    const response = await fetch("https://api-ssl.bitly.com/v4/shorten", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ long_url: longUrl })
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      document.getElementById("result").innerText = `Error: ${errorData.description || "Unknown error"}`;
      return;
    }
  
    const data = await response.json();
    const shortenedLink = data.link || "Error shortening URL";
    document.getElementById("result").innerText = shortenedLink;
  
    // Show the "Copy Link" button and enable copying
    document.getElementById("copyButton").style.display = "inline";
    document.getElementById("copyButton").setAttribute("data-clipboard-text", shortenedLink);
  
    document.getElementById("longUrl").value = "";  // Clear input after shortening
  }
  
  // Function to copy the shortened URL to clipboard
  function copyLink() {
    const link = document.getElementById("result").innerText;
    const textArea = document.createElement("textarea");
    textArea.value = link;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    alert("Link copied to clipboard!");
  }
  