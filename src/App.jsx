import { useEffect, useState } from "react";

export default function AIVisionDashboard() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);

  const API_URL = "https://2zaa3cbaqe.execute-api.us-east-1.amazonaws.com/images";
  const UPLOAD_URL = "https://2zaa3cbaqe.execute-api.us-east-1.amazonaws.com/upload-url";
  const DELETE_URL = "https://2zaa3cbaqe.execute-api.us-east-1.amazonaws.com/image";

  const fetchImages = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setImages(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const uploadImage = async () => {
    if (!file) {
      alert("Select a file first");
      return;
    }

    try {
      const res = await fetch(UPLOAD_URL);
      const data = await res.json();

      await fetch(data.uploadUrl, {
        method: "PUT",
        body: file,
      });

      alert("Upload successful 🚀");

      setTimeout(fetchImages, 1500);

    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed");
    }
  };

  const deleteImage = async (image_id, image_name) => {
    if (!window.confirm("Delete this image?")) return;

    try {
      await fetch(DELETE_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image_id, image_name }),
      });

      setImages((prev) =>
        prev.filter((img) => img.image_id !== image_id)
      );

    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">🧠 AI Vision Dashboard</h1>

      { }
      <div className="mb-6">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button
          onClick={uploadImage}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
      </div>

      { }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img) => (
          <div key={img.image_id} className="bg-white p-4 rounded shadow">

            { }
            <div className="space-y-2">
              {img.labels
                .filter(
                  (label) =>
                    label.name !== "Animal" &&
                    label.name !== "Mammal"
                )
                .map((label, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm">
                      <span>{label.name}</span>
                      <span>{label.confidence}%</span>
                    </div>

                    { }
                    <div className="w-full bg-gray-200 h-2 rounded">
                      <div
                        className="bg-green-500 h-2 rounded"
                        style={{ width: `${label.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
            </div>

            { }
            <p className="text-xs text-gray-400 mt-3">
              {new Date(img.timestamp).toLocaleString()}
            </p>

            { }
            <button
              onClick={() =>
                deleteImage(img.image_id, img.image_name)
              }
              className="mt-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}