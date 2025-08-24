import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import useBooks from "../../Hooks/useBooks"; // your custom hook
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

const InputSellingDetails = () => {
  const { books } = useBooks();
  const [billData, setBillData] = useState(null);
  const form = useForm({
    defaultValues: {
      role: "",
      sellerEmail: "",
      sellerName: "",
      items: [{ bookId: "", quantity: "", total: "" }],
    },
  });

  const { control, handleSubmit } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = (data) => {
    setBillData(data); // save bill data to state
    setTimeout(() => {
      window.print();
    }, 500); // small delay so bill renders before print
  };

  // Helper to get book name by ID
  const getBookName = (id) =>
    books?.find((book) => book._id === id)?.productNameBn || "Unknown Book";

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow"
        >
          <div className="flex gap-4">
            {/* Customer / Seller Select */}
            <FormField
              control={control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Customer / Seller" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="customer">Customer</SelectItem>
                      <SelectItem value="seller">Seller</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Seller Email */}
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
          {/* Seller Name */}
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

          {/* Dynamic Book Rows */}
          <div className="space-y-4">
            <FormLabel>Books</FormLabel>
            {fields.map((item, index) => (
              <div
                key={item.id}
                className="grid grid-cols-12 gap-4 items-end border p-4 rounded-lg"
              >
                {/* Book Select */}
                <FormField
                  control={control}
                  name={`items.${index}.bookId`}
                  render={({ field }) => (
                    <FormItem className="col-span-5">
                      <FormLabel>Book</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Book" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {books?.map((book) => (
                            <SelectItem key={book._id} value={book._id}>
                              {book.productNameBn}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Quantity */}
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

                {/* Total */}
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

                {/* Remove Button */}
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

          {/* Add More Button */}
          <Button
            type="button"
            variant="secondary"
            onClick={() => append({ bookId: "", quantity: "", total: "" })}
          >
            + Add Book
          </Button>

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
      {/* BILL SECTION */}
      {billData && (
        <div
          id="bill-section"
          className="max-w-3xl mx-auto bg-white p-6 mt-8 rounded-2xl shadow print:block"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Invoice</h2>

          {/* Seller / Customer Info */}
          <div className="mb-6">
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

          {/* Books Table */}
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
              {billData.items.map((item, i) => (
                <tr key={i}>
                  <td className="border px-3 py-2 text-center">{i + 1}</td>
                  <td className="border px-3 py-2">
                    {getBookName(item.bookId)}
                  </td>
                  <td className="border px-3 py-2 text-center">
                    {item.quantity}
                  </td>
                  <td className="border px-3 py-2 text-right">{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Grand Total */}
          <div className="mt-4 text-right">
            <p className="font-bold text-lg">
              Grand Total:{" "}
              {billData.items.reduce(
                (acc, item) => acc + Number(item.total || 0),
                0
              )}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default InputSellingDetails;
