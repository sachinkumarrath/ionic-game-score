import React from "react";
import { IonSelect, IonSelectOption, IonItem, IonLabel } from "@ionic/react";

const PageSelector: React.FC<{
  options: string[];
  selected: string;
  onOptionChange: (event: any) => void;
}> = ({ options, selected, onOptionChange }) => {
  return (
    <IonItem>
      <IonLabel>Please select a league:</IonLabel>
      <IonSelect
        interface="popover"
        value={selected}
        onIonChange={onOptionChange}
      >
        {options.map((option) => (
          <IonSelectOption key={option} value={option}>
            {option}
          </IonSelectOption>
        ))}
      </IonSelect>
    </IonItem>
  );
};

/*
 Note : 
 interface: "action-sheet" | "alert" | "popover"
 cancelText : 
 okText : 
*/

export default PageSelector;
