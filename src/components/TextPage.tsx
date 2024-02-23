import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const ContinentTable: React.FC = () => {
  const [data] = useState([
    {
      vehicleFunctionGroup: {
        value: "All Other(List box with scroller)",
      },
      SymptomCode: {
        value: "",
      },
    },
  ]);

  const rootCauseData = [
    {
      rootCause: "Root Port Function",
      WCC: "Plain Text",
      CasualPart: "Plain Text",
    },
  ];

  return (
    <div className=" datatable-responsive-demo">
      {/* Main DataTable */}
      <DataTable showGridlines value={data}>
        <Column
          header="Vehicle Function Group"
          body={(rowData) => rowData.vehicleFunctionGroup.value}
        />
        <Column
          header="Symptom Code"
          body={(rowData) => rowData.SymptomCode.value}
        />
      </DataTable>


       <br />
       <div  className="Table1">
      <DataTable showGridlines value={rootCauseData} header="Root Cause" style={{textAlign:"center", width:'100%'}}>
        <Column style={{textAlign:"center"}} header="WCC" body={(rowData) => rowData.WCC} />
        <Column style={{textAlign:"center"}} header="Casual Part" body={(rowData) => rowData.CasualPart} />

      </DataTable>
      </div>
    </div>
  )
};

export default ContinentTable;
