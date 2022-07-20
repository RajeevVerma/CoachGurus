export interface ICategories {
  parentKey: string | null;
  value: string;
  key: string;
  selected?: boolean;
}

export const rootInterest: ICategories[] = [
  {
    parentKey: 'S',
    key: 'S-1',
    value: 'Cricket',
  },
  {
    parentKey: 'S',
    key: 'S-2',
    value: 'Badminton',
  },
  {
    parentKey: 'S',
    key: 'S-3',
    value: 'Hockey',
  },
  {
    parentKey: 'A',
    key: 'A-1',
    value: 'Maths',
  },
  {
    parentKey: 'A',
    key: 'A-2',
    value: 'Science',
  },
  {
    parentKey: 'A',
    key: 'A-3',
    value: 'C++',
  },
  {
    parentKey: 'F',
    key: 'F-1',
    value: 'YOGA',
  },
  {
    parentKey: 'E',
    key: 'E-1',
    value: 'Guitar',
  },
];
