import {
    IonCol,
    IonContent,
    IonGrid,
    IonRow,
    IonImg,
    IonText,
} from '@ionic/react';
import React from 'react';
import { GoogleMap } from '@capacitor/google-maps';
import { useRef } from 'react';

// Import css
import './CoachProfileContainer.css';

// Import Image
import {CoachProfile, CoachLocation} from '../../contents';

// Import Components
import { Header } from '../../components'
interface ContainerProps {
}

const CoachProfileContainer: React.FC<ContainerProps> = () => {

    const mapRef = useRef<HTMLElement>();
    let newMap: GoogleMap;

    async function createMap() {
        if (!mapRef.current) return;

        newMap = await GoogleMap.create({
        id: 'my-cool-map',
        element: mapRef.current,
        apiKey: 'process.env.REACT_APP_YOUR_API_KEY_HERE',
        config: {
            center: {
            lat: 33.6,
            lng: -117.9
            },
            zoom: 8
        }
        })
    }
    
    return (
        <>
            <Header />
            <IonContent
                className='main-container'
                fullscreen={true}>
                {/* <h1> Coach Profile Page</h1> */}
                <IonGrid>
                    <IonRow> 
                        <IonCol size="12" size-sm size-md="8">
                            <IonGrid>
                                <IonRow>
                                    <IonCol size="12" size-sm size-md="6">
                                        <IonImg src={CoachProfile}/>
                                        <IonText>
                                        </IonText>
                                    </IonCol>
                                    <IonCol size="12" size-sm size-md="6">
                                        <IonText>
                                            <h1>Guru Name</h1>
                                            <p>Rating Here</p>
                                            <p>8 Years of Exp</p>
                                            <p><b>Short Bio Here...</b></p>
                                        </IonText>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                <IonCol size="12" size-sm size-md="12">
                                        <IonText>
                                            <p><b>Achievements:</b></p>
                                            <p><b>Currently Associated With:</b></p>
                                            <p>Academy One</p>
                                            <p>Academy Two</p>
                                        </IonText>
                                        <IonText>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                        </IonText>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonCol>
                        <IonCol size="12" size-sm size-md="4">
                        <IonRow>
                                <IonCol size="12" size-sm size-md="12">
                                    <p><b>Training Locations</b></p>
                                    {/* <div className="component-wrapper">
                                        <capacitor-google-map ref={mapRef} style={{
                                            display: 'inline-block',
                                            width: 275,
                                            height: 400
                                        }}></capacitor-google-map>

                                        <button onClick={createMap}>Create Map</button>
                                    </div> */}
                                    <IonImg src={CoachLocation}/>
                                </IonCol>
                            </IonRow>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </>
    );
};

export default CoachProfileContainer;