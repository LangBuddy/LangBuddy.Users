export class CreateUserCommand {
  constructor(
    public firstName: string,
    public lastName: string,
    public birthday: Date,
    public gender: 'man' | 'woman',
  ) {}
}
