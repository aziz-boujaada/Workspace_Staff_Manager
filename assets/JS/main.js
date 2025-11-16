//import functions
import { addWorker , renderWorkerInfo ,addWorkerExperinece } from "./crud.js";
import { clearForm ,renderExperienceForm } from "./ui.js";
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
  e.preventDefault()
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
  const expValues = document.getElementsByClassName("exp_items")
  for(let expVal of expValues){
    const companyName = expVal.querySelector(".company_name").value
    const expRole = expVal.querySelector(".exp_role").value;
    const fromDate = expVal.querySelector(".from_date").value;
    const ToDate = expVal.querySelector(".to_date").value;
    const ExperienceData = {
      companyName , 
      expRole,
      fromDate,
      ToDate,
    };
    

    addWorkerExperinece(ExperienceData)
  }
    e.preventDefault()
    addWorker(workerInfo);
    renderWorkerInfo()
    clearForm()
    closeModal()
})

