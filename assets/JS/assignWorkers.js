import { loadWorkers } from "./crud.js";
import { renderWorkerModal } from "./ui.js";

function assignWorkers() {
  const roles = {
    reception: "reception",
    manager: "manager",
    cleaning: "cleaning",
    itGuy: "it guy",
    security: "security",
    other: "other",
  };

  const Rooms = [
    {
      roomName: "conferenceRoom",
      capacity: 5,
      Workers: [],
      acceptedRoles: [
        roles.security,
        roles.itGuy,
        roles.cleaning,
        roles.manager,
        roles.reception,
        roles.other,
      ],
    },
    {
      roomName: "serverRoom",
      capacity: 4,
      Workers: [],
      acceptedRoles: [
        roles.manager,
        roles.itGuy,
        roles.security,
        roles.cleaning,
      ],
    },
    {
      roomName: "securityRoom",
      capacity: 4,
      Workers: [],
      acceptedRoles: [roles.security, roles.manager],
    },
    {
      roomName: "receptionRoom",
      capacity: 6,
      Workers: [],
      acceptedRoles: [roles.cleaning, roles.manager, roles.reception],
    },
    {
      roomName: "personnalRoom",
      capacity: 4,
      Workers: [],
      acceptedRoles: [
        roles.manager,
        roles.itGuy,
        roles.cleaning,
        roles.security,
      ],
    },
    {
      roomName: "archiviesRoom",
      capacity: 4,
      Workers: [],
      acceptedRoles: [
        roles.manager,
        roles.itGuy,
        roles.reception,
        roles.other,
        roles.security,
      ],
    },
  ];

  const workers = loadWorkers();
  console.log("Workers to assign loaded:", workers);

  Rooms.forEach((room) => {
    workers.forEach((worker) => {
      if (
        room.acceptedRoles.includes(worker.role.toLowerCase()) &&
        room.Workers.length < room.capacity
      ) {
        room.Workers.push(worker);
      }
    });
  });

  const assignBtn = document.querySelectorAll(".assign_btn");
  const assignBox = document.querySelector(".assing_box");
  const availableWorkerModal = document.getElementById("aviable_worker_modal");

  assignBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const roomElement = e.target.closest(".room");
      if (!roomElement) return;

      const roomId = roomElement.getAttribute("data-roomId");
      assignBox.classList.remove("hidden");
      availableWorkerModal.innerHTML = "";

      const selectedRoom = Rooms.find((room) => room.roomName === roomId);
      if (!selectedRoom) return;

      const allowedWorkers = workers.filter(
        (worker) =>
          selectedRoom.acceptedRoles.includes(worker.role.toLowerCase()) &&
          !worker.isAssigned
      );

      console.log("Allowed workers:", allowedWorkers);
      renderAllowedWorkers(allowedWorkers, availableWorkerModal);
      displayInRoom(allowedWorkers, roomId, selectedRoom, availableWorkerModal);
    });
  });

  document
    .getElementById("close_assign_modal")
    .addEventListener("click", () => {
      assignBox.classList.add("hidden");
    });

  function renderAllowedWorkers(allowedWorkers, container) {
    if(allowedWorkers.length === 0){
      container.innerHTML = `<p class="text-center text-red-600 font-sans">no aviable workers</p>`
    }
    allowedWorkers.forEach((worker) => {
      container.innerHTML += `
        <div class="accepted_worker_card flex items-center justify-between mb-6 bg-gray-200 p-1 rounded-md" data-workerId="${worker.id}">
          <div>
            <p class="text-lg font-semibold text-gray-800 mb-1">${worker.workerName}</p>
            <p class="text-gray-600">${worker.role}</p>
          </div>
          <img src="${worker.img}" alt="${worker.workerName}" class="h-12 w-12 rounded-full border-4 border-green-400 object-cover shadow-md">
        </div>
      `;
    });
  }

  function displayInRoom(allowedWorkers, roomId, selectedRoom) {
    const cards = document.querySelectorAll(".accepted_worker_card");

    cards.forEach((card) => {
      card.addEventListener("click", (e) => {
        const workerId = card.getAttribute("data-workerId");
        const worker = allowedWorkers.find((w) => w.id == workerId);

        if (!worker) return;

        if (worker.isAssigned) {
          alert("This worker is already assigned to another room");
          return;
        }

        const roomContainer = document.querySelector(
          `.room[data-roomId="${roomId}"] .room_assigned`
        );
        if (!roomContainer) return;

        if (
          roomContainer.querySelectorAll(".assigned_worker").length >=
          selectedRoom.capacity
        ) {
          alert("Room is full");
          return;
        }

        worker.isAssigned = true;
        card.remove();
        const workerCard = document.querySelector(
          `.worker_card[data-id="${worker.id}"]`
        );
        if (workerCard) workerCard.classList.add("hidden");

        addWorkerToRoom(worker, roomContainer, roomId);
        UpdateRedZone(roomContainer, roomId);
      });
    });
  }

  function UpdateRedZone(roomContainer, roomId) {
    const redZone = document.querySelector(
      `.room[data-roomId="${roomId}"] .not_accsess_room`
    );
    console.log("room id" , roomId)
    const assignedWorkersCount =
      roomContainer.querySelectorAll(".assigned_worker").length;
    console.log("assignedWorkersCount", assignedWorkersCount);
      if(!redZone)return
      if (assignedWorkersCount > 0) {
        redZone.classList.add("hidden");
        console.log("red zone hidden");
      } else {
        redZone.classList.remove("hidden");
        console.log("red zone visible");
      }
    
    // addWorkerToRoom(roomContainer , roomId)
  }
  function addWorkerToRoom(worker, roomContainer, roomId) {
    const workerDiv = document.createElement("div");
    workerDiv.className =
      "assigned_worker flex items-center justify-between w-[90%] mb-1 bg-gray-200 p-1 rounded-md";
    workerDiv.setAttribute("data-card", worker.id);
    workerDiv.innerHTML = `
      <div>
        <p class="text-sm font-semibold text-gray-800 mb-1">${worker.workerName}</p>
        <p class="text-gray-600">${worker.role}</p>
      </div>
      <img src="${worker.img}" alt="${worker.workerName}" class="h-12 w-12 rounded-full border-4 border-green-400 object-cover shadow-md">
      <button class="remove_from_room bg-red-500 p-1 rounded-full text-white px-2">X</button>
    `;

    roomContainer.appendChild(workerDiv);

    const removeBtn = workerDiv.querySelector(".remove_from_room");
    removeBtn.addEventListener("click", () => {
      removeWorkerFromRoom(worker, workerDiv, roomContainer, roomId);
      UpdateRedZone(roomContainer, roomId);
      console.log(roomContainer);
    });
  }

  function removeWorkerFromRoom(worker, workerDiv, roomContainer, roomId) {
    workerDiv.remove();
    worker.isAssigned = false;
    UpdateRedZone(roomContainer, roomId);
    const workerCard = document.querySelector(
      `.worker_card[data-id="${worker.id}"]`
    );
    if (workerCard) workerCard.classList.remove("hidden");

    const availableWorkerModal = document.getElementById(
      "aviable_worker_modal"
    );
    const newCard = document.createElement("div");
    newCard.className =
      "accepted_worker_card flex items-center justify-between mb-6 bg-gray-200 p-1 rounded-md";
    newCard.setAttribute("data-workerId", worker.id);
    newCard.innerHTML = `
      <div>
        <p class="text-lg font-semibold text-gray-800 mb-1">${worker.workerName}</p>
        <p class="text-gray-600">${worker.role}</p>
      </div>
      <img src="${worker.img}" alt="${worker.workerName}" class="h-12 w-12 rounded-full border-4 border-blue-500 object-cover shadow-md">
    `;
    availableWorkerModal.appendChild(newCard);
  }
}

export { assignWorkers };
