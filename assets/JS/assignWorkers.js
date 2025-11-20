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
      acceptedRolezs: [
        roles.security,
        roles.itGuy,
        roles.cleaning,
        roles.manager,
        roles.reception,
      ],
    },
    {
      roomName: "serverRoom",
      capacity: 4,
      Workers: [],
      acceptedRolezs: [
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
      acceptedRolezs: [roles.security, roles.manager],
    },
    {
      roomName: "receptionRoom",
      capacity: 6,
      Workers: [],
      acceptedRolezs: [roles.cleaning, roles.manager, roles.reception],
    },
    {
      roomName: "personnalRoom",
      capacity: 4,
      Workers: [],
      acceptedRolezs: [
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
      acceptedRolezs: [
        roles.manager,
        roles.itGuy,
        roles.itGuy,
        roles.reception,
      ],
    },
  ];

  const workers = loadWorkers();
  console.log("worker to assign is loaded", workers);
  // confirenc room
  Rooms.map((room) => {
    workers.map((worker) => {
      if (room.roomName === "conferenceRoom") {
        if (
          (worker.role.toLowerCase() === roles.reception ||
            worker.role.toLowerCase() === roles.itGuy ||
            worker.role.toLowerCase() === roles.security ||
            worker.role.toLowerCase() === roles.manager) &&
          room.Workers.length < room.capacity
        ) {
          room.Workers.push(worker);
          console.log("confirance room", room.Workers);
          if (
            (worker.role.toLowerCase() === roles.cleaning ||
              worker.role.toLowerCase() === roles.other) &&
            room.Workers.length === 0 &&
            room.Workers.length < room.capacity
          ) {
            room.Workers.push(worker);
          } else {
            console.log("we are sorry thers a metting here");
          }
        } else {
          console.log("len rconfirance", room.Workers.length);
          console.log("there is no other places in confirence");
        }
      }

      // reciption room
      if (room.roomName === "reciptionRoom") {
        if (
          (worker.role.toLowerCase() === roles.reception ||
            worker.role.toLowerCase() === roles.manager ||
            worker.role.toLowerCase() === roles.cleaning ||
            worker.role.toLowerCase() === roles.security) &&
          room.Workers.length < room.capacity
        ) {
          room.Workers.push(worker);
          console.log("reciption rrom", room.Workers);
        } else {
          console.log("len rec", room.Workers.length);
          console.log("there is no other places in reciption");
        }
      }

      //server room
      if (room.roomName === "serverRoom") {
        if (
          (worker.role.toLowerCase() === roles.itGuy ||
            worker.role.toLowerCase() === roles.manager ||
            worker.role.toLowerCase() === roles.cleaning ||
            worker.role.toLowerCase() === roles.security) &&
          room.Workers.length < room.capacity
        ) {
          room.Workers.push(worker);
          console.log("server room", room.Workers);
        } else {
          console.log("len server", room.Workers.length);
          console.log("there is no other places in server ");
        }
      }

      //security room
      if (room.roomName === "securityRoom") {
        if (
          worker.role.toLowerCase() === roles.security ||
          worker.role.toLowerCase() === roles.manager ||
          worker.role.toLowerCase() === roles.manager
        ) {
          room.Workers.push(worker);
        }
      }
      //personal room
      if (room.roomName === "personnalRoom") {
        if (
          (worker.role.toLowerCase() === roles.manager ||
            worker.role.toLowerCase() === roles.other ||
            worker.role.toLowerCase() === roles.cleaning ||
            worker.role.toLowerCase() === roles.security) &&
          room.Workers.length < room.capacity
        ) {
          room.Workers.push(worker);
        }
        console.log("personnal room ", room.Workers);
      }
      //archive room
      if (room.roomName === "archiviesRoom") {
        if (
          worker.role.toLowerCase() !== roles.cleaning &&
          room.Workers.length < room.capacity
        ) {
          room.Workers.push(worker);
          console.log("archive room", room.Workers);
        } else {
          return;
        }
      }
    });
  });
  ///display worker in rooms

  const assignBtn = document.querySelectorAll(".assign_btn");
  const assignBox = document.querySelector(".assing_box");

  assignBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (e.target.closest(".room")) {
        const roomId = e.target.closest(".room").getAttribute("data-roomId");
        const aviableWorkermodal = document.getElementById(
          "aviable_worker_modal"
        );
        assignBox.classList.remove("hidden");
        aviableWorkermodal.innerHTML = "";

        const selectedRoom = Rooms.find((room) => room.roomName === roomId);
        console.log(selectedRoom);
        if (!selectedRoom) return;

        const allowedWorkers = workers.filter((worker) =>
          selectedRoom.acceptedRolezs.includes(worker.role.toLowerCase())
        );
        console.log("allowed workers", allowedWorkers);
        allowedWorkers.map((allowed) => {
          // displayInRoom(allowed)
          aviableWorkermodal.innerHTML += `

  <div class=" accepted_worker_card flex items-center justify-between mb-6 bg-gray-200 p-1 rounded-md "   data-workerId="${allowed.id}">
    <div class="">
      <p class="text-lg font-semibold text-gray-800 mb-1">${allowed.workerName}</p>
      <p class="text-gray-600">${allowed.role}</p>
    </div>
    <img src="${allowed.img}" alt="${allowed.workerName}" class="h-12 w-12 rounded-full border-4 border-blue-500 object-cover shadow-md">
  </div>
        `;

          displayInRoom(allowedWorkers, roomId, selectedRoom);
          console.log("allowed", allowed);
        });
      }
    });
  });
  document
    .getElementById("close_assign_modal")
    .addEventListener("click", () => {
      assignBox.classList.add("hidden");
    });

  // localStorage.setItem("rooms" , JSON.stringify(Rooms))
}

