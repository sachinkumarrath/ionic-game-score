import React, { useRef } from "react";
import { IonGrid, IonRow, IonCol } from "@ionic/react";
import { AgGridReact as AGGrid } from "ag-grid-react"
import { GridApi } from "ag-grid-community";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import "./ScoreTable.css";

const ScoreTable: React.FC<{
  pointData: {
    team: string;
    played: number;
    points: number;
    scoreDiff: string;
  }[];
}> = ({ pointData }) => {
  
  const rowHeight : number = 40
  const gridRef : any = useRef(null)

  const columnDefs = [
    {
      field: "team",
      headerName: "Team"
    },
    {
      field: "played",
      headerName: "Played"
    },
    {
      field: "points",
      headerName: "Points",
      sortable: true
    },
    {
      field: "scoreDiff",
      headerName: "Score Diff",
      sortable: true
    },
  ]

  const getRowClass = (params : any) => {
    if (params.node.rowIndex === 0) {
      return 'row-class-first';
    }
    if (params.node.rowIndex === 1) {
      return 'row-class-second';
    }
    if (params.node.rowIndex === 2) {
      return 'row-class-third';
    }
    return ''
  }

  const onGridReady = (params: {type: string, columnApi: object, api: GridApi}) => {
    // console.log(params.api.getSizesForCurrentTheme())
    gridRef.current = params.api
    params.api.sizeColumnsToFit()
    var defaultSortModel = [
      { colId: 'points', sort: 'desc' },
      { colId: 'scoreDiff', sort: 'desc' },
    ];
    params.api.setSortModel(defaultSortModel);
  }

  return (
    <IonGrid className="points-grid">
      <IonRow className="grid-header">
        <IonCol offsetMd="1" sizeMd="10">
        <div style={{
          height: `${(pointData.length + 2) * rowHeight}px`
        }} className="ag-theme-alpine">
        <AGGrid 
          onGridReady={onGridReady}
          getRowHeight={() => rowHeight}
          defaultColDef={{}}
          sortingOrder= {['desc', 'asc']}
          columnDefs={columnDefs}
          rowData={pointData}
          getRowClass={getRowClass}
        />
      </div>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default ScoreTable;
