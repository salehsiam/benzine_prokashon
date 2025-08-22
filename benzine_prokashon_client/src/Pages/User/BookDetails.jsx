import React, { useEffect, useState } from "react";
import { Book, ShoppingCart } from "lucide-react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import { useCart } from "../../Provider/CartContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const BookDetails = () => {
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();
  const { addToCart } = useCart();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  console.log(book);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        const response = await axiosPublic.get(`/books/${id}`);
        setBook(response.data);
      } catch (err) {
        console.error("Error fetching book details:", err);
        setError("Failed to load book details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [axiosPublic, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-semibold text-gray-600">
          Loading book details...
        </p>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-semibold text-red-600">
          {error || "Book not found."}
        </p>
      </div>
    );
  }

  // ✅ Calculate discounted price safely
  let discountedPrice = book.listPrice;
  if (book.discountType === "percentage") {
    discountedPrice = (book.listPrice * (100 - book.discountValue)) / 100;
  } else if (book.discountType === "flat") {
    discountedPrice = book.listPrice - book.discountValue;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 mt-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Book Cover */}
        <div className="flex justify-center items-start">
          <div className="w-full max-w-sm aspect-[3/4] border shadow-md overflow-hidden">
            <img
              src={book?.coverImage}
              alt={book?.productNameEn}
              className=""
            />
          </div>
        </div>

        {/* Book Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{book?.productNameBn}</h1>
            <h2 className="text-lg md:text-xl text-gray-600 mb-4">
              {book?.subtitle}
            </h2>

            <div className="mb-6 space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">Author:</span>{" "}
                {book?.authorName}
              </p>
              {book?.translatorName && (
                <p>
                  <span className="font-semibold">Translator:</span>{" "}
                  {book?.translatorName}
                </p>
              )}
              <p>
                <span className="font-semibold">Pages:</span> {book?.pages}
              </p>
              <p>
                <span className="font-semibold">ISBN:</span> {book?.isbn}
              </p>
              <p>
                <span className="font-semibold">Genres:</span>{" "}
                {book?.genres?.join(", ")}
              </p>
            </div>

            {/* Price */}
            <div className="mb-6 flex items-center gap-4">
              {book?.discountType && book?.discountValue > 0 ? (
                <>
                  <span className="text-2xl font-bold text-blue-600">
                    ৳{discountedPrice.toFixed(2)}
                  </span>
                  <span className="line-through text-gray-400">
                    ৳{book?.listPrice.toFixed(2)}
                  </span>
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm">
                    {book?.discountValue}
                    {book?.discountType === "percentage" ? "%" : " ৳"} OFF
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-blue-600">
                  ৳{book?.listPrice}
                </span>
              )}
            </div>

            {/* Stock */}
            <p
              className={`mb-6 font-semibold ${
                book?.stock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {book?.stock > 0
                ? `${book?.stock} copies available`
                : "Out of stock"}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => addToCart(book)}
                className="flex items-center gap-2 px-6 py-3 bg-blue-400 text-white font-medium rounded-xl shadow-md hover:bg-blue-500 transition disabled:bg-gray-400"
                disabled={book?.stock <= 0}
              >
                <ShoppingCart size={20} /> Add to Cart
              </button>
              <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 px-6 py-3 border border-gray-300 font-medium rounded-xl shadow-md hover:bg-gray-100 transition"
              >
                একটু পড়ে দেখুন
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-12 bg-gray-50 p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Book Description</h3>
        <div
          className="prose max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: book?.description }}
        />
      </div>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl h-[80vh] p-0">
          <DialogHeader className="p-4 border-b">
            <DialogTitle>বইয়ের অংশ পড়ুন</DialogTitle>
          </DialogHeader>
          <div className="h-full w-full">
            {/* {book.bookPdf ? (
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <Viewer fileUrl={book.bookPdf} />
              </Worker>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No preview available
              </div>
            )} */}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookDetails;
