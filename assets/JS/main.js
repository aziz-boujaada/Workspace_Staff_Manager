//import functions
import { addWorker , renderWorkerInfo , loadWorkers } from "./crud.js";
import { clearForm ,renderExperienceForm, renderWorkerModal  } from "./ui.js";
import { validateForm } from "./ValidationForm.js";
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
closeModal()
//add new worker

document.addEventListener("DOMContentLoaded",()=>{
  const loadedWorkers = loadWorkers()
  renderWorkerInfo(loadedWorkers)
     renderWorkerModal()
})
//save worker 
const saveWorkerBtn = document.getElementById("save_worker")
saveWorkerBtn.addEventListener("click" , (e)=>{
  e.preventDefault()
  //worker info
  const workerName = document.getElementById("worker-name").value;
  const role = document.getElementById("role").value;
  const imageUrl = document.getElementById("img-url").value;
  const email = document.getElementById("worker-email").value;
  const phone = document.getElementById("worker-phone").value;
  const workerInfo = {
    id : new Date().getTime().toString(),
    workerName: workerName,
    role: role,
    img: imageUrl,
    email: email,
    phone : phone,
    experiences : getExperiences() 
  };
  
  
    
    

    if(!validateForm())return
    addWorker(workerInfo);
    
    renderWorkerInfo(loadWorkers())
    clearForm()
        formModal.classList.add("hidden");
    // closeModal()
})
  


function getExperiences(){
   //worker exp
  const expValues = document.getElementsByClassName("exp_items")
  const expArray = []
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
    expArray.push(ExperienceData)
    
}
return expArray
}

