interface ActivityDataType {
  Id: number;
  Title: string;
  Content: string;
  Image: string[] | null;
  Connection: string[] | null;
  Holder: string[] | null ;
  Objective: string[] | null;
  Sources: string[] | null;
  Subtitle:string | null;
  Tags: ActivityTagDataType[] | null;
  Branches: BranchDataType[];
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

}

interface DateType {
  [key: string]: string
}

export default ActivityDataType;
