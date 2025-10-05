import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const [soldMap, setSoldMap] = useState({});
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.email) return;

    const fetchBooks = axiosSecure
      .get(`/my-books/${user.email}`) // Assuming this fetches books where writerEmail === user.email
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
      });

    const fetchSold = axiosSecure
      .get(`/sold-books/writer/${user.email}`)
      .then((res) => {
        const map = {};
        res.data.forEach((item) => {
          map[item.bookId] = item.sold;
        });
        setSoldMap(map);
      })
      .catch((err) => {
        console.error("Error fetching sold counts:", err);
      });

    Promise.all([fetchBooks, fetchSold])
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [axiosSecure, user?.email]);

  return (
    <div className="p-6 mt-28">
      <h1 className="text-2xl font-bold mb-6">📚 আমার বই</h1>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">#</TableHead>
              <TableHead>Cover</TableHead>
              <TableHead>Book Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Sold</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              // Skeleton Rows
              Array.from({ length: 3 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-12 h-16 rounded" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-12" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-12" />
                  </TableCell>
                </TableRow>
              ))
            ) : books.length > 0 ? (
              books.map((book, index) => (
                <TableRow key={book._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <img
                      src={book.coverImage}
                      alt={book.productNameBn}
                      className="w-12 h-16 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {book.productNameBn}
                  </TableCell>
                  <TableCell>৳ {book.listPrice}</TableCell>
                  <TableCell>{book.stock}</TableCell>
                  <TableCell>{soldMap[book._id] || 0}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-muted-foreground"
                >
                  No books found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MyBooks;
