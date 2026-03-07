// const allButton =document.getElementById("all-button");
// const openButton =document.getElementById("open-button");
// const closedButton =document.getElementById("closed-button");

function button(tab) {
  const buttons = ["all", "open", "closed"];
  for (const button of buttons) {
    const takeButtons = document.getElementById(button + "-button");
    if (button === tab) {
      takeButtons.classList.add("btn-primary");
    } else {
      takeButtons.classList.remove("btn-primary");
    }
  }
}
