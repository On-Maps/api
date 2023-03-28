import { Campus as _Campus } from './campus';
import { University as _University } from './university';
import { Place as _Place } from './place';
import { Image as _Image } from './image';
import { Position as _Position } from './position';
import { Category as _Category } from './category';
import { Event as _Event } from './event';
import { User as _User } from './user';
import { UserToken as _UserToken } from './user_token';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace PrismaModel {
  export class Campus extends _Campus {}
  export class University extends _University {}
  export class Place extends _Place {}
  export class Image extends _Image {}
  export class Position extends _Position {}
  export class Category extends _Category {}
  export class Event extends _Event {}
  export class User extends _User {}
  export class UserToken extends _UserToken {}

  export const extraModels = [
    Campus,
    University,
    Place,
    Image,
    Position,
    Category,
    Event,
    User,
    UserToken,
  ];
}
