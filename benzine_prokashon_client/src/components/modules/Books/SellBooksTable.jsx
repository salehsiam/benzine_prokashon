import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import useSellBooks from "../../../Hooks/useSellBooks";

const SellBooksTable = () => {
  const [period, setPeriod] = useState("day");
  const [page, setPage] = useState(1);
  const [openRow, setOpenRow] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const limit = 20;

  const { data, isLoading, isError } = useSellBooks({
    period,
    page,
    limit,
    startDate: period === "custom" ? startDate : undefined,
    endDate: period === "custom" ? endDate : undefined,
  });

  const rows = data?.rows || [];
  const totalCount = data?.totalCount || 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));

  const getPageNumbers = () => {
    const max = 5;
    let start = Math.max(page - 2, 1);
    let end = Math.min(start + max - 1, totalPages);
    if (end - start < max - 1) start = Math.max(end - max + 1, 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data</p>;

  return (
    <div className="space-y-4">
      {/* Filter */}
      <div className="flex items-center gap-4 flex-wrap">
        <label htmlFor="period" className="font-medium">
          Filter by:
        </label>
        <select
          id="period"
          value={period}
          onChange={(e) => {
            setPeriod(e.target.value);
            setPage(1);
          }}
          className="border rounded px-2 py-1"
        >
          <option value="day">Day</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
          <option value="custom">Custom</option>
        </select>

        {period === "custom" && (
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded px-2 py-1"
            />
            <span>to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded px-2 py-1"
            />
            <Button
              onClick={() => {
                setPage(1); // reset to first page on filter
              }}
              disabled={!startDate || !endDate}
            >
              Apply
            </Button>
          </div>
        )}
      </div>

      {/* Table */}
      <Table>
        <TableCaption>
          Sales (page {page} of {totalPages})
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Seller</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Final Total</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length ? (
            rows.map((sale, index) => (
              <React.Fragment key={sale.invoice || index}>
                {/* Main sale row */}
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{sale.sellerName}</TableCell>
                  <TableCell>{sale.grandTotal}</TableCell>
                  <TableCell>{sale.discount}</TableCell>
                  <TableCell>{sale.finalTotal}</TableCell>
                  <TableCell>
                    {new Date(sale.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        setOpenRow(openRow === index ? null : index)
                      }
                    >
                      {openRow === index ? "Hide Books" : "View Books"}
                    </Button>
                  </TableCell>
                </TableRow>

                {/* Expandable row with book details */}
                {openRow === index && (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Books Sold:</h4>
                        <Table className="w-full border">
                          <TableHeader>
                            <TableRow>
                              <TableHead>Book Name</TableHead>
                              <TableHead>Quantity</TableHead>
                              <TableHead>Total</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {sale.items.map((book, i) => (
                              <TableRow key={i}>
                                <TableCell>{book.bookName}</TableCell>
                                <TableCell>{book.quantity}</TableCell>
                                <TableCell>{book.total}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        {getPageNumbers().map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-1 border rounded ${
              p === page ? "bg-blue-500 text-white" : ""
            }`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SellBooksTable;
