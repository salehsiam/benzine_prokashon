import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useBooks from "../../../Hooks/useBooks";

const ManageBooksTable = () => {
  const { books, refetch, isLoading } = useBooks();
  return (
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
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
        {books?.map((book) => {
          return (
            <TableRow>
              <TableCell className="font-medium">
                {book?.productNameBn}
              </TableCell>
              <TableCell>{book?.authorName}</TableCell>
              <TableCell>{book?.translatorName}</TableCell>
              <TableCell>{book?.listPrice}</TableCell>
              <TableCell>
                {book?.discountValue} ( {book?.discountType} )
              </TableCell>
              <TableCell>{book?.stock}</TableCell>
              <TableCell className="text-right">
                <button className="btn bg-blue-400 px-2 py-1 rounded-md">
                  Edit
                </button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ManageBooksTable;
