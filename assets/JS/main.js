//import functions
import { addWorker , renderWorkerInfo ,addWorkerExperinece } from "./crud.js";
import { clearForm } from "./ui.js";
// open and close modal of add new worker
const openMoadlBtn = document.getElementById("open_Modal");
const closeModalBtn = document.getElementById("close_modal");
const formModal = document.getElementById("form_modal");

const OpenModal=()=>{
  openMoadlBtn.addEventListener("click", () => {
  formModal.classList.remove("hidden");
});
}
function closeModal(){
  closeModalBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formModal.classList.add("hidden");
  });

}
OpenModal()

//add new worker


//save worker 
const saveWorkerBtn = document.getElementById("save_worker")
saveWorkerBtn.addEventListener("click" , (e)=>{
  //worker info
  const workerName = document.getElementById("worker_name").value;
  const role = document.getElementById("role").value;
  const imageUrl = document.getElementById("img_url").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const workerInfo = {
    id : new Date().getTime().toString(),
    workerName: workerName,
    role: role,
    img: imageUrl,
    email: email,
    phone : phone
  };
  //worker exp
  const companyName = document.getElementById("company_name").value;
  const expRole = document.getElementById("exp_role").value;
  const fromDate = document.getElementById("from_date").value;
  const ToDate = document.getElementById("to_date").value;
  const ExperienceData = {
    companyName: companyName,
    expRole: expRole,
    fromDate: fromDate,
    todate: ToDate,
  };
    e.preventDefault()
    addWorker(workerInfo);
    addWorkerExperinece(ExperienceData)
    clearForm()
    closeModal()
    renderWorkerInfo()
})

