import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";

const BookSalesTable = () => {
  const [sales, setSales] = useState([]);
  const [period, setPeriod] = useState("day");
  const [loading, setLoading] = useState(false);
  const [customRange, setCustomRange] = useState({ start: "", end: "" });
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchSales = async () => {
      try {
        setLoading(true);
        let url = `/sales/books?period=${period}`;

        if (period === "custom" && customRange.start && customRange.end) {
          url = `/sales/books?startDate=${customRange.start}&endDate=${customRange.end}`;
        }

        const res = await axiosSecure.get(url);
        setSales(res.data);
      } catch (err) {
        console.error("Error fetching sales:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSales();
  }, [period, customRange, axiosSecure]);

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center gap-4">
          <CardTitle>📚 Book Sales Report</CardTitle>
          <div className="flex items-center gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Daily</SelectItem>
                <SelectItem value="month">Monthly</SelectItem>
                <SelectItem value="year">Yearly</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>

            {period === "custom" && (
              <div className="flex gap-2">
                <input
                  type="date"
                  value={customRange.start}
                  onChange={(e) =>
                    setCustomRange((prev) => ({
                      ...prev,
                      start: e.target.value,
                    }))
                  }
                  className="border rounded px-2 py-1"
                />
                <input
                  type="date"
                  value={customRange.end}
                  onChange={(e) =>
                    setCustomRange((prev) => ({ ...prev, end: e.target.value }))
                  }
                  className="border rounded px-2 py-1"
                />
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            {/* Table header skeleton */}
            <div className="grid grid-cols-4 gap-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-6 w-36" />
              <Skeleton className="h-6 w-28" />
            </div>
            {/* Table rows skeleton */}
            {[...Array(5)].map((_, i) => (
              <div key={i} className="grid grid-cols-4 gap-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-6 w-36" />
                <Skeleton className="h-6 w-28" />
              </div>
            ))}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Book Name</TableHead>
                <TableHead>Total Sales Amount</TableHead>
                <TableHead>Total Quantity</TableHead>
                <TableHead>Order Count</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No sales data found
                  </TableCell>
                </TableRow>
              ) : (
                sales.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell>{row?.bookName}</TableCell>
                    <TableCell>{row.totalSalesAmount}</TableCell>
                    <TableCell>{row.totalQuantity}</TableCell>
                    <TableCell>{row.orderCount}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default BookSalesTable;
