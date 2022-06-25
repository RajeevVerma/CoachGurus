import React from "react";
import { IonContent } from "@ionic/react";
import { LoginContainer } from '../../container';

import { Header } from '../../components';

function Sports(): JSX.Element {
    return (
        <>
            <Header />
            <IonContent>
                <LoginContainer />
            </IonContent>
        </>
    )
}

export default Sports;