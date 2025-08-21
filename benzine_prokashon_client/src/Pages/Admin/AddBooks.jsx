import React, { useRef } from "react";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import JoditEditor from "jodit-react";
import { toast } from "sonner";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";

const AddBooks = () => {
  const editor = useRef(null);
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const imageHostingKey = import.meta.env.VITE_IMGBB_KEY;
  const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;
  const genresList = [
    "থ্রিলার",
    "হরর",
    "রোমান্টিক",
    "গোয়েন্দা",
    "ঐতিহাসিক",
    "ফ্যান্টাসি",
    "মিথলজি",
    "ভ্রমণ",
    "শিকার",
    "অ্যাভেঞ্চার",
    "মিস্ট্রি",
    "রম্য",
    "ধর্মীয়",
    "নন-ফিকশন",
  ];

  const form = useForm({
    defaultValues: {
      productNameBn: "",
      productNameEn: "",
      subtitle: "",
      isbn: "",
      stock: "",
      coverImage: null,
      authorName: "",
      translatorName: "",
      listPrice: "",
      pages: "",
      discountType: "",
      discountValue: "",
      description: "",
      genres: [],
    },
  });

  const onSubmit = async (data) => {
    try {
      if (!data.coverImage) {
        toast.error("Please upload a cover image!");
        return;
      }

      // Prepare image for upload
      const formData = new FormData();
      formData.append("image", data.coverImage);

      // Upload image to ImgBB
      const res = await axiosPublic.post(imageHostingApi, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        const imgURL = res.data.data.display_url;

        // Create book object
        const bookData = {
          productNameBn: data.productNameBn,
          productNameEn: data.productNameEn,
          subtitle: data.subtitle,
          authorName: data.authorName,
          translatorName: data.translatorName,
          listPrice: Number(data.listPrice),
          pages: Number(data.pages),
          discountType: data.discountType,
          discountValue: Number(data.discountValue),
          stock: Number(data.stock),
          isbn: data.isbn,
          description: data.description,
          coverImage: imgURL,
          genres: data.genres,
          authorEmail: data.authorEmail,
          bookPdf: data.bookPdf ? data.bookPdf.name : null,
          createdBy: user?.email,
          isFeatured: false,
          createdAt: new Date(),
        };

        // Send book data to backend
        const response = await axiosPublic.post("/books", bookData);

        if (response.data.insertedId) {
          toast.success("Book added successfully!");
          form.reset(); // ✅ clear form after success
        }
      }
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error("Failed to add book");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Book</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Product Name (Bn) */}
            <FormField
              control={form.control}
              name="productNameBn"
              rules={{ required: "Product name (Bn) is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name (Bn)*</FormLabel>
                  <FormControl>
                    <Input placeholder="পণ্যের নাম লিখুন" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Product Name (En) */}
            <FormField
              control={form.control}
              name="productNameEn"
              rules={{ required: "Product name (En) is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name (En)*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter product name in English"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Subtitle */}
            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtitle</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Subtitle" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Book Cover Image */}
            <FormField
              control={form.control}
              name="coverImage"
              rules={{ required: "Cover image is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Book Cover*</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => field.onChange(e.target.files[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Author Name */}
            <FormField
              control={form.control}
              name="authorName"
              rules={{ required: "Author name is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter author name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Translator Name (Optional) */}
            <FormField
              control={form.control}
              name="translatorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Translator Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter translator name (if any)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* author/translator email */}
            <FormField
              control={form.control}
              name="authorEmail"
              rules={{
                required: "Author/Translator email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // simple email regex
                  message: "Please enter a valid email address",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author/Translator Email*</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter author email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* PDF */}
            <FormField
              control={form.control}
              name="bookPdf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Book PDF</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => field.onChange(e.target.files[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Genre */}
          <div>
            <FormField
              control={form.control}
              name="genres"
              rules={{ required: "Please select at least one genre" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genres*</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2 text-sm">
                      {genresList.map((genre) => (
                        <label
                          key={genre}
                          className={`px-3 py-1 border rounded cursor-pointer ${
                            field.value.includes(genre)
                              ? "bg-blue-500 text-white"
                              : "bg-gray-100 hover:bg-gray-200"
                          }`}
                        >
                          <input
                            type="checkbox"
                            value={genre}
                            checked={field.value.includes(genre)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                field.onChange([...field.value, genre]);
                              } else {
                                field.onChange(
                                  field.value.filter((g) => g !== genre)
                                );
                              }
                            }}
                            className="hidden"
                          />
                          {genre}
                        </label>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* List Price */}
            <FormField
              control={form.control}
              name="listPrice"
              rules={{ required: "List price is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>List Price*</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter list price"
                      value={field.value}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === "" ? "" : Number(e.target.value)
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Number of Pages */}
            <FormField
              control={form.control}
              name="pages"
              rules={{ required: "Number of pages is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Pages*</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter number of pages"
                      value={field.value}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === "" ? "" : Number(e.target.value)
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Discount Type */}
            <FormField
              control={form.control}
              name="discountType"
              rules={{ required: "Discount type is required" }}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Discount Type*</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select discount type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                      <SelectItem value="flat">Flat Amount</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Discount Value */}
            <FormField
              control={form.control}
              name="discountValue"
              rules={{ required: "Discount value is required" }}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Discount Value*</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter discount value"
                      className="w-full"
                      value={field.value}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === "" ? "" : Number(e.target.value)
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* STOCK */}
            <FormField
              control={form.control}
              name="stock"
              rules={{ required: "Stock is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock*</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter Stock"
                      value={field.value}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === "" ? "" : Number(e.target.value)
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ISBN */}
            <FormField
              control={form.control}
              name="isbn"
              rules={{ required: "ISBN is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ISBN*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter ISBN" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Description Field with Jodit */}
          <FormField
            control={form.control}
            name="description"
            rules={{ required: "Description is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description*</FormLabel>
                <FormControl>
                  <div className="border rounded-md">
                    <JoditEditor
                      ref={editor}
                      value={field.value}
                      onBlur={(newContent) => field.onChange(newContent)} // update value on blur
                      onChange={() => {}} // required but unused
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            Add Book
          </button>
        </form>
      </Form>
    </div>
  );
};

export default AddBooks;
