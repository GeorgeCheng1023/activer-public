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
  trend: 0,
  content: '',
  connection: null,
  holder: null,
  images: null,
  tags: null,
  objective: null,
  sources: null,
  subTitle: '',
  branches: [initialBranchesState],
};
