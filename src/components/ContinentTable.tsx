import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";

interface ColumnData {
  value: string;
  selected: boolean;
}

interface RowData {
  id: number;
  [key: string]: ColumnData | number;
}

// Named function for rendering checkbox header
function renderCheckboxHeader(
  columnName: string,
  title: string,
  selectedColumns: string[],
  toggleCheckbox: (columnName: string) => void
) {
  const isSelected = selectedColumns.includes(columnName);
  return (
    <div>
      <Checkbox
        checked={isSelected}
        style={{marginRight:'4px'}}
        onChange={() => toggleCheckbox(columnName)}
      />
      <span>{title}</span>
    </div>
  );
}

const TechnicalTable: React.FC = () => {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [orButtonClicked, setOrButtonClicked] = useState(false);
  const [c1ButtonClicked, setC1ButtonClicked] = useState(false);
  const [data, setData] = useState<RowData[]>([
    {
      id: 1,
      Alltechnical: {
        value: "Advances Collaboration Report",
        selected: false,
      },
      AllNonTechnical: {
        value: "CRC - VOICE OF the Customer",
        selected: false,
      },
    },
  ]);

  const toggleCheckbox = (columnName: string) => {
    const isSelected = selectedColumns.includes(columnName);
    if (isSelected) {
      setSelectedColumns(selectedColumns.filter((col) => col !== columnName));
      const updatedData = data.map((row) => ({
        ...row,
        [columnName]: { ...(row[columnName] as ColumnData), selected: false },
      }));
      setData(updatedData);
    } else {
      setSelectedColumns([...selectedColumns, columnName]);
      const updatedData = data.map((row) => ({
        ...row,
        [columnName]: { ...(row[columnName] as ColumnData), selected: true },
      }));
      setData(updatedData);
    }
  };

  const toggleProductSelection = (rowData: RowData, columnName: string) => {
    const updatedData = data.map((row) =>
      row.id === rowData.id
        ? {
            ...row,
            [columnName]: {
              ...(row[columnName] as ColumnData),
              selected: !(row[columnName] as ColumnData).selected,
            },
          }
        : row
    );
    setData(updatedData);

    const columnSelected = updatedData.every(
      (row) => (row[columnName] as ColumnData).selected
    );

    if (columnSelected) {
      setSelectedColumns([...selectedColumns, columnName]);
    } else {
      setSelectedColumns(selectedColumns.filter((col) => col !== columnName));
    }
  };

  const handleOrButtonClick = () => {
    setOrButtonClicked(true);
    setC1ButtonClicked(false); // Ensure C1 button is not clicked
  };

  const handleC1ButtonClick = () => {
    setC1ButtonClicked(true);
    setOrButtonClicked(false); // Ensure OR button is not clicked
  };

  const renderCheckboxBody = (rowData: RowData, columnName: string) => {
    const isSelected = (rowData[columnName] as ColumnData).selected;
    const value = (rowData[columnName] as ColumnData).value;
    return (
      <div className="checkbox-container">
        <Checkbox
          checked={isSelected}
          onChange={() => toggleProductSelection(rowData, columnName)}
          style={{marginRight:'4px'}}
        />
        <span>{value}</span>
        {columnName === "Alltechnical" && (
          <span style={{ marginLeft: "5em" }}>
            <Button
              label="OR"
              className="p-button-text p-button-outlined p-button-sm"
              onClick={handleOrButtonClick}
              style={{
                backgroundColor: orButtonClicked ? "#BF55EC" : "transparent",
                borderColor: orButtonClicked ? "#BF55EC" : "initial",
                color: "black",
              }}
            />
          </span>
        )}
        {columnName === "AllNonTechnical" && (
          <span style={{ marginLeft: "5em" }}>
            <Button
              label="C1"
              className="p-button-text p-button-outlined p-button-sm"
              onClick={handleC1ButtonClick}
              style={{
                backgroundColor: c1ButtonClicked ? "#BF55EC" : "transparent",
                borderColor: c1ButtonClicked ? "#BF55EC" : "initial",
                color: "black",
              }}
            />
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="custom-table datatable-responsive-demo">
      <DataTable className="custom-table" showGridlines value={data}>
        <Column
          field="Alltechnical"
          header={() =>
            renderCheckboxHeader(
              "Alltechnical",
              "All technical",
              selectedColumns,
              toggleCheckbox
            )
          }
          body={(rowData) => renderCheckboxBody(rowData, "Alltechnical")}
        />
        <Column
          field="AllNonTechnical"
          header={() =>
            renderCheckboxHeader(
              "AllNonTechnical",
              "All Non Technical",
              selectedColumns,
              toggleCheckbox
            )
          }
          body={(rowData) => renderCheckboxBody(rowData, "AllNonTechnical")}
        />
      </DataTable>
    </div>
  );
};

export default TechnicalTable;
