export class UpdateUserCommand {
  constructor(
    public id: number,
    public firstName: string | null,
    public lastName: string | null,
    public birthday: Date | null,
    public gender: 'man' | 'woman' | null,
  ) {}
}
