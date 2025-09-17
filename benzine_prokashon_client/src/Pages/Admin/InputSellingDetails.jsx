import React, { useState, useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import useBooks from "../../Hooks/useBooks";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

// Reusable BookSelect component (has its own internal search state)
const BookSelect = ({ value, onChange, books }) => {
  const [search, setSearch] = useState("");

  const filteredBooks = useMemo(() => {
    if (!search) return books || [];
    return (books || []).filter((book) =>
      book.productNameBn.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, books]);

  return (
    <Select onValueChange={onChange} value={value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Select Book" />
        </SelectTrigger>
      </FormControl>

      <SelectContent>
        <div className="p-2">
          <Input
            placeholder="Search book..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-2"
          />
        </div>

        {filteredBooks?.length ? (
          filteredBooks.map((book) => (
            <SelectItem key={book._id} value={book._id}>
              {book.productNameBn}
            </SelectItem>
          ))
        ) : (
          <div className="px-3 py-2 text-sm text-muted-foreground">
            No books found
          </div>
        )}
      </SelectContent>
    </Select>
  );
};

const InputSellingDetails = () => {
  const { books } = useBooks();
  const [billData, setBillData] = useState(null);
  const axiosSecure = useAxiosSecure();

  const form = useForm({
    defaultValues: {
      role: "",
      sellerEmail: "",
      sellerName: "",
      discount: 0,
      items: [{ bookId: "", quantity: "", total: "" }],
    },
  });

  const { control, handleSubmit, watch } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  // Live calculations
  const items = watch("items") || [];
  const discount = Number(watch("discount") || 0);
  const grandTotal = items.reduce((acc, it) => acc + Number(it.total || 0), 0);
  const finalTotal = Math.max(grandTotal - discount, 0);

  const getBookName = (id) =>
    books?.find((b) => b._id === id)?.productNameBn || "Unknown Book";

  const onSubmit = async (data) => {
    try {
      const grand = (data.items || []).reduce(
        (acc, it) => acc + Number(it.total || 0),
        0
      );

      const enrichedData = {
        ...data,
        grandTotal: grand,
        finalTotal: Math.max(grand - Number(data.discount || 0), 0),
        items: (data.items || []).map((it) => ({
          ...it,
          bookName: getBookName(it.bookId),
        })),
      };
      console.log("Submitting sale:", enrichedData);

      await axiosSecure.post("/sales", enrichedData);
      setBillData(enrichedData);

      // small delay then print
      setTimeout(() => {
        window.print();
      }, 500);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow"
        >
          <div className="flex gap-4">
            <FormField
              control={control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <select {...field} className="border rounded-md p-2 w-40">
                      <option value="">Select</option>
                      <option value="customer">Customer</option>
                      <option value="seller">Seller</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex-1">
              <FormField
                control={control}
                name="sellerEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seller Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter seller email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={control}
            name="sellerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seller Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter seller name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <FormLabel>Books</FormLabel>

            {fields.map((item, index) => (
              <div
                key={item.id}
                className="grid grid-cols-12 gap-4 items-end border p-4 rounded-lg"
              >
                {/* Book select with per-row search */}
                <FormField
                  control={control}
                  name={`items.${index}.bookId`}
                  render={({ field }) => (
                    <FormItem className="col-span-5">
                      <FormLabel>Book</FormLabel>
                      <BookSelect
                        value={field.value}
                        onChange={field.onChange}
                        books={books}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`items.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`items.${index}.total`}
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormLabel>Total</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="col-span-1 flex justify-end">
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => remove(index)}
                  >
                    ✕
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <Button
            type="button"
            variant="secondary"
            onClick={() => append({ bookId: "", quantity: "", total: "" })}
          >
            + Add Book
          </Button>

          {/* Discount (in form so it submits) */}
          <FormField
            control={control}
            name="discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Happy Return</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter discount"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Live totals */}
          <div className="mt-6 text-right space-y-2">
            <p className="font-medium">Grand Total: {grandTotal}</p>
            <p className="font-bold text-xl text-green-600">
              Final Payable: {finalTotal}
            </p>
          </div>

          <Button type="submit" className="w-full">
            Submit & Print Invoice
          </Button>
        </form>
      </Form>

      {/* Invoice / Bill Section */}
      {billData && (
        <div
          id="bill-section"
          className="bg-white p-8 mt-8 mx-auto w-full print:block max-w-3xl"
        >
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold">Benzene Prokashon</h2>
            <p className="uppercase font-semibold">Invoice</p>
            <p className="text-sm text-muted-foreground">
              {new Date().toLocaleString()}
            </p>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-4">
            <div>
              <p>
                <span className="font-semibold">Type:</span> {billData.role}
              </p>
              <p>
                <span className="font-semibold">Seller Name:</span>{" "}
                {billData.sellerName}
              </p>
              <p>
                <span className="font-semibold">Seller Email:</span>{" "}
                {billData.sellerEmail}
              </p>
            </div>
            {/* <div className="text-right">
              <p>
                <span className="font-semibold">Grand Total:</span>{" "}
                {billData.grandTotal}
              </p>
              <p>
                <span className="font-semibold">Discount:</span>{" "}
                {billData.discount}
              </p>
              <p className="font-semibold text-lg">
                Final Payable: {billData.finalTotal}
              </p>
            </div> */}
          </div>

          <table className="w-full border-collapse border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-3 py-2">#</th>
                <th className="border px-3 py-2">Book</th>
                <th className="border px-3 py-2">Quantity</th>
                <th className="border px-3 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {billData.items.map((it, i) => (
                <tr key={i}>
                  <td className="border px-3 py-2 text-center">{i + 1}</td>
                  <td className="border px-3 py-2">
                    {it.bookName || getBookName(it.bookId)}
                  </td>
                  <td className="border px-3 py-2 text-center">
                    {it.quantity}
                  </td>
                  <td className="border px-3 py-2 text-right">{it.total}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 text-right">
            <p className="font-semibold">Total: {billData.grandTotal}</p>
            <p className="font-semibold">Happy Return: {billData.discount}</p>
            <p className="font-bold text-xl">
              Final Payable: {billData.finalTotal}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default InputSellingDetails;
