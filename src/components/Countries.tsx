import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Checkbox } from "primereact/checkbox";

interface ColumnData {
  value: string;
  selected: boolean;
}

interface RowData {
  id: number;
  [key: string]: ColumnData | number;
}

const renderCheckboxHeader = (
  columnName: string,
  title: string,
  selectedColumns: string[],
  toggleCheckbox: (columnName: string) => void
) => {
  const isSelected = selectedColumns.includes(columnName);
  return (
    <div>
      <Checkbox
        checked={isSelected}
        style={{marginRight:'5px'}}
        onChange={() => toggleCheckbox(columnName)}
      />
      <span>{title}</span>
    </div>
  );
};

const ContinentTable: React.FC = () => {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [data, setData] = useState<RowData[]>([
    {
      id: 1,
      NorthAmerica: { value: "Canada", selected: false },
      SouthAmerica: { value: "Argentina", selected: false },
      IMG: { value: "Afghanistan", selected: false },
      Europe: { value: "Albania", selected: false },
      GreaterChina: { value: "China", selected: false },
    },
    {
      id: 2,
      NorthAmerica: { value: "Mexico", selected: false },
      SouthAmerica: { value: "Bolivia", selected: false },
      IMG: { value: "Algeria", selected: false },
      Europe: { value: "Andorra", selected: false },
      GreaterChina: { value: "Taiwan", selected: false },
    },
    {
      id: 3,
      NorthAmerica: { value: "United States", selected: false },
      SouthAmerica: { value: "Chile", selected: false },
      IMG: { value: "American Samoa", selected: false },
      Europe: { value: "Armenia", selected: false },
      GreaterChina: { value: "Hong Kong", selected: false },
    },
    {
      id: 4,
      NorthAmerica: { value: "Anguilla", selected: false },
      SouthAmerica: { value: "Brazil", selected: false },
      IMG: { value: "Angola", selected: false },
      Europe: { value: "Austria", selected: false },
      GreaterChina: { value: "Macao", selected: false },
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

  const renderCheckboxBody = (rowData: RowData, columnName: string) => {
    const isSelected = (rowData[columnName] as ColumnData).selected;
    const value = (rowData[columnName] as ColumnData).value;
    return (
      <div>
        <Checkbox
        style={{marginRight:'5px'}}
          checked={isSelected}
          onChange={() => toggleProductSelection(rowData, columnName)}
        />
        <span>{value}</span>
      </div>
    );
  };

  return (
    <div className="custom-table datatable-responsive-demo">
      <DataTable showGridlines value={data}>
        <Column
          field="NorthAmerica"
          header={() =>
            renderCheckboxHeader(
              "NorthAmerica",
              "North America",
              selectedColumns,
              toggleCheckbox
            )
          }
          body={(rowData) => renderCheckboxBody(rowData, "NorthAmerica")}
        />
        <Column
          field="SouthAmerica"
          header={() =>
            renderCheckboxHeader(
              "SouthAmerica",
              "South America",
              selectedColumns,
              toggleCheckbox
            )
          }
          body={(rowData) => renderCheckboxBody(rowData, "SouthAmerica")}
        />
        <Column
          field="IMG"
          header={() =>
            renderCheckboxHeader("IMG", "IMG", selectedColumns, toggleCheckbox)
          }
          body={(rowData) => renderCheckboxBody(rowData, "IMG")}
        />
        <Column
          field="Europe"
          header={() =>
            renderCheckboxHeader(
              "Europe",
              "Europe",
              selectedColumns,
              toggleCheckbox
            )
          }
          body={(rowData) => renderCheckboxBody(rowData, "Europe")}
        />
        <Column
          field="GreaterChina"
          header={() =>
            renderCheckboxHeader(
              "GreaterChina",
              "Greater China",
              selectedColumns,
              toggleCheckbox
            )
          }
          body={(rowData) => renderCheckboxBody(rowData, "GreaterChina")}
        />
      </DataTable>
    </div>
  );
};

export default ContinentTable;
