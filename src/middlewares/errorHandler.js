import httpStatus from "http-status";

export default function errorHandler(error, req, res, next) {
    console.log(error);

    switch (error.type) {
        case "ConflictError":
            return res.status(httpStatus.CONFLICT).send("Conflict: " + error.message);
        case "NotFoundError":
            return res.status(httpStatus.NOT_FOUND).send("Not found: " + error.message);
        case "Unprocessable":
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Unprocessable entity: " + error.message);
        case "BadRequest":
            return res.status(httpStatus.BAD_REQUEST).send("Bad Request: " + error.message);
        default:
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Sorry, something went wrong 😢");
    }
}