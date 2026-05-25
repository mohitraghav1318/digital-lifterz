import { useEffect, useMemo, useState } from "react";
import {
  FiCheck,
  FiLogOut,
  FiPlus,
  FiRefreshCw,
  FiSave,
  FiTrash2,
} from "react-icons/fi";
import { getFallbackServices } from "../../lib/servicesApi";

const emptyPackage = () => ({
  name: "New Package",
  features: ["New feature"],
});

const emptyCategory = () => ({
  id: "",
  title: "New Category",
  description: "",
  packages: [emptyPackage()],
});

async function apiRequest(path, options = {}) {
  const response = await fetch(path, {
    credentials: "include",
    headers: {
      "content-type": "application/json",
      ...options.headers,
    },
    ...options,
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Request failed.");
  }

  return data;
}

function ServiceEditor({ categories, setCategories }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const safeSelectedIndex = Math.min(selectedIndex, Math.max(categories.length - 1, 0));
  const selectedCategory = categories[safeSelectedIndex];

  const updateCategory = (patch) => {
    setCategories((current) =>
      current.map((category, index) =>
        index === safeSelectedIndex ? { ...category, ...patch } : category,
      ),
    );
  };

  const addCategory = () => {
    setCategories((current) => [...current, emptyCategory()]);
    setSelectedIndex(categories.length);
  };

  const deleteCategory = () => {
    setCategories((current) =>
      current.filter((_, index) => index !== safeSelectedIndex),
    );
    setSelectedIndex(Math.max(safeSelectedIndex - 1, 0));
  };

  const addPackage = () => {
    updateCategory({
      packages: [...(selectedCategory.packages || []), emptyPackage()],
    });
  };

  const updatePackage = (packageIndex, patch) => {
    updateCategory({
      packages: selectedCategory.packages.map((pkg, index) =>
        index === packageIndex ? { ...pkg, ...patch } : pkg,
      ),
    });
  };

  const deletePackage = (packageIndex) => {
    updateCategory({
      packages: selectedCategory.packages.filter(
        (_, index) => index !== packageIndex,
      ),
    });
  };

  const updateFeature = (packageIndex, featureIndex, value) => {
    const pkg = selectedCategory.packages[packageIndex];
    const features = pkg.features.map((feature, index) =>
      index === featureIndex ? value : feature,
    );

    updatePackage(packageIndex, { features });
  };

  if (!selectedCategory) {
    return (
      <div className="admin-empty">
        <p>No service categories yet.</p>
        <button type="button" className="btn-primary admin-action" onClick={addCategory}>
          <FiPlus />
          Add Category
        </button>
      </div>
    );
  }

  return (
    <div className="admin-editor-grid">
      <aside className="admin-sidebar surface-card">
        <div className="admin-sidebar-head">
          <h2>Categories</h2>
          <button type="button" onClick={addCategory} aria-label="Add category">
            <FiPlus />
          </button>
        </div>

        <div className="admin-category-list">
          {categories.map((category, index) => (
            <button
              type="button"
              key={`${category.id}-${index}`}
              className={index === safeSelectedIndex ? "is-active" : ""}
              onClick={() => setSelectedIndex(index)}
            >
              {category.title || `Category ${index + 1}`}
            </button>
          ))}
        </div>
      </aside>

      <section className="admin-workspace surface-card">
        <div className="admin-section-head">
          <div>
            <p>Selected Category</p>
            <h2>{selectedCategory.title}</h2>
          </div>

          <button
            type="button"
            className="admin-danger"
            onClick={deleteCategory}
            aria-label="Delete category"
          >
            <FiTrash2 />
            Delete
          </button>
        </div>

        <div className="admin-field-grid">
          <label>
            Category title
            <input
              value={selectedCategory.title}
              onChange={(event) => updateCategory({ title: event.target.value })}
            />
          </label>

          <label>
            Category ID
            <input
              value={selectedCategory.id}
              onChange={(event) => updateCategory({ id: event.target.value })}
              placeholder="auto-generated-from-title"
            />
          </label>
        </div>

        <label>
          Description
          <textarea
            value={selectedCategory.description}
            onChange={(event) =>
              updateCategory({ description: event.target.value })
            }
            rows="4"
          />
        </label>

        <div className="admin-section-head admin-packages-head">
          <div>
            <p>Packages</p>
            <h2>Plans inside this category</h2>
          </div>

          <button type="button" className="admin-action" onClick={addPackage}>
            <FiPlus />
            Add Package
          </button>
        </div>

        <div className="admin-package-stack">
          {selectedCategory.packages.map((pkg, packageIndex) => (
            <article className="admin-package" key={`${pkg.name}-${packageIndex}`}>
              <div className="admin-package-head">
                <label>
                  Package name
                  <input
                    value={pkg.name}
                    onChange={(event) =>
                      updatePackage(packageIndex, { name: event.target.value })
                    }
                  />
                </label>

                <button
                  type="button"
                  className="admin-icon-danger"
                  onClick={() => deletePackage(packageIndex)}
                  aria-label="Delete package"
                >
                  <FiTrash2 />
                </button>
              </div>

              <div className="admin-feature-list">
                {pkg.features.map((feature, featureIndex) => (
                  <div className="admin-feature-row" key={featureIndex}>
                    <input
                      value={feature}
                      onChange={(event) =>
                        updateFeature(packageIndex, featureIndex, event.target.value)
                      }
                    />

                    <button
                      type="button"
                      className="admin-icon-danger"
                      onClick={() =>
                        updatePackage(packageIndex, {
                          features: pkg.features.filter(
                            (_, index) => index !== featureIndex,
                          ),
                        })
                      }
                      aria-label="Delete feature"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="admin-action admin-small-action"
                onClick={() =>
                  updatePackage(packageIndex, {
                    features: [...pkg.features, "New feature"],
                  })
                }
              >
                <FiPlus />
                Add Feature
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function AdminPanel() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [categories, setCategories] = useState(getFallbackServices().categories);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const totalPackages = useMemo(
    () =>
      categories.reduce(
        (total, category) => total + (category.packages?.length || 0),
        0,
      ),
    [categories],
  );

  const loadServices = async () => {
    const data = await apiRequest("/api/admin/services");
    setCategories(data.categories);
  };

  useEffect(() => {
    apiRequest("/api/admin/session", {
      headers: {},
    })
      .then(async (data) => {
        setIsAuthenticated(data.authenticated);
        if (data.authenticated) {
          await loadServices();
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
      })
      .finally(() => {
        setIsCheckingSession(false);
      });
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    try {
      await apiRequest("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ password }),
      });
      setPassword("");
      setIsAuthenticated(true);
      await loadServices();
    } catch (loginError) {
      setError(loginError.message);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError("");
    setMessage("");

    try {
      const data = await apiRequest("/api/admin/services", {
        method: "PUT",
        body: JSON.stringify({ categories }),
      });
      setCategories(data.categories);
      setMessage("Services updated successfully.");
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await apiRequest("/api/admin/logout", {
      method: "POST",
      body: "{}",
    }).catch(() => {});
    setIsAuthenticated(false);
  };

  if (isCheckingSession) {
    return <main className="admin-page">Checking admin session...</main>;
  }

  if (!isAuthenticated) {
    return (
      <main className="admin-page admin-login-page">
        <form className="surface-card admin-login" onSubmit={handleLogin}>
          <p>Admin Access</p>
          <h1>Digital Lifterz Control Panel</h1>
          <label>
            Password
            <input
              type="password"
              minLength="8"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </label>

          {error && <div className="admin-alert is-error">{error}</div>}

          <button type="submit" className="btn-primary admin-login-button">
            <FiCheck />
            Unlock Panel
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <div className="admin-shell">
        <header className="admin-header">
          <div>
            <p>Admin Panel</p>
            <h1>Services Manager</h1>
          </div>

          <div className="admin-header-actions">
            <button type="button" className="admin-action" onClick={loadServices}>
              <FiRefreshCw />
              Refresh
            </button>
            <button type="button" className="admin-action" onClick={handleSave}>
              <FiSave />
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
            <button type="button" className="admin-danger" onClick={handleLogout}>
              <FiLogOut />
              Logout
            </button>
          </div>
        </header>

        <div className="admin-stats">
          <div>
            <span>{categories.length}</span>
            Categories
          </div>
          <div>
            <span>{totalPackages}</span>
            Packages
          </div>
        </div>

        {message && <div className="admin-alert is-success">{message}</div>}
        {error && <div className="admin-alert is-error">{error}</div>}

        <ServiceEditor categories={categories} setCategories={setCategories} />
      </div>
    </main>
  );
}
