import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import useBooks from "../../../Hooks/useBooks";
import { SquarePen, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../ui/alert-dialog";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "../../ui/skeleton";

const ManageBooksTable = () => {
  // Pagination State
  const [page, setPage] = useState(1);
  const limit = 10;

  const { books, totalPages, isLoading, refetch } = useBooks(page, limit);
  const [selectedBook, setSelectedBook] = useState(null);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleDelete = async (bookId) => {
    try {
      await axiosSecure.delete(`/books/${bookId}`);
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (bookId) => {
    navigate(`/dashboard/edit-book/${bookId}`);
  };

  return (
    <div className="space-y-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Books Name</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Translator</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading
            ? [...Array(6)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-5 w-32 rounded" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-24 rounded" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-28 rounded" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-16 rounded" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-20 rounded" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-12 rounded" />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Skeleton className="h-8 w-8 rounded-md" />
                      <Skeleton className="h-8 w-8 rounded-md" />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            : books?.map((book) => (
                <TableRow key={book._id}>
                  <TableCell className="font-medium">
                    {book?.productNameBn}
                  </TableCell>
                  <TableCell>{book?.authorName}</TableCell>
                  <TableCell>{book?.translatorName}</TableCell>
                  <TableCell>{book?.listPrice}</TableCell>
                  <TableCell>
                    {book?.discountValue} ({book?.discountType})
                  </TableCell>
                  <TableCell>{book?.stock}</TableCell>
                  <TableCell className="text-right space-x-1">
                    <button
                      onClick={() => handleEdit(book._id)}
                      className="btn hover:bg-blue-400 px-2 py-1 rounded-md"
                    >
                      <SquarePen className="h-4 w-4" />
                    </button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          onClick={() => setSelectedBook(book._id)}
                          className="btn hover:bg-red-500 px-2 py-1 rounded-md"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Do you really want to delete "{book.productNameBn}"?
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(selectedBook)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className={`px-4 py-2 border rounded-md ${
            page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
          }`}
        >
          Previous
        </button>

        <span className="text-sm">
          Page <strong>{page}</strong> of <strong>{totalPages}</strong>
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className={`px-4 py-2 border rounded-md ${
            page === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageBooksTable;
