import ActivityDataType, {
  TagDataType,
  BaseActivityDataType,
  BranchDataType,
  SearchHistoryResultDataType,
  SearchResultDataType,
} from 'types/ActivityDataType';
import { CommentResultDataType, TrendTagResultDataType } from '../ActivityDataType';

/** API Response Type */

export interface SegmentResponseType {
  maxSegment: number;// maximun request page
  minSegment: number;// minimun request page
  currentSegment: number;// current page
  countPerSegment: number; // max number of data in its page
  totalCount: number; // total data
}
export interface SearchResponseType
  extends SegmentResponseType {
  searchResultData: SearchResultDataType[]; // main result data
}
export interface ActivityResponseType extends SegmentResponseType {
  searchResultData: ActivityDataType[];
}
export interface ManageResponseType extends BaseActivityDataType {
  tags: TagDataType[];
  branches: BranchDataType[]
}
export interface SearchHistoryResponseType extends SegmentResponseType {
  searchResultData: SearchHistoryResultDataType[] | undefined;
}

export interface TrendTagResponseType extends SegmentResponseType {
  searchResultData: TrendTagResultDataType[]
}

export interface CommentResponseType extends
  SegmentResponseType {
  searchResultData: CommentResultDataType[]
  acitivityId: number;
}
