
const workers = {
  
  workerInfo : [],
  workerExper : []
}


//add worker information
function addWorker(Info){
  workers.workerInfo.push(Info)
  console.log("worker info" , workers)
  SvaeWorkerLocalstorage()
}
//render workers info
function renderWorkerInfo(){
  const unssignedWorkersZone = document.getElementById("unssigned_workers")
  unssignedWorkersZone.innerHTML = workers.workerInfo.map((worker)=>{
     return`
      <div class="flex item-center justify-around bg-gray-200 p-2 rounded-md my-3">
      <img src = ${worker.img} alt ="${worker.workerName}image" class="h-12 w-12 rounded-full">
      <div>
      <h2>${worker.workerName}</h2>
      <p>${worker.role}</p>
      </div>
      <p class = "text-orange-400">Edit</p>
      </div>
     `
  }).join("")
}



function SvaeWorkerLocalstorage(){
    localStorage.setItem("worker" , JSON.stringify(workers))
}
export{addWorker , renderWorkerInfo}