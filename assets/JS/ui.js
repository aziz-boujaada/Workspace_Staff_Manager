//clear form after save 
 function clearForm(){
    const Form = document.getElementById("form")
    Form.reset();
}

//render experience form 
function renderExperienceForm(){
    const add_expBtn = document.getElementById("add_exp")
    const displayForm = document.getElementById("expForm")
    add_expBtn.addEventListener("click" ,(e)=>{
        e.preventDefault()
        displayForm.innerHTML += `
          <div id="experience_form" class=" exp_items border-t pt-4 bg-gray-100 rounded-md shadow-xl p-2 mt-2">
      <h3 class="text-lg font-semibold text-gray-800">Experience</h3>

      <div class="flex flex-col gap-1">
        <label for="company_name" class="font-medium text-gray-700 ">Company Name</label>
        <input type="text"  placeholder="Company name" class=" company_name border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600 outline-none" />
        <div class="company-name-error erroe" ></div>
      </div>
      
      <div class="flex flex-col gap-1">
        <label for="exp_role" class="font-medium text-gray-700">Role</label>
        <input type="text"  placeholder="Role..." class=" exp_role border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600 outline-none" />
        <div class="role-error erroe" ></div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div class="flex flex-col gap-1">
          <label for=" from_date font-medium text-gray-700">From</label>
          <input type="date"  class="from_date border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600 outline-none" />
          <div class="from-date-error erroe" ></div>
        </div>

        <div class="flex flex-col gap-1">
          <label for="to_date" class="font-medium text-gray-700">To</label>
          <input type="date"  class=" to_date border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600 outline-none" />
          <div class="to-date-error erroe" ></div>
        </div>
      </div>


    </div>
        `
    })
}
renderExperienceForm()

function renderWorker(){
  
}

export {clearForm , renderExperienceForm}