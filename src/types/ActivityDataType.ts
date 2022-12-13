export interface BaseActivityDataType {
  Id: number;
  Title: string;
  Image: string[] | null;
  Tags: ActivityTagDataType[] | null;
  Branches: BranchDataType[]
}

interface ActivityDataType extends BaseActivityDataType {
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
