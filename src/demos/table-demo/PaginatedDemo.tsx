import { AdminTable, GenericColumn } from "@hilma/forms";
import { useSearchParams } from "react-router-dom";

import { useDirection, useTranslate } from "../../common/i18n";
import StarRating from "../../components/StarRating";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
};

const ProductTable = AdminTable<Product, "products", "total">;

const PaginatedDemo: React.FC = () => {
  const t = useTranslate();
  const dir = useDirection();
  const [queryParams, setQueryParams] = useSearchParams();

  const columns: GenericColumn<Product>[] = [
    { key: "title", label: t((i18n) => i18n.table.columnLabels.title) },
    {
      key: "price",
      label: t((i18n) => i18n.table.columnLabels.price),
      renderColumn: (row) => {
        const originalPrice = row.price;
        const discount = (row.discountPercentage / 100) * originalPrice;

        return (
          <div>
            <s>${originalPrice.toFixed(2)}</s>
            <br />
            <b>${(originalPrice - discount).toFixed(2)}</b>
          </div>
        );
      },
    },
    {
      key: "stock",
      label: t((i18n) => i18n.table.columnLabels.stock),
    },
    {
      key: "brand",
      label: t((i18n) => i18n.table.columnLabels.brand),
    },
    {
      key: "rating",
      label: t((i18n) => i18n.table.columnLabels.rating),
      renderColumn: (row) => <StarRating rating={row.rating} />,
    },
  ];

  return (
    <ProductTable
      id="products"
      rowsUrl="https://dummyjson.com/products/search"
      dir={dir}
      columns={columns}
      queryParams={queryParams}
      setQueryParams={setQueryParams}
      fetchOnPaginate
      resultsKey="products"
      countKey="total"
      pageParamName="skip"
      getPageParam={(page) => String((page - 1) * 5)}
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
      searchbar
      searchbarPlaceholder={t((i18n) => i18n.table.misc.search)}
      styled
      rowId="id"
      navigateOnRowClick
      arrowColumn
      navigationFunction={(_, row) =>
        window.open(row.thumbnail, "_blank", "noopener noreferrer")
      }
    />
  );
};

export default PaginatedDemo;
