const issueContainer = document.getElementById("issue-container");
const openContainer = document.getElementById("open-container");
const closedContainer = document.getElementById("closed-container");
const totalCount = document.getElementById("total-number");
let currentStatus = "all";

const span = (arr) => {
  const html = arr.map(
    (el) =>
      `<span class="btn btn-outline ${el === "bug" ? "btn-secondary" : " btn-warning"}">${el === "bug" ? "<i class='fa-solid fa-bug'></i>" : "<i class='fa-solid fa-life-ring'></i>"} ${el}</span>`,
  );
  return html.join(" ");
};

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

  const allIssueContainer = [issueContainer, openContainer, closedContainer];
  for (const a of allIssueContainer) {
    a.classList.add("hidden");
  }

  if (tab === "all") {
    issueContainer.classList.remove("hidden");
  } else if (tab === "open") {
    openContainer.classList.remove("hidden");
  } else if (tab === "closed") {
    closedContainer.classList.remove("hidden");
  } else if (tab === "search") {
    closedContainer.classList.add("hidden");
    openContainer.classList.add("hidden");
    issueContainer.classList.remove("hidden");
  }
}

// all button
document.getElementById("all-button").addEventListener(
  "click",
  (ghurar = (dim) => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
      .then((res) => res.json())
      .then((data) => display(data.data));
  }),
);

// open button

document.getElementById("open-button").addEventListener("click", () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => displayOpen(data.data));
});
const displayOpen = (alls) => {
  // console.log(alls);
  const issueContainer = document.getElementById("open-container");
  issueContainer.innerHTML = "";
  let count = 0;
  alls.forEach((all) => {
    if (all.status !== "open") {
      return;
    }
    const div = document.createElement("div");
    div.innerHTML = `
    
                    <div onclick="infoFn(${all.id})" class=" border-t-3 bg-base-100 ${all.status === "open" ? "border-green-500" : "border-violet-500"}  rounded-xl p-4 m-5">
                        <div class="flex justify-between items-center">
                            ${all.priority === "low" ? "<i class='fa-regular fa-circle-check'></i>" : "<img src='./assets/Open-Status.png'>"}
                            <span class="btn rounded-full">${all.priority}</span>
                        </div>
                        <div>
                            <p class="font-bold pt-2">${all.title}</p>
                            <p class="text-neutral/50 text-[13px]">${all.description}</p>
                        </div>
                        <div class="flex gap-9 items-center py-5">
                            ${span(all.labels)}
                        </div>
                        <hr class="text-neutral/30">
                        <div class="text-[13px] text-neutral/50 py-3 space-y-2">
                            <p>${all.author}</p>
                            <p>${all.createdAt}</p>
                        </div>
                    </div>
    
    `;
    count++;
    totalCount.innerText = count;
    issueContainer.append(div);
  });
};

// closed button
document.getElementById("closed-button").addEventListener("click", () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => displayClosed(data.data));
});

const displayClosed = (alls) => {
  // console.log(alls);
  const issueContainer = document.getElementById("closed-container");
  issueContainer.innerHTML = "";
  let count = 0;
  alls.forEach((all) => {
    if (all.status !== "closed") {
      return;
    }
    const div = document.createElement("div");
    div.innerHTML = `
    
                    <div onclick="infoFn(${all.id})" class=" border-t-3 bg-base-100 ${all.status === "open" ? "border-green-500" : "border-violet-500"}  rounded-xl p-4 m-5">
                        <div class="flex justify-between items-center">
                            ${all.priority === "low" ? "<i class='fa-regular fa-circle-check'></i>" : "<img src='./assets/Open-Status.png'>"}
                            <span class="btn rounded-full">${all.priority}</span>
                        </div>
                        <div>
                            <p class="font-bold pt-2">${all.title}</p>
                            <p class="text-neutral/50 text-[13px]">${all.description}</p>
                        </div>
                        <div class="flex gap-9 items-center py-5">
                            ${span(all.labels)}
                        </div>
                        <hr class="text-neutral/30">
                        <div class="text-[13px] text-neutral/50 py-3 space-y-2">
                            <p>${all.author}</p>
                            <p>${all.createdAt}</p>
                        </div>
                    </div>
    
    `;
    count++;
    totalCount.innerText = count;
    issueContainer.append(div);
  });
};

