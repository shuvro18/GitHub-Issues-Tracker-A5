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

const fetchFn = (f) => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => display(data.data));
};

const display = (alls) => {
  const issueContainer = document.getElementById("issue-container");
  issueContainer.innerHTML = "";
  console.log(issueContainer)
  alls.forEach((all) => {
    const div = document.createElement("div")
    div.innerHTML =`
    
                    <div class=" border-t-3 bg-base-100 border-green-500 rounded-xl p-4 m-5">
                        <div class="flex justify-between items-center">
                            <img src="./assets/Open-Status.png" alt="">
                            <span class="btn rounded-full">HIGH</span>
                        </div>
                        <div>
                            <p class="font-bold pt-2">Fix navigation menu on mobile devices</p>
                            <p class="text-neutral/50 text-[13px]">The navigation menu doesn't collapse properly on mobile devices...</p>
                        </div>
                        <div class="flex gap-9 items-center py-5">
                            <span><i class="fa-solid fa-bug"></i> Bug</span>
                            <span><i class="fa-regular fa-life-ring"></i> help wanted</span>
                        </div>
                        <hr class="text-neutral/30">
                        <div class="text-[13px] text-neutral/50 py-3 space-y-2">
                            <p>#1 by john_doe</p>
                            <p>1/15/2024</p>
                        </div>
                    </div>
    
    `
    issueContainer.append(div)
  });
};

fetchFn();
