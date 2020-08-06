import React from "react";
import { IonGrid, IonRow, IonCol } from "@ionic/react";
import "./ScoreTable.css";

const ScoreTable: React.FC<{
  pointData: {
    team: string;
    played: number;
    points: number;
    scoreDiff: string;
  }[];
}> = ({ pointData }) => {
  return (
    <IonGrid className="points-grid">
      <IonRow className="grid-header">
        <IonCol offsetMd="2" sizeMd="2">
          Team
        </IonCol>
        <IonCol sizeMd="2">Played</IonCol>
        <IonCol sizeMd="2">Points</IonCol>
        <IonCol sizeMd="2">Score Diff</IonCol>
      </IonRow>
      {pointData.map((rowData) => (
        <IonRow className="grid-content" key={rowData.team}>
          <IonCol offsetMd="2" sizeMd="2">
            {rowData.team}
          </IonCol>
          <IonCol sizeMd="2">{rowData.played}</IonCol>
          <IonCol sizeMd="2">{rowData.points}</IonCol>
          <IonCol sizeMd="2">{rowData.scoreDiff}</IonCol>
        </IonRow>
      ))}
    </IonGrid>
  );
};

export default ScoreTable;
