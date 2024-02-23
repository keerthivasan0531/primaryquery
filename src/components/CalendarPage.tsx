import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Calendar } from "primereact/calendar";
import { RadioButton } from "primereact/radiobutton";

type Nullable<T> = T | null;

const CalendarPage: React.FC = () => {
  const [selectedEntryOption, setSelectedEntryOption] = useState<string>("");
  const [selectedUpdateOption, setSelectedUpdateOption] = useState<string>("");
  const [selectedEntryDateFrom, setSelectedEntryDateFrom] = useState<Nullable<Date>>(null);
  const [selectedEntryDateTo, setSelectedEntryDateTo] = useState<Nullable<Date>>(null);
  const [selectedUpdateDateFrom, setSelectedUpdateDateFrom] = useState<Nullable<Date>>(null);
  const [selectedUpdateDateTo, setSelectedUpdateDateTo] = useState<Nullable<Date>>(null);

  const columns = [
    { field: "column1", header: "Report Entry" },
    { field: "column2", header: "Report Update Date" },
  ];

  const data = [
    { column1: "Data 1", column2: "Data 2" },
  ];

  return (
    <div className="table-1 card">
      <DataTable showGridlines value={data}>
        {columns.map((column) => (
          <Column
            key={column.field}
            header={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <p style={{ marginRight: '8px' }}>{column.header}</p>
                {column.field === "column1" ? (
                  <>
                    <RadioButton 
                      inputId={`entry7Days`}
                      name={`entryDateRange`}
                      value="7 Days"
                      onChange={(e) => setSelectedEntryOption(e.value || "")}
                      checked={selectedEntryOption === "7 Days"}
                      style={{marginRight:'3px'}}
                    />
                    <label htmlFor={`entry7Days`}>7 Days</label>

                    <RadioButton  style={{ marginLeft: '8px', marginRight:'3px' }}
                      inputId={`entry30Days`}
                      name={`entryDateRange`}
                      value="30 Days"
                      onChange={(e) => setSelectedEntryOption(e.value || "")}
                      checked={selectedEntryOption === "30 Days"}
                    />
                    <label htmlFor={`entry30Days`}>30 Days</label>
                  </>
                ) : (
                  <>
                    <RadioButton
                      inputId={`updateAnd`}
                      name={`updateDateLogic`}
                      value="AND"
                      onChange={(e) => setSelectedUpdateOption(e.value || "")}
                      checked={selectedUpdateOption === "AND"}
                      style={{marginRight:'3px'}}
                    />
                    <label htmlFor={`updateAnd`}>AND</label>

                    <RadioButton  style={{ marginLeft: '8px',marginRight:'3px' }}
                      inputId={`updateOr`}
                      name={`updateDateLogic`}
                      value="OR"
                      onChange={(e) => setSelectedUpdateOption(e.value || "")}
                      checked={selectedUpdateOption === "OR"}
                    />
                    <label htmlFor={`updateOr`}>OR</label>
                  </>
                )}
              </div>
            }
            body={(rowData) => (
              <div>
                {column.field === "column1" ? (
                  <>
                    <label htmlFor={`entryDateFrom_${rowData[column.field]}`}>From</label>
                    <Calendar
                      id={`entryDateFrom_${rowData[column.field]}`}
                      value={selectedEntryDateFrom}
                      onChange={(e) => setSelectedEntryDateFrom(e.value || null)}
                      placeholder="DD/MM/YYYY"
                      showIcon
                      style={{ marginLeft: '8px', marginBottom: '18px'}}
                    />
                    <br />
                    <label htmlFor={`entryDateTo_${rowData[column.field]}`} style={{ marginLeft: '8px' }}>To</label>
                    <Calendar
                      id={`entryDateTo_${rowData[column.field]}`}
                      value={selectedEntryDateTo}
                      onChange={(e) => setSelectedEntryDateTo(e.value || null)}
                      placeholder="DD/MM/YYYY"
                      showIcon
                      style={{ marginLeft: '18px' }}
                    />
                  </>
                ) : (
                  <>
                    <label>From</label>
                    <Calendar
                      id={`updateDateFrom_${rowData[column.field]}`}
                      value={selectedUpdateDateFrom}
                      onChange={(e) => setSelectedUpdateDateFrom(e.value || null)}
                      placeholder="DD/MM/YYYY"
                      showIcon
                      style={{ marginLeft: '8px', marginBottom: '18px' }}
                    />
                    <br />
                    <label htmlFor={`updateDateTo_${rowData[column.field]}`} style={{ marginLeft: '8px' }}>To</label>
                    <Calendar
                      id={`updateDateTo_${rowData[column.field]}`}
                      value={selectedUpdateDateTo}
                      onChange={(e) => setSelectedUpdateDateTo(e.value || null)}
                      placeholder="DD/MM/YYYY"
                      showIcon
                      style={{ marginLeft: '18px' }}
                    />
                  </>
                )}
              </div>
            )}
          />
        ))}
      </DataTable>
    </div>
  );
};

export default CalendarPage;

