import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useLocation } from "react-router-dom";

export default function MyDataTable(props) {
  // State to manage selected rows
  const [selectedRows, setSelectedRows] = useState(null);
  const location = useLocation().pathname;

  return (
    <div className="">
      <DataTable
        value={props.data}
        scrollable
        stripedRows
        showGridlines
        paginator
        rows={location === "/track" ? 5 : 10}
        rowsPerPageOptions={[10, 25, 50, 100]}
        emptyMessage="No Data Available"
        selection={selectedRows}
        onSelectionChange={(e) => setSelectedRows(e.value)}
        selectionMode="multiple"
      >
        <Column selectionMode="multiple" headerStyle={{ width: "3em" }} />
        {props?.columns?.map((col, ind) => (
          <Column
            key={ind}
            field={col.field}
            header={col.header}
            sortable={true}
            style={{ minWidth: "14rem", fontFamily: "Manrope" }}
          />
        ))}
      </DataTable>
    </div>
  );
}
