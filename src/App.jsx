import { useEffect, useState } from "react";

export default function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const API_URL = "https://2zaa3cbaqe.execute-api.us-east-1.amazonaws.com/images";

  useEffect(() => {
    async function fetchImages() {
      try {
        setLoading(true);

        console.log("Calling API:", API_URL);

        const res = await fetch(API_URL);

        console.log("STATUS:", res.status);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("DATA:", data);

        setImages(
          data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        );

      } catch (err) {
        console.error("FULL ERROR:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, []);

  const uploadImage = async () => {
  if (!file)  {
    alert("Please select a file")
    return;
  }
  try {
    setUploading(true);


    const res = await fetch(
      "https://2zaa3cbaqe.execute-api.us-east-1.amazonaws.com/upload-url"
    );

    const data = await res.json();

    await fetch(data.uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    alert("Upload successful 🚀");

    window.location.reload();

  } catch (err) {
    console.error("Upload failed:", err);
    alert("Upload failed");
  } finally {
    setUploading(false);
  }
};

  if (loading) {
    return (
      <div style={styles.center}>
        <h2>Loading AI Vision Data...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.center}>
        <h2 style={{ color: "red" }}>Error: {error}</h2>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div style={styles.center}>
        <h2>No images found. Upload to S3 to see results.</h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🧠 AI Vision Dashboard</h1>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

    <button onClick={uploadImage}>
        Upload Image
    </button>

      <div style={styles.grid}>
        {images.map((img, index) => (
          <div key={index} style={styles.card}>
            <h3>📸 {img.image_name}</h3>
            <img
              src={`https://ai-vision-pipeline-saudirodriguez.s3.amazonaws.com/${img.image_name}`}
              alt={img.image_name}
              style={{ width: "100%", borderRadius: "10px", marginBottom: "10px" }}
            />


            <div>
              {img.labels.slice(1, 3).map((label, i) => (
                <div key={i} style={styles.labelRow}>
                  <span>{label.name}</span>
                  <span>{label.confidence}%</span>
                </div>
              ))}
            </div>

            <p style={styles.timestamp}>
              {new Date(img.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  labelRow: {
    display: "flex",
    justifyContent: "space-between",
    background: "#f0f0f0",
    padding: "5px 10px",
    borderRadius: "6px",
    marginBottom: "5px",
  },
  meta: {
    fontSize: "12px",
    color: "#666",
  },
  timestamp: {
    fontSize: "11px",
    color: "#999",
    marginTop: "10px",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    flexDirection: "column",
  },
};