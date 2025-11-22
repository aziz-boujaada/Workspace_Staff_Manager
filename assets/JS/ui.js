//clear form after save

import { getWorker, loadWorkers } from "./crud.js";
// import { getWorker } from "./crud.js";
import { assignWorkers  } from "./assignWorkers.js";
function clearForm() {
  const Form = document.getElementById("form");
  Form.reset();
}

//render experience form
function renderExperienceForm() {
  const add_expBtn = document.getElementById("add_exp");
  const displayForm = document.getElementById("expForm");
  add_expBtn.addEventListener("click", (e) => {
    e.preventDefault();
   displayForm.innerHTML += `
  <div id="experience_form" class="exp_items border-t pt-4 bg-gray-100 rounded-md shadow-xl p-2 mt-2">
    <button type="button" class="close_exp_form flex float-end justify-end bg-gray-300 p-2 rounded-full hover:bg-red-100 hover:text-red-600 transition">
      <i class="fa-solid fa-xmark"></i>
    </button> 
    
    <h3 class="text-lg font-semibold text-gray-800">Experience</h3>
    
    <div class="flex flex-col gap-1">
      <label for="company_name" class="font-medium text-gray-700">Company Name</label>
      <input type="text" placeholder="Company name" class="company_name border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600 outline-none" />
      <div class="company-name-error error hidden text-red-500 text-sm"></div>
    </div>
    
    <div class="flex flex-col gap-1">
      <label for="exp_role" class="font-medium text-gray-700">Role</label>
      <input type="text" placeholder="Role..." class="exp_role border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600 outline-none" />
      <div class="role-error error hidden text-red-500 text-sm"></div>
    </div>

    <div class="grid grid-cols-2 gap-3">
      <div class="flex flex-col gap-1">
        <label for="from_date" class="font-medium text-gray-700">From</label>
        <input type="date" class="form_date border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600 outline-none" />
        <div class="from-date-error error hidden text-red-500 text-sm"></div>
      </div>

      <div class="flex flex-col gap-1">
        <label for="to_date" class="font-medium text-gray-700">To</label>
        <input type="date" class="to_date border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600 outline-none" />
        <div class="to-date-error error hidden text-red-500 text-sm"></div>
      </div>
    </div>
  </div>
`;
        const closeExpForm = document.querySelectorAll(".close_exp_form")
        closeExpForm.forEach((btn)=>{
          btn.addEventListener("click" , (e)=>{
             const expForm = e.target.closest(".exp_items")
             expForm.classList.add("hidden")
          })
        })
  });
}
renderExperienceForm();
function renderWorkerModal() {
  const informationModal = document.getElementById("worker_info_modal");
  const workerCard = document.querySelectorAll(".worker_card");
  console.log("card", workerCard);
  workerCard.forEach((card) =>
    card.addEventListener("click", (e) => {
      const workerId = e.target.closest(".worker_card").dataset.id;
      const worker = getWorker(workerId);
      console.log("the worker", worker);
      console.log("id", workerId);

      console.log("card clicked", workerCard);
      informationModal.classList.remove("hidden");

     let modalContent = `
<div class="bg-white w-[95%] sm:w-[500px] max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl p-6 relative font-sans">
  <div class="text-right mb-4">
    <button id="" type="button" class="close_worker_modal bg-gray-300 p-2 rounded-full hover:bg-red-100 hover:text-red-600 transition">
      <i class="fa-solid fa-xmark"></i>
    </button>
  </div>
  <div class="flex items-center justify-between mb-6">
    <div class="">
      <p class="text-lg font-semibold text-gray-800 mb-1">${worker.workerName}</p>
      <p class="text-gray-600">${worker.role}</p>
    </div>
    <img src="${worker.img}" alt="${worker.workerName}" class="h-24 w-24 rounded-full border-4 border-green-400 object-cover shadow-md">
  </div>
  <h3 class="mt-4 mb-3 font-bold text-gray-700 text-right border-b border-gray-200 pb-1">Experiences</h3>
  <div class="space-y-3">
    ${worker.experiences
      .map(
        (exp) => `
      <div class="bg-slate-100 p-4 rounded-lg shadow-sm hover:shadow-md transition">
        <p class="font-semibold text-gray-800">Company: ${exp.companyName}</p>
        <p class="text-gray-600">Role: ${exp.expRole}</p>
        <p class="text-gray-500 text-sm">From: ${exp.fromDate}</p>
        <p class="text-gray-500 text-sm">To: ${exp.ToDate}</p>
      </div>
    `
      )
      .join("")}
  </div>
</div>
`;

informationModal.innerHTML = modalContent;

    })
  );
  //closz modal
  informationModal.addEventListener("click" , (e)=>{
    if(e.target.closest(".close_worker_modal")){
  
      informationModal.classList.add("hidden")
    }
  })
}



export { clearForm, renderExperienceForm, renderWorkerModal };
