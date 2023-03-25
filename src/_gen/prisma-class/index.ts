import { Campus as _Campus } from './campus';
import { University as _University } from './university';
import { Place as _Place } from './place';
import { Position as _Position } from './position';
import { Category as _Category } from './category';
import { Evento as _Evento } from './evento';
import { User as _User } from './user';
import { UserToken as _UserToken } from './user_token';

export namespace PrismaModel {
  export class Campus extends _Campus {}
  export class University extends _University {}
  export class Place extends _Place {}
  export class Position extends _Position {}
  export class Category extends _Category {}
  export class Evento extends _Evento {}
  export class User extends _User {}
  export class UserToken extends _UserToken {}

  export const extraModels = [
    Campus,
    University,
    Place,
    Position,
    Category,
    Evento,
    User,
    UserToken,
  ];
}
