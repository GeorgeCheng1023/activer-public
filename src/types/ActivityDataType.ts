export interface BaseActivityDataType {
  Id: number;
  Title: string;
  Image: string[] | null;
}

// for Manage Page
export interface UserActivityDataType extends BaseActivityDataType {
  Tags: TagDataType[];
  Branch: BranchDataType;
}

interface ActivityDataType extends BaseActivityDataType {
  Tags: ActivityTagDataType[] | null;
  Branches: BranchDataType[];
  Content: string;
  Connection: string[] | null;
  Holder: string[] | null ;
  Objective: string[] | null;
  Sources: string[] | null;
  Subtitle:string | null;
}

export interface TagDataType {
  Type: string;
  Id: number;
  Text: string;
}

export interface ActivityTagDataType extends TagDataType {
  TagCount: number;
  UserVoted: boolean;
}

export interface BranchDataType {
  Id: number;
  BranchName: string;
  DateStart: DateType | null;
  DateEnd: string[] | null ;
  ApplyStart: string[] | null ;
  ApplyEnd: string[] | null;
  ApplyFee: string[] | null;
  Location: string[] | null;
  Status: string | undefined | null;
}

interface DateType {
  [key: string]: string
}

export default ActivityDataType;
