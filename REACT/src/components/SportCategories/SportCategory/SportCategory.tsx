import React from "react";

import { Avatar, Typography, Paper } from '@mui/material';

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
        <div>
            <Avatar alt={category} src={imageUrl} />
            <Typography>{category}</Typography>
        </div>
    );
}

export default SportCategory;
