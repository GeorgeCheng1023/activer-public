import { SearchResponseType, ActivityResponseType } from 'types/Response';
import ActivityDataType, { ActivityTagDataType, UserActivityDataType } from 'types/ActivityDataType';
import { TrendTagResultDataType } from '../ActivityDataType';
import { TrendTagResponseType } from '../Response/index';

/** Router loader return type */
export interface SearchLoaderType {
  data: SearchResponseType | null;
  keywords: string | null;
}
export interface homeLoaderType {
  trendActivityResData:ActivityResponseType;
  newestActivityResData:ActivityResponseType;
  trendTagResData: TrendTagResponseType
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

export interface tagsLoaderType {
  locationTags: TrendTagResultDataType[],
  areaTags: TrendTagResultDataType[],
  otherTags: TrendTagResultDataType[],
}
