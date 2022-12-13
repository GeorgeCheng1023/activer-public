import ActivityDataType, { BranchDataType } from 'types/ActivityDataType';

export const initialBranchesState: BranchDataType = {
  BranchName: '',
  DateStart: null,
  DateEnd: [],
  ApplyStart: [],
  ApplyEnd: [],
  ApplyFee: [],
  Location: [],
  Status: undefined,
};
export const initialDataState:ActivityDataType = {
  Id: 0,
  Title: '',
  Content: '',
  Connection: [],
  Holder: [],
  Image: [],
  Tags: [],
  Objective: [],
  Sources: [],
  Subtitle: '',
  Branches: [initialBranchesState],
};
