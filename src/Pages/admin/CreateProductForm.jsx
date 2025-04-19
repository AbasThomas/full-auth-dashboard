import { useEffect, useState } from "react";
import {
  createProduct,
  fetchBrands,
  fetchCategories,
  fetchColors,
} from "../../services/adminService";
import toast from "react-hot-toast";
import "../../components/styles/CreateProductForm.css";

const CreateProductForm = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    brand: "",
    category: "",
    sizes: "",
    colors: [],
    price: "",
    totalQty: "",
    files: [],
  });
  const [filePreviews, setFilePreviews] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);

  // Fetch brands, categories, and colors on component mount
  useEffect(() => {
    (async () => {
      try {
        const [b, c, cl] = await Promise.all([
          fetchBrands(),
          fetchCategories(),
          fetchColors(),
        ]);
        setBrands(b);
        setCategories(c);
        setColors(cl);
      } catch (err) {
        console.error("Error fetching data:", err);
        toast.error(err.message || "Failed to fetch data");
      }
    })();
  }, []);

  // Clean up previews when component unmounts or files change
  useEffect(() => {
    return () => {
      filePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [filePreviews]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "files") {
      const filesArray = Array.from(files);
      setForm((prev) => ({ ...prev, files: filesArray }));

      // Clean up existing preview URLs
      filePreviews.forEach((url) => URL.revokeObjectURL(url));

      // Generate new preview URLs from selected files
      const previews = filesArray.map((file) => URL.createObjectURL(file));
      setFilePreviews(previews);
    } else if (name === "colors") {
      const selectedOptions = Array.from(e.target.selectedOptions).map(
        (option) => option.value
      );
      setForm((prev) => ({ ...prev, colors: selectedOptions }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (key === "files") {
        val.forEach((file) => formData.append("files", file));
      } else if (Array.isArray(val)) {
        val.forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, val);
      }
    });

    try {
      const res = await createProduct(formData);
      toast.success(res.message || "Product created successfully!");

      // Clear the form and previews
      setForm({
        name: "",
        description: "",
        brand: "",
        category: "",
        sizes: "",
        colors: [],
        price: "",
        totalQty: "",
        files: [],
      });
      filePreviews.forEach((url) => URL.revokeObjectURL(url));
      setFilePreviews([]);
    } catch (err) {
      console.error("Error creating product:", err);
      toast.error(err.message || "Failed to create product");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-product-form">
      <h2>Create New Product</h2>

      <div className="form-group">
        <label>Product Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Sizes (comma-separated)</label>
          <input
            type="text"
            name="sizes"
            value={form.sizes}
            onChange={handleChange}
            placeholder="Sizes (comma-separated)"
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />
        </div>
        <div className="form-group">
          <label>Total Quantity</label>
          <input
            type="number"
            name="totalQty"
            value={form.totalQty}
            onChange={handleChange}
            placeholder="Total Quantity"
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Brand</label>
          <select
            name="brand"
            value={form.brand}
            onChange={handleChange}
            required
          >
            <option value="">Select Brand</option>
            {brands.map((b) => (
              <option key={b._id} value={b.name}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c._id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Colors</label>
        <select
          name="colors"
          multiple
          value={form.colors}
          onChange={handleChange}
        >
          {colors.map((color) => (
            <option key={color._id} value={color.name}>
              {color.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group file-group">
        <label>Product Images</label>
        <input
          type="file"
          name="files"
          accept="image/*"
          multiple
          onChange={handleChange}
          required
        />
      </div>

      {/* File Upload Previews */}
      {filePreviews.length > 0 && (
        <div className="preview-container">
          {filePreviews.map((src, index) => (
            <div key={index} className="preview-card">
              <img src={src} alt={`Preview ${index}`} />
            </div>
          ))}
        </div>
      )}

      <button type="submit" className="submit-btn">
        Create Product
      </button>
    </form>
  );
};

export default CreateProductForm;