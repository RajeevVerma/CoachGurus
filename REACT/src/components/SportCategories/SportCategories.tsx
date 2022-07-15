import { Grid } from '@mui/material';
import SportCategory, { ISportCategoryProps } from "./SportCategory/SportCategory";

import './SportCategories.scss';

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
        <div className="sportsList">
            {/* <h1 style={{padding:'5px 22px 22px'}}>What would you like to play?</h1> */}
            <Grid container spacing={2} >
                {
                    categories.map((category, i) => {
                        return (
                            <Grid item xs={6} md={2}>
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
