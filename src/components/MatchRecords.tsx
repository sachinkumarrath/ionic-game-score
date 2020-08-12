import { AgGridReact as AGGrid } from "ag-grid-react";
import React, { useRef } from "react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { IonGrid, IonRow, IonCol } from "@ionic/react";

const MatchRecords: React.FC = () => {
  const gridRef: any = useRef(null);

  const rowData = [
    {
      name: "Rakesh",
      salary: 1000,
      location: "bbs",
    },
    {
      name: "Ramesh",
      salary: 2000,
      location: "blr",
    },
    {
      name: "Suraj",
      salary: 1500,
      location: "bbs",
    },
    {
      name: "Raman",
      salary: 1000,
      location: "bbs",
    },
    {
      name: "Nikita",
      salary: 2000,
      location: "blr",
    },
    {
      name: "Disha",
      salary: 1500,
      location: "bbs",
    },
    {
      name: "Amir",
      salary: 1000,
      location: "mum",
    },
    {
      name: "Amrita",
      salary: 2000,
      location: "blr",
    },
    {
      name: "Priyanka",
      salary: 1500,
      location: "mum",
    },
  ];

  // const columnDefs = [{
  //   headerName: "Employee",
  //   field: "name",
  //   checkboxSelection: true
  // },
  // {
  //   headerName: "Salary",
  //   field: "salary",
  //   sortable: true
  // },
  // {
  //   headerName: "Office Location",
  //   field: "location",
  //   filter: true
  // }]

  const columnDefs = [
    {
      headerName: "Team 1",
      field: "team1",
      filter: true,
    },
    {
      headerName: "Team 2",
      field: "team2",
      filter: true,
    },
    {
      headerName: "Employee Data",
      children: [
        {
          headerName: "Salary",
          field: "salary",
          sortable: true,
        },
        {
          headerName: "Office Location",
          field: "location",
          filter: true,
        },
      ],
    },
  ];

  const checkSelectedRow = () => {
    console.log("grid ref", gridRef.current.getSelectedNodes());
  };

  return (
    <IonGrid className="matches-grid">
      <IonRow>
        <IonCol offsetMd="1" sizeMd="10">
          <div
            style={{
              height: "250px",
            }}
            className="ag-theme-alpine"
          >
            <AGGrid
              onGridReady={(params) => {
                gridRef.current = params.api;
              }}
              rowSelection="multiple"
              columnDefs={columnDefs}
              rowData={rowData}
            />
          </div>
        </IonCol>
      </IonRow>
    </IonGrid>
  );

  {
    /* return <><div style={{
    height: '250px',
    width: '600px' }} className="ag-theme-alpine">
      <AGGrid
        onGridReady={ params => {gridRef.current = params.api} } 
        rowSelection="multiple" columnDefs={columnDefs} rowData={rowData}
      />
    </div>
    <button onClick={checkSelectedRow}>Check Selection</button>
    </> */
  }
};

export default MatchRecords;
