import ActivityDataType, { BranchDataType } from 'types/ActivityDataType';

export const initialBranchesState: BranchDataType = {
  Id: 0,
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
