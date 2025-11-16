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
          <div id="experience_form" class="border-t pt-4 bg-gray-100 rounded-md shadow-xl p-2 mt-2">
      <h3 class="text-lg font-semibold text-gray-800">Experience</h3>

      <div class="flex flex-col gap-1">
        <label for="company_name" class="font-medium text-gray-700">Company Name</label>
        <input type="text" id="company_name" placeholder="Company name" class="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600 outline-none" />
      </div>
      
      <div class="flex flex-col gap-1">
        <label for="exp_role" class="font-medium text-gray-700">Role</label>
        <input type="text" id="exp_role" placeholder="Role..." class="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600 outline-none" />
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div class="flex flex-col gap-1">
          <label for="from_date" class="font-medium text-gray-700">From</label>
          <input type="date" id="from_date" class="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600 outline-none" />
        </div>

        <div class="flex flex-col gap-1">
          <label for="to_date" class="font-medium text-gray-700">To</label>
          <input type="date" id="to_date" class="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600 outline-none" />
        </div>
      </div>


    </div>
        `
    })
}
renderExperienceForm()

export {clearForm}