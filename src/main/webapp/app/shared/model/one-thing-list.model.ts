import { IThingsList } from 'app/shared/model/things-list.model';

export interface IOneThingList {
  id?: number;
  myText?: string;
  thingsList?: IThingsList;
}

export const defaultValue: Readonly<IOneThingList> = {};
