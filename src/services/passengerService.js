import { createPassengerDB } from "../repository/passengers.repository.js";

async function createPassenger(firstName, lastName){
   const passenger = await createPassengerDB(firstName,lastName);
   return passenger;
}

const PassengerService = {createPassenger}

export default PassengerService;