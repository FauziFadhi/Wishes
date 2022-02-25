export default class HttpException extends Error {
  response: any;
  statusCode: number;
  constructor(response: string | { message: string } | any, status: number) {
    super();
    this.response = response;
    this.statusCode = status;
    this.initMessage();
  }

  initMessage() {
    if (typeof this.response == 'string') {
      this.message = this.response;
    } else if (
      typeof this.response == 'object' &&
      typeof this.response.message == 'string'
    ) {
      this.message = this.response.message;
    }
    this.message = this.response;
  }
}
