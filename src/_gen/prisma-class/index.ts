import { Campus as _Campus } from './campus';
import { University as _University } from './university';
import { Room as _Room } from './room';
import { Category as _Category } from './category';
import { Evento as _Evento } from './evento';
import { User as _User } from './user';
import { UserToken as _UserToken } from './user_token';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace PrismaModel {
  export class Campus extends _Campus {}
  export class University extends _University {}
  export class Room extends _Room {}
  export class Category extends _Category {}
  export class Evento extends _Evento {}
  export class User extends _User {}
  export class UserToken extends _UserToken {}

  export const extraModels = [
    Campus,
    University,
    Room,
    Category,
    Evento,
    User,
    UserToken,
  ];
}
