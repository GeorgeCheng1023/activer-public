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
  tagVotedCount: number; // user voted tag count
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

// for Manage Page
export interface UserActivityDataType extends BaseActivityDataType {
  tags: TagDataType[];
  branch: BranchDataType;
}

export interface TrendTagResultDataType extends ActivityTagDataType {
  tagTrend: number;
  activityAmount: number;
}

export interface CommentResultDataType {
  createAt: string;
  id: number;
  content: string;
  star: number;
  userId: number;
  activityId: number;
  // TODO: user and activity Type
}
export default ActivityDataType;
