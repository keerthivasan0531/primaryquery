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
        style={{ marginRight: "4px" }}
        onChange={() => toggleCheckbox(columnName)}
      />
      <span>{title}</span>
    </div>
  );
}

const CategoryBox: React.FC = () => {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [data, setData] = useState<RowData[]>([
        {
          id: 1,
          Category: { value: "Category 1", selected: false },
          Qualifier1: { value: "Similar to Category with listbox Scroll", selected: false },
          Qualifier2: { value: "Similar to Category with listbox Scroll", selected: false },
          Qualifier3: { value: "Similar to Category with listbox Scroll", selected: false },
          SymtomCode: { value: "Similar to Category with listbox Scroll", selected: false },
        },
        {
        id: 2,
          Category: {value:"Category 2", selected: false }
        },
        {
          id: 3,
            Category: {value:"Category 3", selected: false }
        }

      ]);

const toggleCheckbox = (columnName: string) => {
  const isSelected = selectedColumns.includes(columnName);
  const updatedData = data.map((row) => ({
    ...row,
    [columnName]: { ...(row[columnName] as ColumnData), selected: !isSelected },
  }));
  setData(updatedData);

  if (isSelected) {
    setSelectedColumns(selectedColumns.filter((col) => col !== columnName));
  } else {
    setSelectedColumns([...selectedColumns, columnName]);
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
  
    // Count the selected checkboxes in the column
    const selectedCount = updatedData.reduce(
      (count, row) => count + ((row[columnName] as ColumnData).selected ? 1 : 0),
      0
    );
  
    if (selectedCount === updatedData.length) {
      setSelectedColumns([...selectedColumns, columnName]);
    } else {
      setSelectedColumns(selectedColumns.filter((col) => col !== columnName));
    }
  };
  
  
  const renderCheckboxBody = (rowData: RowData, columnName: string) => {
    const columnData = rowData[columnName] as ColumnData;
  
    if (columnData && columnData.selected !== undefined && columnData.value !== undefined) {
      const isSelected = columnData.selected;
      const value = columnData.value;
  
      return (
        <div className="checkbox-container">
          <Checkbox
            checked={isSelected}
            onChange={() => toggleProductSelection(rowData, columnName)}
            style={{ marginRight: '4px' }}
          />
          <span>{value}</span>
        </div>
      );
    }
  
    // If the columnData is not defined, return null or an empty container
    return null;
  };

  return (
    <div className="custom-table datatable-responsive-demo">
      <DataTable showGridlines value={data}>
        <Column
          field="Category"
          header={() =>
            renderCheckboxHeader(
              "Category",
              "Category",
              selectedColumns,
              toggleCheckbox
            )
          }
          body={(rowData) => renderCheckboxBody(rowData, "Category")}
        />
        <Column
          field="Qualifier1"
          header={() =>
            renderCheckboxHeader(
              "Qualifier1",
              "Qualifier 1",
              selectedColumns,
              toggleCheckbox
            )
          }
          body={(rowData) => renderCheckboxBody(rowData, "Qualifier1")}
        />
        <Column
          field="Qualifier2"
          header={() =>
            renderCheckboxHeader(
              "Qualifier2",
              "Qualifier 2",
              selectedColumns,
              toggleCheckbox
            )
          }
          body={(rowData) => renderCheckboxBody(rowData, "Qualifier2")}
        />
        <Column
          field="Qualifier3"
          header={() =>
            renderCheckboxHeader(
              "Qualifier3",
              "Qualifier 3",
              selectedColumns,
              toggleCheckbox
            )
          }
          body={(rowData) => renderCheckboxBody(rowData, "Qualifier3")}
        />
        <Column
          field="SymtomCode"
          header={() =>
            renderCheckboxHeader(
              "SymtomCode",
              "SymtomCode",
              selectedColumns,
              toggleCheckbox
            )
          }
          body={(rowData) => renderCheckboxBody(rowData, "SymtomCode")}
        />
      </DataTable>
    </div>
  );
};

export default CategoryBox;
