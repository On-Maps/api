import { Campus as _Campus } from './campus';
import { University as _University } from './university';
import { Place as _Place } from './place';
import { Latitude as _Latitude } from './latitude';
import { Longitude as _Longitude } from './longitude';
import { Category as _Category } from './category';
import { Evento as _Evento } from './evento';
import { User as _User } from './user';
import { UserToken as _UserToken } from './user_token';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace PrismaModel {
  export class Campus extends _Campus {}
  export class University extends _University {}
  export class Place extends _Place {}
  export class Latitude extends _Latitude {}
  export class Longitude extends _Longitude {}
  export class Category extends _Category {}
  export class Evento extends _Evento {}
  export class User extends _User {}
  export class UserToken extends _UserToken {}

  export const extraModels = [
    Campus,
    University,
    Place,
    Latitude,
    Longitude,
    Category,
    Evento,
    User,
    UserToken,
  ];
}
