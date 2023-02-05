export interface BaseActivityDataType {
  id: number;
  title: string;
  images: string[] | null;
}

export default interface ActivityDataType extends BaseActivityDataType {
  tags: ActivityTagDataType[] | null;
  branches: BranchDataType[] | null;
  content: string;
  connection: string[] | null;
  holder: string[] | null ;
  objective: string[] | null;
  sources: string[] | null;
  subTitle:string | null;
}

export interface SearchResultDataType {
  activity: ActivityDataType;
  weights: number; // for sorting result
}

export interface SearchResponseDataType {
  maxSegment: number;// maximun request page
  minSegment: number;// minimun request page
  currentSegment: number;// current page
  countPerSegment: number; // max number of data in its page
  searchResultData: SearchResultDataType[]; // main result data
  totalCount: number; // total data
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
  branchName: string;
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

// Page Loader Response Data Type
export interface SearchLoaderType {
  data: SearchResponseDataType;
  keywords: string | null;
}
export interface homeLoaderDataType {
  trendActivityResData:ActivityDataType[];
  newestActivityResData:ActivityDataType[];
}
