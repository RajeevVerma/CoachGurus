import { EndeavourCategory } from "./enums/enumTypes";
import { IAddress } from "./shared/address";
import { endeavour } from './endeavour-model';

export interface IAcademy {

    name: string,
    id: number,

    addr?: IAddress,

    endeavourCategories: EndeavourCategory[],
    endeavors?: endeavour[],

    childAcademyIds?: number[],
} 