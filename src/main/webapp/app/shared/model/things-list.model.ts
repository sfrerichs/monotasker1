import { Moment } from 'moment';
import { IOneThingList } from 'app/shared/model/one-thing-list.model';
import { IThing } from 'app/shared/model/thing.model';
import { Time } from 'app/shared/model/enumerations/time.model';

export interface IThingsList {
  id?: number;
  date?: Moment;
  listTime?: Time;
  description?: string;
  oneThingList?: IOneThingList;
  things?: IThing[];
}

export const defaultValue: Readonly<IThingsList> = {};
