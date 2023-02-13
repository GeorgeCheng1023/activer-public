import { SearchResponseType, ActivityResponseType } from 'types/Response';
import ActivityDataType, { UserActivityDataType } from 'types/ActivityDataType';

/** Router loader return type */
export interface SearchLoaderType {
  data: SearchResponseType | null;
  keywords: string | null;
}
export interface homeLoaderType {
  trendActivityResData:ActivityResponseType;
  newestActivityResData:ActivityResponseType;
}
export interface ManageLoaderType {
  all :UserActivityDataType[];
  dream: UserActivityDataType[];
  enroll: UserActivityDataType[];
  done: UserActivityDataType[];
}

export interface HistoryLoaderType {
  newestActivityResData:ActivityDataType[];
}
