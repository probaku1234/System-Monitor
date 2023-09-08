import {
  Column,
  CompactTable,
} from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { useSort } from "@table-library/react-table-library/sort";
import { Action, State } from "@table-library/react-table-library/types/common";
import "./ProcessTable.css";

type processInfo = {
  name: string;
  cpuUsage: number;
  memoryUsage: number;
};

const nodes = [
  {
    name: "p1",
    cpuUsage: 20,
    memoryUsage: 30,
  },
  {
    name: "p2",
    cpuUsage: 30,
    memoryUsage: 20,
  },
];

export const ProcessTable = () => {
  const data = { nodes };
  const theme = useTheme(getTheme());
  const sort = useSort(
    data as any,
    {
      onChange: onSortChange,
    },
    {
      sortFns: {
        PROCESS: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
        CPU: (array) => array.sort((a, b) => a.cpuUsage - b.cpuUsage),
        RAM: (array) => array.sort((a, b) => a.memoryUsage - b.memoryUsage),
      },
    }
  );

  function onSortChange(action: Action, state: State) {
    console.log(action, state);
  }

  const COLUMNS = [
    {
      label: "Process",
      renderCell: (item: processInfo) => item.name,
      sort: { sortKey: "PROCESS" },
    },
    {
      label: "CPU",
      renderCell: (item: processInfo) => `${item.cpuUsage} %`,
      sort: { sortKey: "CPU" },
    },
    {
      label: "RAM",
      renderCell: (item: processInfo) => `${item.memoryUsage} %`,
      sort: { sortKey: "RAM" },
    },
  ];
  return (
    <>
      <CompactTable columns={COLUMNS} data={data} theme={theme} sort={sort} />
    </>
  );
};
