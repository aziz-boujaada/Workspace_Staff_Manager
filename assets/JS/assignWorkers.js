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

  const roles = {
    reception: "reception",
    manager: "manager",
    cleaning: "cleaning",
    itGuy: "it guy",
    security: "security",
    other: "Other",
  };

  const workers = loadWorkers();
  console.log("worker to assign is loaded", workers);
  workers.map((worker) => {
    // confirenc room
    if (
      (worker.role.toLowerCase() === roles.reception ||
        worker.role.toLowerCase() === roles.itGuy ||
        worker.role.toLowerCase() === roles.security ||
        worker.role.toLowerCase() === roles.manager) &&
      conferenceRoom.Workers.length < conferenceRoom.capacity
    ) {
      conferenceRoom.Workers.push(worker);
      console.log(conferenceRoom);
    } else {
      console.log("len rconfirance", conferenceRoom.Workers.length);
      console.log("there is no other places in confirence");
    }

    // accept others and cleaning to enter
    if (
      (worker.role.toLowerCase() === roles.cleaning ||
        worker.role.toLowerCase() === roles.other) &&
      conferenceRoom.Workers.length === 0 && conferenceRoom.Workers.length < conferenceRoom.capacity
    ) {
      conferenceRoom.Workers.push(worker);
    } else {
      console.log("we are sorry thers a metting here");
    }

    // reciption room
    if (
      (worker.role.toLowerCase() === "reception" ||
        worker.role.toLowerCase() === "manager" ||
        worker.role.toLowerCase() === "cleaning") &&
      reciptionRoom.Workers.length < reciptionRoom.capacity
    ) {
      reciptionRoom.Workers.push(worker);
      console.log(reciptionRoom);
    } else {
      console.log("len rec", serverRoom.Workers.length);
      console.log("there is no other places in reciption");
    }

    //server room
    if (
      (worker.role.toLowerCase() === "it guy" ||
        worker.role.toLowerCase() === "manager" ||
        worker.role.toLowerCase() === "cleaning") &&
      serverRoom.Workers.length < securityRoom.capacity
    ) {
      serverRoom.Workers.push(worker);
      console.log(serverRoom);
    } else {
      console.log("len server", serverRoom.Workers.length);
      console.log("there is no other places in server ");
    }

    //security room
    if (
      worker.role.toLowerCase() === "security" ||
      worker.role.toLowerCase() === "manager" ||
      worker.role.toLowerCase() === "cleaning"
    ) {
      securityRoom.Workers.push(worker);
      console.log(securityRoom);

      //personal room

      //archive room
      if (
        worker.role.toLowerCase() !== roles.cleaning &&
        archiviesRoom.Workers.length < archiviesRoom.capacity
      ) {
        archiviesRoom.Workers.push(worker)
        console.log("archive room" , archiviesRoom)
      }else{
        console.log("no place archive")
      }
    }
  });
}

// assignWorkers()
export { assignWorkers };
