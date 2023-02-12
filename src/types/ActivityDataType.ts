export interface BaseActivityDataType {
  id: number;
  title: string;
  images: string[] | null;
}

export interface ActivityDataType extends BaseActivityDataType {
  tags: ActivityTagDataType[] | null;
  branches: BranchDataType[];
  content: string;
  connection: string[] | null;
  holder: string[] | null ;
  objective: string[] | null;
  sources: string[] | null;
  subTitle:string | null;
  trend: number;
}

export interface TagDataType {
  id: number;
  type: string; // 'area' | 'location' | 'other'
  text: string;
}

export interface ActivityTagDataType extends TagDataType {
  tagCount: number; // user voted tag count
  userVoted: boolean; // check if user voted this tag
}

export interface BranchDataType {
  id: number;
  branchName: string | null;
  dateStart: DateType | null;
  dateEnd: string[] | null ;
  applyStart: string[] | null ;
  applyEnd: string[] | null;
  applyFee: string[] | null;
  location: string[] | null;
  status: string | undefined | null;
}

interface DateType {
  [key: string]: string
}

// for Manage Page
export interface UserActivityDataType extends BaseActivityDataType {
  tags: TagDataType[];
  branch: BranchDataType;
}

/** API Response Type */
export interface SearchResultDataType {
  activity: ActivityDataType;
  weights: number; // for sorting result
}
export interface SearchHistoryResultDataType {
  id: number;
  keyword: string;
  tags: TagDataType[];
  createAt:string;
}
export interface SegmentResponseDataType {
  maxSegment: number;// maximun request page
  minSegment: number;// minimun request page
  currentSegment: number;// current page
  countPerSegment: number; // max number of data in its page
  totalCount: number; // total data
}
export interface SearchResponseDataType
  extends SegmentResponseDataType {
  searchResultData: SearchResultDataType[]; // main result data
}
export interface ActivityResponseDataType extends SegmentResponseDataType {
  searchResultData: ActivityDataType[];
}
export interface ManageResponseDataType extends BaseActivityDataType {
  tags: TagDataType[];
  branches: BranchDataType[]
}
export interface SearchHistoryResponseType extends SegmentResponseDataType {
  searchResultData: SearchHistoryResultDataType[];
}

/** Router loaeder return type */
export interface SearchLoaderType {
  data: SearchResponseDataType | null;
  keywords: string | null;
}
export interface homeLoaderDataType {
  trendActivityResData:ActivityResponseDataType;
  newestActivityResData:ActivityResponseDataType;
}
export interface ManageLoaderType {
  all :UserActivityDataType[];
  dream: UserActivityDataType[];
  enroll: UserActivityDataType[];
  done: UserActivityDataType[];
}

export interface HistoryLoaderDataType {
  newestActivityResData:ActivityDataType[];
}

export default ActivityDataType;
