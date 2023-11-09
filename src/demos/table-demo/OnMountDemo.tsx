import React from "react";
import { AdminTable, GenericColumn } from "@hilma/forms";
import { useSearchParams } from "react-router-dom";

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
    />
  );
};

export default OnMountDemo;