function displayInRoom(allowedWorkers, roomId, selectedRoom) {
  const cards = document.querySelectorAll(".accepted_worker_card");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const workerId = card.getAttribute("data-workerId");
      const worker = allowedWorkers.find((w) => w.id == workerId);
      if(worker.isAssigned){
        alert("this worker already assigned to other room")
        return
      }
      worker.isAssigned = true;

      const room = document.querySelector(`.room[data-roomId="${roomId}"] .room_assigned`);
      if (!room) return;

      if (room.querySelectorAll(".assigned_worker").length >= selectedRoom.capacity) {
        alert("Room is full");
        return;
      }

      room.innerHTML += `
        <div class="assigned_worker flex items-center justify-between w-[90%] mb-1 bg-gray-200 p-1 rounded-md" data-card="${worker.id}">
          <div>
            <p class="text-sm font-semibold text-gray-800 mb-1">${worker.workerName}</p>
            <p class="text-gray-600">${worker.role}</p>
          </div>
          <img src="${worker.img}" alt="${worker.workerName}" class="h-12 w-12 rounded-full border-4 border-blue-500 object-cover shadow-md">
          <button class="remove_from_room bg-red-500 p-1 rounded-full">X</button>
        </div>`;

      const workerCard = document.querySelector(`.worker_card[data-id="${worker.id}"]`);
      if (workerCard) workerCard.classList.add("hidden");

      card.remove();

      const removeBtn = room.querySelector(`.assigned_worker[data-card="${worker.id}"] .remove_from_room`);
      removeBtn.addEventListener("click", () => removeFromRoom(worker));
    });
  });
}

function removeFromRoom(worker) {
  const assignedWorkerCard = document.querySelector(`.assigned_worker[data-card="${worker.id}"]`);
  if (assignedWorkerCard) assignedWorkerCard.remove();

  worker.isAssigned = false;

  const workerCard = document.querySelector(`.worker_card[data-id="${worker.id}"]`);
  if (workerCard) workerCard.classList.remove("hidden");
  console.log("click")
}


// function loadRooms(){
//  const rooms =  localStorage.getItem("rooms")
//  return rooms ? JSON.parse(rooms) : [];
// }
// assignWorkers()

export { assignWorkers };
