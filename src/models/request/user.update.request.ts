export class UserUpdateRequest {
  firstName: string | null;
  lastName: string | null;
  birthday: Date | null;
  gender: 'man' | 'woman' | null;
}
