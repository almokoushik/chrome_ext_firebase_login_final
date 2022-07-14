document.getElementById("popupbutton").addEventListener("click", async () => {
  //   console.log("I am clicked");
  let email = document.getElementById("email").value;

  let message = {
    text: email,
  };

  let options = {};

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  //   console.log(tab);
  chrome.tabs.sendMessage(tab.id, message, (resp) => {});
});
