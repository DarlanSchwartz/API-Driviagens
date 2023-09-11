import { createTravelDB, findTravelsDB, validTravelRequestDB } from "../repository/travels.repository.js";

async function getTravels(name, page) {
    const postsPerPage = 10;
    if (page) {
        if (page <= 0 ||  isNaN(Number(page))){
            throw { type: "BadRequest", message: 'Invalid page value' }
        }
    }
    const currentPage = page ? Number(page) : 1;
    const offset = (currentPage - 1) * postsPerPage;
    const travels = await findTravelsDB(name, offset, postsPerPage,page ? 10 : 0);
    if (travels.length > 10) throw { type: "Internal", message: `Too many results` };
    return travels;
}

async function registerTravel(passengerId, flightId) {
    const isValidTravel = await validTravelRequestDB(passengerId, flightId);
    if (!isValidTravel) throw { type: "NotFoundError", message: `This travel cant happen!` };
    const travel = await createTravelDB(passengerId, flightId);
    return travel;
}

const TravelService = { registerTravel, getTravels }

export default TravelService;