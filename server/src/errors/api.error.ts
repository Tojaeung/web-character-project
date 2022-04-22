class ApiError extends Error {
  constructor(public message: string, public status: number) {
    super(message);
    this.message = message;
    this.status = status;
  }

  static badRequest(message: string) {
    return new ApiError(message, 400);
  }

  static unAuthorized(message: string) {
    return new ApiError(message, 401);
  }

  static forbbiden(message: string) {
    return new ApiError(message, 403);
  }

  static notFound(message: string) {
    return new ApiError(message, 404);
  }
}

export default ApiError;
