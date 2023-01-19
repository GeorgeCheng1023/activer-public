import ActivityDataType, { BranchDataType } from 'types/ActivityDataType';

export const initialBranchesState: BranchDataType = {
  id: 0,
  branchName: '',
  dateStart: null,
  dateEnd: [],
  applyStart: [],
  applyEnd: [],
  applyFee: [],
  location: [],
  status: undefined,
};
export const initialDataState:ActivityDataType = {
  id: 0,
  title: '',
  content: '',
  connection: [],
  holder: [],
  images: [],
  tags: [],
  objective: [],
  sources: [],
  subTitle: '',
  branches: [initialBranchesState],
};
