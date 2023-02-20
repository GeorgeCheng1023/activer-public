import { SearchResponseType, ActivityResponseType } from 'types/Response';
import ActivityDataType, { UserActivityDataType, CommentResultDataType } from 'types/ActivityDataType';
import { TrendTagDataType } from '../ActivityDataType';
import { CommentResponseType, TrendTagResponseType } from '../Response/index';

/** Router loader return type */
export interface RootLoaderType {
  allTags: TrendTagDataType[]
}

export interface SearchLoaderType {
  data: SearchResponseType | null;
  keywords: string | null;
  tags: string[] | null;
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

export interface DetailLoaderType {
  activityData: ActivityDataType,
  commentData : CommentResponseType,
  userCommentData: CommentResultDataType | null,
}

export interface HistoryLoaderType {
  newestActivityResData:ActivityDataType[];
}

export interface tagsLoaderType {
  locationTags: TrendTagDataType[],
  areaTags: TrendTagDataType[],
  otherTags: TrendTagDataType[],
}
