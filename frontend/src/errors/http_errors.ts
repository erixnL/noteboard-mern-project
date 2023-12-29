class HttpError extends Error {
    constructor(message?: string) {
        super(message);
        //the subclass name will be the name of the error
        this.name = this.constructor.name;
    }
}
/**
 * Status Code: 401
 */
export class UnauthorizedError extends HttpError{}
/**
 * Status Code: 409
 */
export class ConflictError extends HttpError{}



