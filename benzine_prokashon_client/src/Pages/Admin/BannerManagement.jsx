import React, { useState, useEffect } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { toast } from "sonner";
import imageCompression from "browser-image-compression";

const BannerManagement = () => {
  const [mainBanners, setMainBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();

  // Fetch existing banners from the backend
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axiosPublic.get("/banners");
        const { main = [] } = res.data || {};
        setMainBanners(Array.isArray(main) ? main : []);
      } catch (err) {
        console.error("Failed to fetch banners", err);
        toast.error("Failed to load banners.");
      }
    };
    fetchBanners();
  }, [axiosPublic]);

  // Handle file input change
  const handleMainBannerChange = (e) => {
    const files = Array.from(e.target.files);
    setMainBanners(files);
  };

  // Compress image and upload to imgbb
  const compressAndUpload = async (file) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      const formData = new FormData();
      formData.append("image", compressedFile);

      const res = await axiosPublic.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
        formData
      );

      return res.data.data.url;
    } catch (err) {
      console.error("Compression/upload failed", err);
      throw err;
    }
  };

  // Handle uploading banners to backend
  const handleUpload = async () => {
    if (mainBanners.length === 0) {
      toast.error("Please select at least one banner.");
      return;
    }

    setLoading(true);
    try {
      const uploadedMain = await Promise.all(
        mainBanners.map((banner) =>
          banner instanceof File ? compressAndUpload(banner) : banner
        )
      );

      const payload = { main: uploadedMain };
      await axiosPublic.put("/banners", payload);

      toast.success("Banners updated successfully!");
    } catch (err) {
      toast.error("Failed to update banners. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Manage Banners</h2>

      {/* Main Banners */}
      <div className="mb-6">
        <label className="block font-medium mb-2">
          Main Banners (Multiple)
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleMainBannerChange}
          className="border rounded p-2 w-full"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {mainBanners.map((banner, index) => (
            <img
              key={index}
              src={
                banner instanceof File ? URL.createObjectURL(banner) : banner
              }
              alt={`Main Banner ${index + 1}`}
              className="w-full h-40 object-cover rounded"
            />
          ))}
        </div>
      </div>

      <button
        onClick={handleUpload}
        disabled={loading}
        className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Save Banners"}
      </button>
    </div>
  );
};

export default BannerManagement;
