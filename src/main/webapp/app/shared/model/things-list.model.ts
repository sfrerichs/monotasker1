import { IThing } from 'app/shared/model/thing.model';
import { Time } from 'app/shared/model/enumerations/time.model';

export interface IThingsList {
  id?: number;
  listTime?: Time;
  things?: IThing[];
  description?: string;
  date?: number;
}

export const defaultValue: Readonly<IThingsList> = {};
