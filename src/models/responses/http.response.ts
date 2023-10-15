export class HttpResponse {
  constructor(
    public success: boolean,
    public message: string,
    public data?: object,
  ) {}
}
