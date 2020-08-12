import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import React from "react";
import { useParams } from "react-router";
import "./Page.css";
import ScoreTable from "../components/ScoreTable";
import usePointTable from "../hooks/usePointTable";

const Page: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const isSingle = name === "single";
  const title = isSingle ? "Individual Score" : "Team Score";
  const {
    maps,
    leagues,
    selectedMap,
    selectedLeague,
    pointData,
    onMapChange: onMapChangeHooks,
    onLeagueChange: onLeagueChangeHooks,
  } = usePointTable({
    name,
    isSingle,
  });

  const onLeagueChange = (event: any) => {
    onLeagueChangeHooks(event);
  };

  const onMapChange = (event: any) => {
    onMapChangeHooks(event);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol sizeMd="3" offsetMd="1">
              <IonLabel>Please select a league:</IonLabel>
              <IonSelect
                className="page-select"
                interface="popover"
                value={selectedLeague}
                onIonChange={onLeagueChange}
              >
                {leagues.map((league) => (
                  <IonSelectOption key={league} value={league}>
                    {league}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonCol>
            {isSingle ? (
              <IonCol sizeMd="3" offset="1">
                <IonLabel>Please select a map:</IonLabel>
                <IonSelect
                  className="page-select"
                  interface="popover"
                  value={selectedMap}
                  onIonChange={onMapChange}
                >
                  {maps.map(({ key, name }) => (
                    <IonSelectOption key={key} value={key}>
                      {name}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonCol>
            ) : null}
          </IonRow>
        </IonGrid>
        <ScoreTable pointData={pointData} />
      </IonContent>
    </IonPage>
  );
};

export default Page;
