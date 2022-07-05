import { Avatar, Typography, Card,CardMedia, } from '@mui/material';
import '../SportCategories.scss';

export interface ISportCategoryProps {
    category: string,
    imageUrl: string,
}

function SportCategory(props: ISportCategoryProps) {
    const {
        category,
        imageUrl
    } = props;

    return (
        <div className="sportCategory">
            <img alt={category} src={imageUrl} />
            <p>{category}</p>
        </div>
    );
}

export default SportCategory;
