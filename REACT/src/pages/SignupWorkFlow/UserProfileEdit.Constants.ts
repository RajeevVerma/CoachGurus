export interface ICategories {
  value: string;
  key: string;
  selected?: boolean;
  child?: ICategories[];
}

export const rootInterest: ICategories[] = [
  {
    key: 'S-1',
    value: 'Sports',
    child: [
      {
        key: 'S-1-1',
        value: 'Cricket',
      },
      {
        key: 'S-1-2',
        value: 'Volleyball',
      },
      {
        key: 'S-1-3',
        value: 'Badminton',
      },
    ],
  },
  {
    key: 'A-1',
    value: 'Academics',
    child: [
      {
        key: 'A-1-1',
        value: 'Maths',
        child: [
          {
            key: 'A-1-1-1',
            value: 'Primary School',
          },
        ],
      },
    ],
  },
  {
    key: 'E-1',
    value: 'Extra-Curricular',
  },
];
