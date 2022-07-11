export interface ICategories {
    parentKey: string | null;
    value: string;
    key: string;
    selected?: boolean;
}

export const rootInterest: ICategories[] = [
    {
        parentKey: null,
        key: 'S-1',
        value: 'Sports',
    },
    {
        parentKey: null,
        key: 'A-1',
        value: 'Academics',
    },
    {
        parentKey: null,
        key: 'E-1',
        value: 'Extra-Curricular',
    },
    {
        parentKey: 'S-1',
        key: 'S-1-1',
        value: 'Cricket',
    },
    {
        parentKey: 'S-1',
        key: 'S-1-2',
        value: 'Badminton',
    },
    {
        parentKey: 'S-1',
        key: 'S-1-3',
        value: 'Hockey',
    },
    {
        parentKey: 'A-1',
        key: 'A-1-1',
        value: 'Maths',
    },
    {
        parentKey: 'A-1-1',
        key: 'A-1-1-1',
        value: 'Primary Maths',
    },
];
