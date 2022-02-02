// eslint-disable-next-line max-classes-per-file
class BadRequestException extends Error {
  constructor(errorMessage) {
    super();
    this.message = errorMessage;
    this.statusCode = 400;
  }
}

class UnauthorisedException extends Error {
  constructor(errorMessage) {
    super();
    this.message = errorMessage;
    this.statusCode = 401;
  }
}

class ForbiddenException extends Error {
  constructor(errorMessage) {
    super();
    this.message = errorMessage;
    this.statusCode = 403;
  }
}

class NotFoundException extends Error {
  constructor(errorMessage) {
    super();
    this.message = errorMessage;
    this.statusCode = 404;
  }
}

class InternalServerException extends Error {
  constructor(errorMessage) {
    super();
    this.message = errorMessage;
    this.statusCode = 500;
  }
}

module.exports = {
  BadRequestException,
  UnauthorisedException,
  ForbiddenException,
  NotFoundException,
  InternalServerException,
};
