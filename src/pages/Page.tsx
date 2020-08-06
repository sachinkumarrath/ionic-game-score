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
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./Page.css";
import ScoreTable from "../components/ScoreTable";

const Page: React.FC = () => {
  const [leagueData, setLeagueData] = useState<any>({});
  const [maps, setMaps] = useState<{ key: string; name: string }[]>([]);
  const [leagues, setLeagues] = useState<string[]>([]);
  const [selectedMap, setSelectedMap] = useState<string>("");
  const [selectedLeague, setSelectedLeague] = useState<string>("");
  const [pointData, setPointData] = useState<
    { team: string; played: number; points: number; scoreDiff: string }[]
  >([]);

  const { name } = useParams<{ name: string }>();
  const isSingle = name === "single";
  const title = isSingle ? "Individual Score" : "Team Score";

  useEffect(() => {
    const url = `https://cs-score.firebaseio.com/${name}.json`;
    fetch(url)
      .then((res) => res.json())
      .then((responseData) => {
        const defaultLeague = responseData.leagues[0];
        const defaultMap = "overall";
        setLeagueData(responseData);
        setLeagues(responseData.leagues);
        setSelectedLeague(defaultLeague);
        if (isSingle) {
          setMaps(responseData[defaultLeague]["maps"]);
          setSelectedMap(defaultMap);
          const leaguePoints =
            responseData[defaultLeague]["points"][defaultMap];
          setPointData(sortByPointDesc(leaguePoints));
        } else {
          const { points: leaguePoints } = responseData[defaultLeague];
          setPointData(sortByPointDesc(leaguePoints));
        }
      });
  }, [name, isSingle]);

  const onLeagueChange = (event: any) => {
    const changedLeague = event.target.value;
    setSelectedLeague(changedLeague);
    if (isSingle) {
      const defaultMap = "overall";
      const leaguePoints = leagueData[changedLeague]["points"][defaultMap];
      setSelectedMap(defaultMap);
      setMaps(leagueData[changedLeague]["maps"]);
      setPointData(sortByPointDesc(leaguePoints));
    } else {
      const { points: leaguePoints } = leagueData[changedLeague];
      setPointData(sortByPointDesc(leaguePoints));
    }
  };

  const onMapChange = (event: any) => {
    const changedMap = event.target.value;
    const leaguePoints = leagueData[selectedLeague]["points"][changedMap];
    setSelectedMap(changedMap);
    setPointData(sortByPointDesc(leaguePoints));
  };

  const sortByPointDesc = (leaguePoints: any) =>
    Object.keys(leaguePoints)
      .map((team) => ({ ...leaguePoints[team], team }))
      .sort((row1, row2) => {
        if (row2.points === row1.points) {
          return row2.scoreDiff - row1.scoreDiff;
        }
        return row2.points - row1.points;
      });

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
            <IonCol sizeMd="3" offsetMd="2">
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
              <IonCol sizeMd="3" offset="2">
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
