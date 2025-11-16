//import functions
import { addWorker } from "./crud.js";

// open and close modal of add new worker
const openMoadlBtn = document.getElementById("open_Modal");
const closeModalBtn = document.getElementById("close_modal");
const formModal = document.getElementById("form_modal");

openMoadlBtn.addEventListener("click", () => {
  formModal.classList.remove("hidden");
});
closeModalBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formModal.classList.add("hidden");
});

//add new worker
//worker info
const workerName = document.getElementById("worker_name").value;
const role = document.getElementById("role").value;
const imageUrl = document.getElementById("img_url").value;
const workerInfo = {
    id: new Date().getDate().toString(),
    workerName: workerName,
    role: role,
    img: imageUrl,
};

//worker exp
const companyName = document.getElementById("company_name").value;
const expRole = document.getElementById("exp_role").value;
const fromDate = document.getElementById("from_date").value;
const ToDate = document.getElementById("to_date").value;
const email = document.getElementById("email").value;
const workerExperience = {
  companyName: companyName,
  expRole: expRole,
  fromDate: fromDate,
  todate: ToDate,
  email: email,
};

//save worker 
const saveWorkerBtn = document.getElementById("save_worker")
saveWorkerBtn.addEventListener("click" , (e)=>{
    e.preventDefault()
    addWorker(workerInfo);
})

