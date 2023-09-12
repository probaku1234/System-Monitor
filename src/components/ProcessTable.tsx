import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { useSort } from "@table-library/react-table-library/sort";
import { Action, State } from "@table-library/react-table-library/types/common";
import { useAppSelector } from "../redux/hooks";
import { selectSystemInfo } from "../redux/slice/systemInfoSlice";
import { PorcessInfoState } from "../redux/slice/systemInfoSlice";
import { usePagination } from "@table-library/react-table-library/pagination";
import { byteToMByte } from "../utils/util-functions";
import "./ProcessTable.css";

export const ProcessTable = () => {
  const { processInfo } = useAppSelector(selectSystemInfo);
  const maxPages = 2;
  const nodes = processInfo;
  const data = { nodes };
  const theme = useTheme(getTheme());
  const sort = useSort(
    data as any,
    {
      state: {
        sortKey: "CPU",
        reverse: true,
      },
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
  const pagination = usePagination(data as any, {
    state: {
      page: 0,
      size: 5,
    },
    onChange: onPaginationChange,
  });

  function onSortChange(action: Action, state: State) {
    console.log(action, state);
  }

  function onPaginationChange(action: Action, state: State) {
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
      renderCell: (item: PorcessInfoState) => `${item.cpuUsage.toFixed(2)} %`,
      sort: { sortKey: "CPU" },
    },
    {
      label: "RAM",
      renderCell: (item: PorcessInfoState) =>
        `${byteToMByte(item.memoryUsage)} MB`,
      sort: { sortKey: "RAM" },
    },
  ];
  return (
    <>
      <CompactTable
        columns={COLUMNS}
        data={data}
        theme={theme}
        sort={sort}
        pagination={pagination}
      />

      <br />
      <div className="pagination-wrapper">
        <span>Total Process: {processInfo.length}</span>

        <span>
          Page:{" "}
          {pagination.state
            .getPages(data.nodes)
            .map((_: PorcessInfoState, index: number) => {
              if (index < maxPages) {
                return (
                  <button
                    key={index}
                    type="button"
                    style={{
                      fontWeight:
                        pagination.state.page === index ? "bold" : "normal",
                    }}
                    onClick={() => pagination.fns.onSetPage(index)}
                  >
                    {index + 1}
                  </button>
                );
              }
            })}
        </span>
      </div>
    </>
  );
};
