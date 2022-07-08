import React, { useState } from "react";

/** Import material components */
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';

/** Import ionic native widget */
import { Geolocation } from '@awesome-cordova-plugins/geolocation';

function LocationPicker(): JSX.Element {
    const [location, setLocation] = useState('Pune');

    const handleLocationChange = (event: SelectChangeEvent) => {
        const selectLoc = event.target.value;
        if (selectLoc === 'MyLocation') {
            Geolocation.getCurrentPosition().then((res) => {
                console.log(res);
                // send it back to the handler which will store it in the cetral store 
            });
        }

        setLocation(selectLoc);
    }
    return (<>
        <Select
            fullWidth
            id="demo-simple-select"
            value={location}
            label="Location"
            sx={{
                height: 50,
                boder: "1px solid white",
                color: '#000', "&.MuiSVGIcon-root": {
                    color: 'black',
                },
            }}
            onChange={handleLocationChange}>
            <MenuItem value='MyLocation'>Use My Location</MenuItem>
            <MenuItem value='Pune'>Pune</MenuItem>
        </Select>
    </>);
}

export default LocationPicker;