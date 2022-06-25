import { Grid } from '@mui/material';
import SportCategory, { ISportCategoryProps } from "./SportCategory/SportCategory";

import './SportCategories.css';

interface ISportCategoriesProps {
    categories: ISportCategoryProps[],
    customClassName?: string,
}

function SportCategories(props: ISportCategoriesProps): JSX.Element {
    const {
        categories,
        customClassName
    } = props;


    return (
        <div className={customClassName}>
            <Grid container spacing={2} >
                {
                    categories.map((category, i) => {
                        return (
                            <Grid item md={3}>
                                <SportCategory
                                    imageUrl={category.imageUrl}
                                    category={category.category} />
                            </Grid>);
                    })
                }

            </Grid>
        </div>
    );
}

export default SportCategories;
