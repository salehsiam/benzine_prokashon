import React, { useState, useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Check, ChevronsUpDown } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import logo from "./../../assets/logo.png";
import useAuth from "../../Hooks/useAuth";

// --- Reusable BookSelect with search (Combobox pattern, Bangla-safe filtering) ---
const BookSelect = ({ value, onChange, books }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selectedBook = books?.find((b) => b._id === value);

  const filteredBooks = useMemo(() => {
    if (!search.trim()) return books || [];
    return (books || []).filter((book) =>
      book.productNameBn?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, books]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal"
        >
          {selectedBook ? selectedBook.productNameBn : "Select Book"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        {/* shouldFilter={false} -> cmdk er nijer Bangla-te buggy filter bondho, amra nije filter korchi */}
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search book..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            {filteredBooks.length === 0 ? (
              <CommandEmpty>No books found</CommandEmpty>
            ) : (
              <CommandGroup>
                {filteredBooks.map((book) => (
                  <CommandItem
                    key={book._id}
                    value={book._id}
                    onSelect={() => {
                      onChange(book._id);
                      setSearch("");
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === book._id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {book.productNameBn}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

// --- Main Component ---
const InputSellingDetails = () => {
  const { books } = useBooks(1, 5000);
  const [billData, setBillData] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const form = useForm({
    defaultValues: {
      role: "",
      sellerEmail: "",
      sellerName: "",
      billedBy: user?.displayName || "",
      discount: 0,
      items: [{ bookId: "", quantity: "", discountPercent: 0, total: 0 }],
    },
  });

  const { control, handleSubmit, watch, setValue, getValues } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const items = watch("items") || [];
  const discount = Number(watch("discount") || 0);
  const grandTotal = items.reduce((acc, it) => acc + Number(it.total || 0), 0);
  const finalTotal = Math.max(grandTotal - discount, 0);

  const getBook = (id) => books?.find((b) => b._id === id);
  const getBookName = (id) => getBook(id)?.productNameBn || "Unknown Book";

  // --- Calculate item total function ---
  const calculateItemTotal = (index) => {
    const values = getValues();
    const item = values.items?.[index] || {};
    const book = getBook(item.bookId);
    if (book && item.quantity) {
      const listPrice = Number(book.listPrice || 0);
      const quantity = Number(item.quantity || 0);
      const discountPercent = Number(item.discountPercent || 0);
      const total =
        listPrice * quantity - (listPrice * quantity * discountPercent) / 100;
      setValue(`items.${index}.total`, total.toFixed(2));
    } else {
      setValue(`items.${index}.total`, "0");
    }
  };

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
          listPrice: getBook(it.bookId)?.listPrice || 0,
        })),
      };

      await axiosSecure.post("/sales", enrichedData);
      setBillData(enrichedData);
      setTimeout(() => window.print(), 500);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold text-center my-8">
        Create Invoice
      </h2>

      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 max-w-3xl mx-auto bg-white p-4 rounded-2xl shadow"
        >
          {/* Role and Seller Info */}
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

          {/* Dynamic Book Inputs */}
          <div className="space-y-4">
            <FormLabel>Books</FormLabel>

            {fields.map((item, index) => (
              <div
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end border p-4 rounded-lg"
              >
                {/* Book Select */}
                <FormField
                  control={control}
                  name={`items.${index}.bookId`}
                  render={({ field }) => (
                    <FormItem className="md:col-span-4 w-full">
                      <FormLabel>Book</FormLabel>
                      <BookSelect
                        value={field.value}
                        onChange={(val) => {
                          field.onChange(val);
                          calculateItemTotal(index);
                        }}
                        books={books}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Quantity */}
                <FormField
                  control={control}
                  name={`items.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem className="md:col-span-2 w-full">
                      <FormLabel>Qty</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            calculateItemTotal(index);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Discount % */}
                <FormField
                  control={control}
                  name={`items.${index}.discountPercent`}
                  render={({ field }) => (
                    <FormItem className="md:col-span-2 w-full">
                      <FormLabel>Discount %</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            calculateItemTotal(index);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Total (auto-calculated) */}
                <FormField
                  control={control}
                  name={`items.${index}.total`}
                  render={({ field }) => (
                    <FormItem className="md:col-span-3 w-full">
                      <FormLabel>Total</FormLabel>
                      <FormControl>
                        <Input type="number" readOnly {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="md:col-span-1 flex md:justify-end">
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => remove(index)}
                    className="w-full md:w-auto"
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
            onClick={() =>
              append({ bookId: "", quantity: "", discountPercent: 0, total: 0 })
            }
          >
            + Add Book
          </Button>

          {/* Global Discount */}
          <FormField
            control={control}
            name="discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Happy Return (Global Discount)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Live Totals */}
          <div className="mt-6 text-right space-y-2">
            <p className="font-medium">Grand Total: {grandTotal.toFixed(2)}</p>
            <p className="font-bold text-xl text-green-600">
              Final Payable: {finalTotal.toFixed(2)}
            </p>
          </div>

          <Button type="submit" className="w-full">
            Submit & Print Invoice
          </Button>
        </form>
      </Form>

      {/* Printable Bill */}
      {billData && (
        <div
          id="bill-section"
          className="bg-white p-8 mt-8 mx-auto w-full print:block max-w-3xl"
        >
          <div className="text-center mb-4">
            <div className="flex justify-center gap-2 ">
              <Link to="/" className="flex items-center gap-2 font-medium">
                <img src={logo} alt="Benzine Logo" width={42} height={42} />
              </Link>
            </div>
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
          </div>

          <table className="w-full border-collapse border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-3 py-2">#</th>
                <th className="border px-3 py-2">Book</th>
                <th className="border px-3 py-2">Qty</th>
                <th className="border px-3 py-2">Discount %</th>
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
                  <td className="border px-3 py-2 text-center">
                    {it.discountPercent}%
                  </td>
                  <td className="border px-3 py-2 text-right">
                    {Number(it.total).toFixed(2)}
                  </td>
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
          <div className="mt-6 text-left">
            <p>
              <span className="font-semibold">Billed By:</span>{" "}
              {billData.billedBy}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default InputSellingDetails;