function loadWorkers() {
  const workers = localStorage.getItem("worker");
  return workers ? JSON.parse(workers) : [];
}
// workerName: workerName,
//   role: role,

//add worker information
function addWorker(Info) {
  let workers = loadWorkers();
  workers.push(Info);

  // console.log("worker info" , workersObj)
  localStorage.setItem("worker", JSON.stringify(workers));
}
//add worker experience
// function addWorkerExperinece(ExperienceData){
//  workersObj.workerExper.push(ExperienceData)
//  console.log("workers",workersObj.workerExper)
//  SvaeWorkerLocalstorage()
// }
//render workers info
function renderWorkerInfo(workers) {
  const unssignedWorkersZone = document.getElementById("unssigned_workers");
  unssignedWorkersZone.innerHTML = "";
  for (let worker of workers) {
    unssignedWorkersZone.innerHTML += `
     <div id = "" class="worker_card flex item-center justify-around bg-gray-200 p-2 rounded-md my-3 listing" data-id="${worker.id}">
     <img src = ${worker.img} alt ="${worker.workerName}image" class="h-12 w-12 rounded-full">
     <div>
     <h2>${worker.workerName}</h2>
     <p>${worker.role}</p>
     </div>
     <p class = " text-orange-400 "><i class="fa-solid fa-pen hover:text-yellow-700 cursor-pointer"></i></p>
     <button" class = "delet_btn text-red-700 hover:text-red-400 cursor-pointer "><i class="fa-solid fa-trash"></i></button>
     </div>
    `;
  }
  unssignedWorkersZone.addEventListener("click", (e) => {
    if (e.target.closest(".delet_btn")) {
      const id = e.target.closest(".listing").dataset.id;
      console.log(id);
      deletWorker(id);
    }
  });
}

// // //delet worker from unsigned staff
function deletWorker(id) {
  let workers = loadWorkers();
  console.log(workers);
  workers = workers.filter((worker) => worker.id !== id);
  console.log(workers);
  //  SvaeWorkerLocalstorage()
  renderWorkerInfo(workers);

  localStorage.setItem("worker", JSON.stringify(workers));
}

function getWorker(id) {
  let worker = loadWorkers();
  return (worker = worker.find((worker) => worker.id == id));
}

function SearchByNameOrRole() {
  const searchInput = document.getElementById("search_input");
  const workers = loadWorkers();
  console.log("workers loaded", workers);
  searchInput.addEventListener("input", (e) => {
    const inputValue = e.target.value;
    const finded = workers.filter(
      (w) =>
        w.workerName.toLowerCase().includes(inputValue.toLowerCase()) ||
        w.role.toLowerCase().includes(inputValue.toLowerCase())
    );
    console.log("find", finded);

    renderWorkerInfo(finded);
  });
}
SearchByNameOrRole();
export { addWorker, renderWorkerInfo, loadWorkers, getWorker };
