import React from "react";
import { AdminTable, GenericColumn } from "@hilma/forms";
import { useTableQuery } from "@hilma/forms/dist/table/fetching/useTableQuery.hook";
import { useSearchParams } from "react-router-dom";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Excel from "exceljs";
import FileSaver from "file-saver";

import { useDirection, useTranslate } from "../../common/i18n";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

const UserTable = AdminTable<User>;

const OnMountDemo: React.FC = () => {
  const t = useTranslate();
  const dir = useDirection();
  const tableQuery = useTableQuery<User[]>("users");
  const [queryParams, setQueryParams] = useSearchParams();

  const columns: GenericColumn<User>[] = [
    { key: "name", label: t((i18n) => i18n.table.columnLabels.name) },
    {
      key: "company.name",
      label: t((i18n) => i18n.table.columnLabels.company),
    },
    { key: "email", label: t((i18n) => i18n.table.columnLabels.email) },
  ];

  return (
    <UserTable
      id="users"
      dir={dir}
      columns={columns}
      rowsUrl="https://jsonplaceholder.typicode.com/users"
      queryParams={queryParams}
      setQueryParams={setQueryParams}
      rowsPerPage={4}
      dropdownFilters={[
        {
          dropDownKey: "website",
          columnKey: "website",
          noneOption: "כל האתרים",
          options: [
            {
              optionKey: ".com",
              content: "אתר של חברה",
              filter: (website) => website.endsWith(".com"),
            },
            {
              optionKey: ".org",
              content: "אתר לארגון רשמי",
              filter: (website) => website.endsWith(".org"),
            },
          ],
        },
      ]}
      searchbar
      searchbarPlaceholder={t((i18n) => i18n.table.misc.search)}
      styled
      resultAmountText={(results) =>
        t((i18n) => i18n.table.misc.foundResults).replace(
          "{!}",
          String(results),
        )
      }
      endOfPageText={t((i18n) => i18n.table.misc.endOfPage)}
      noResultsText={t((i18n) => i18n.table.misc.noResults)}
      pageText={(page) =>
        t((i18n) => i18n.table.misc.page).replace("{!}", String(page))
      }
      showingResultsText={(first, last, full) =>
        t((i18n) => i18n.table.misc.showingResults)
          .replace("{1}", String(first))
          .replace("{2}", String(last))
          .replace("{3}", String(full))
      }
      rowId="id"
      navigateOnRowClick
      arrowColumn
      navigationFunction={(id) =>
        window.open(
          `https://jsonplaceholder.typicode.com/users/${id}`,
          "_blank",
          "noopener noreferrer",
        )
      }
      checkboxColumn
      actionButtons={[
        {
          label: t((i18n) => i18n.misc.exportExcel),
          icon: <FileDownloadIcon />,
          shouldResetCheckboxes: true,
          onAction: async (selected, params) => {
            if (!tableQuery.data) return;

            const rows = tableQuery.data.filter((user) => {
              const included = (selected as string[]).includes(String(user.id));
              return params.allChecked ? !included : included;
            });

            const workbook = new Excel.Workbook();
            const sheet = workbook.addWorksheet(
              t((i18n) => i18n.labels.onMountTable),
            );

            sheet.views = [{ rightToLeft: dir === "rtl" }];
            sheet.columns = [
              {
                header: t((i18n) => i18n.table.columnLabels.name),
                key: "name",
                width: 30,
                font: { bold: true },
              },
              {
                header: t((i18n) => i18n.table.columnLabels.email),
                key: "email",
                width: 45,
                font: { bold: true },
              },
              {
                header: t((i18n) => i18n.table.columnLabels.company),
                key: "companyName",
                width: 30,
                font: { bold: true },
              },
            ];
            sheet.insertRows(
              2,
              rows.map((row) => ({ ...row, companyName: row.company.name })),
            );

            const excelBuffer = await workbook.xlsx.writeBuffer();
            const fileData = new Blob([excelBuffer], {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
            });

            FileSaver.saveAs(
              fileData,
              t((i18n) => i18n.labels.onMountTable) + ".xlsx",
            );
          },
        },
      ]}
    />
  );
};

export default OnMountDemo;
