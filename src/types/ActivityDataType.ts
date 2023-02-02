export interface BaseActivityDataType {
  id: number;
  title: string;
  images: string[] | null;
}

export interface ShortActivityDataType extends BaseActivityDataType {
  tags: TagDataType[];
}

export interface SearchResponstDataType {
  maxSegment: number;// maximun request page
  minSegment: number;// minimun request page
  currentSegment: number;// current page
  countPerSegment: number; // max number of data in its page
  searchResultData: SearchResultDataType[]; // main result data
  totalCount: number; // total data
}
export interface SearchLoaderType {
  data: SearchResponstDataType;
  keywords: string;
}

interface ActivityDataType extends BaseActivityDataType {
  tags: ActivityTagDataType[] | null;
  branches: BranchDataType[] | null;
  content: string;
  connection: string[] | null;
  holder: string[] | null ;
  objective: string[] | null;
  sources: string[] | null;
  subTitle:string | null;
}

export interface SearchResultDataType extends ActivityDataType {
  weights: number;
}
export interface TagDataType {
  id: number;
  type: string;
  text: string;
}

export interface ActivityTagDataType extends TagDataType {
  tagCount: number;
  userVoted: boolean;
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
// NewActivity
export interface BaseWithTagActivityDataType extends BaseActivityDataType {
  tags: TagDataType[];
}

export default ActivityDataType;