// {
//     "id": 2,
//     "title": "Add dark mode support",
//     "description": "Users are requesting a dark mode option. This would improve accessibility and user experience.",
//     "status": "open",
//     "labels": [
//         "enhancement",
//         "good first issue"
//     ],
//     "priority": "medium",
//     "author": "sarah_dev",
//     "assignee": "",
//     "createdAt": "2024-01-14T14:20:00Z",
//     "updatedAt": "2024-01-16T09:15:00Z"
// }

const infoFn = (id) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showModal(data.data));
};

// modals
const showModal = (modal) => {
  const modalBox = document.getElementById("modal-box");
  modalBox.innerHTML = `
        <div>
            <h2 class="font-bold text-xl">${modal.title ? modal.title : "No match found"}</h2>
            <div class="flex items-center gap-3 py-4">
                <button class="btn rounded-full">${modal.status}</button>
                <p class="text-[14px] text-neutral/50">Opened by ${modal.author}</p>
                <p class="text-[14px] text-neutral/50">${modal.createdAt}</p>
            </div>
            <div class="flex gap-9 items-center py-5">
                ${span(modal.labels)}
            </div>
            <p class="text-neutral/50 pb-4">${modal.description}</p>
            <div class="bg-base-200 p-4 flex gap-39">
                <p>Assignee: <br>
                ${modal.author}</p>
                <p>
                    Priority: <br>
                    <span class="btn rounded-full bg-pink-500">${modal.priority}</span>
                </p>
            </div>
        </div>


  `;
  document.getElementById("my_modal_5").showModal();
};

// all issues button
const display = (alls) => {
  // console.log(alls);
  const issueContainer = document.getElementById("issue-container");
  issueContainer.innerHTML = "";
  let count = 0;
  alls.forEach((all) => {
    const div = document.createElement("div");
    div.innerHTML = `
    
                    <div onclick="infoFn(${all.id})" class=" border-t-3 bg-base-100 ${all.status === "open" ? "border-green-500" : "border-violet-500"}  rounded-xl p-4 m-5">
                        <div class="flex justify-between items-center">
                            ${all.priority === "low" ? "<i class='fa-regular fa-circle-check'></i>" : "<img src='./assets/Open-Status.png'>"}
                            <span class="btn rounded-full">${all.priority}</span>
                        </div>
                        <div>
                            <p class="font-bold pt-2">${all.title}</p>
                            <p class="text-neutral/50 text-[13px]">${all.description}</p>
                        </div>
                        <div class="flex gap-9 items-center py-5">
                            ${span(all.labels)}
                        </div>
                        <hr class="text-neutral/30">
                        <div class="text-[13px] text-neutral/50 py-3 space-y-2">
                            <p>${all.author}</p>
                            <p>${all.createdAt}</p>
                        </div>
                    </div>
    
    `;
    count++;
    totalCount.innerText = count;
    issueContainer.append(div);
  });
};
// if nothing is found (search)
const displayEmty = (nothing) => {
  const emty = document.getElementById("emty");
  emty.innerHTML = `
  
                    <h1 class="text-2xl font-bold">
                        found nothing
                    </h1>
  
  `;
};

// search
document.getElementById("search-button").addEventListener("click", () => {
  const input = document.getElementById("input").value.trim().toLowerCase();

  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${input}`)
    .then((res) => res.json())
    .then((data) => {
      const apiData = data.data;
      const filter = apiData.filter((word) =>
        word.title.toLowerCase().includes(input),
      );
      if (filter.length === 0) {
        totalCount.innerText = "0";
        displayEmty(filter);
      }
      display(filter);
    });
});

window.onload = () => {
  ghurar("dim");
};

// console.log(showModal().childElementCount);
