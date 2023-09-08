import {
  Column,
  CompactTable,
} from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { useSort } from "@table-library/react-table-library/sort";
import { Action, State } from "@table-library/react-table-library/types/common";
import { useAppSelector } from "../redux/hooks";
import { selectSystemInfo } from "../redux/slice/systemInfoSlice";
import { PorcessInfoState } from "../redux/slice/systemInfoSlice";
import { byteToMByte } from "../utils/util-functions";
import "./ProcessTable.css";

export const ProcessTable = () => {
  const { processInfo } = useAppSelector(selectSystemInfo);
  const nodes = processInfo.slice(0, 10);
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
      renderCell: (item: PorcessInfoState) => item.name,
      sort: { sortKey: "PROCESS" },
    },
    {
      label: "CPU",
      renderCell: (item: PorcessInfoState) => `${item.cpuUsage} %`,
      sort: { sortKey: "CPU" },
    },
    {
      label: "RAM",
      renderCell: (item: PorcessInfoState) => `${byteToMByte(item.memoryUsage)} MB`,
      sort: { sortKey: "RAM" },
    },
  ];
  return (
    <>
      <CompactTable columns={COLUMNS} data={data} theme={theme} sort={sort} />
    </>
  );
};
