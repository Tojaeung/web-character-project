class ApiError extends Error {
  constructor(public message: string, public status: number) {
    super(message);
  }

  static BadRequest(message: string) {
    return new ApiError(message, 400);
  }

  static Unauthorized(message: string) {
    return new ApiError(message, 401);
  }

  static Forbbiden(message: string) {
    return new ApiError(message, 403);
  }

  static NotFound(message: string) {
    return new ApiError(message, 404);
  }

  static InternalServerError(message: string) {
    return new ApiError(message, 500);
  }
}

export default ApiError;
