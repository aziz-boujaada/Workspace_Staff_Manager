import { loadWorkers } from "./crud.js";

function assignWorkers() {
  let conferenceRoom = {
    roomName: "conference",
    capacity: 6,
    Workers: [],
  };
  let serverRoom = {
    roomName: "serverRoom",
    capacity: 4,
    Workers: [],
  };
  let securityRoom = {
    roomName: "securityRoom",
    capacity: 4,
    Workers: [],
  };
  let reciptionRoom = {
    roomName: "reciptionRoom",
    capacity: 10,
    Workers: [],
  };
  let personnalRoom = {
    roomName: "personnalRoom",
    capacity: 4,
    Workers: [],
  };
  let archiviesRoom = {
    roomName: "archiviesRoom",
    capacity: 4,
    Workers: [],
  };

  const workers = loadWorkers();
  console.log("worker to assign is loaded", workers);
  workers.map((worker) => {
    if ((
      worker.role.toLowerCase() === "reception" ||
      worker.role.toLowerCase() === "manager" ||
      worker.role.toLowerCase() === "cleaning")
      && reciptionRoom.Workers.length < reciptionRoom.capacity) {
      reciptionRoom.Workers.push(worker);
      console.log(reciptionRoom);
    }else{
        console.log("len rec", serverRoom.Workers.length);
         console.log("there is no other places in reciption");
    }
    if ((
      worker.role.toLowerCase() === "it guy" ||
      worker.role.toLowerCase() === "manager" ||
      (worker.role.toLowerCase() === "cleaning") &&
        serverRoom.Workers.length < securityRoom.capacity)
    ) {
      serverRoom.Workers.push(worker);
      console.log(serverRoom);
    } else {
      console.log("len server", serverRoom.Workers.length);
      console.log("there is no other places in server ");
    
      return;
    }

    if (
      worker.role.toLowerCase() === "security" ||
      worker.role.toLowerCase() === "manager" ||
      worker.role.toLowerCase() === "cleaning"
    ) {
      securityRoom.Workers.push(worker);
      console.log(securityRoom);
    }
  });
}

// assignWorkers()
export { assignWorkers };
