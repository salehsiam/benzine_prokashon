import React from "react";
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
  const { books } = useBooks(); // assume it returns an array of { _id, title }
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
    console.log("Form Data:", data);
  };

  return (
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
  );
};

export default InputSellingDetails;
