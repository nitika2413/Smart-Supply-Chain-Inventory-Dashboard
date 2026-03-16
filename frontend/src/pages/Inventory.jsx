import { useState, useMemo } from 'react';
import { Plus, Search, Pencil, Trash2, Filter } from 'lucide-react';
import ProductModal from '../components/ProductModal';
import { products as initialProducts } from '../data/mockData';

const categories = ['All', 'Milk Products', 'Coffee', 'Noodles', 'Chocolate', 'Baby Food'];

export default function Inventory() {
  const [productList, setProductList] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filtered = useMemo(() => {
    return productList.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.supplier.toLowerCase().includes(search.toLowerCase());
      const matchCat = categoryFilter === 'All' || p.category === categoryFilter;
      return matchSearch && matchCat;
    });
  }, [productList, search, categoryFilter]);

  const handleSave = (product) => {
    if (editProduct) {
      setProductList((prev) => prev.map((p) => (p.id === product.id ? product : p)));
    } else {
      setProductList((prev) => [product, ...prev]);
    }
    setShowModal(false);
    setEditProduct(null);
  };

  const handleDelete = (id) => {
    setProductList((prev) => prev.filter((p) => p.id !== id));
    setDeleteConfirm(null);
  };

  const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Inventory Management</h1>
          <p className="text-sm text-surface-400 mt-1">{productList.length} products · {productList.filter(p => p.stockQuantity < p.minStockThreshold).length} low stock</p>
        </div>
        <button onClick={() => { setEditProduct(null); setShowModal(true); }} className="btn-primary flex items-center gap-2 w-fit">
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products or suppliers…"
            className="input-field pl-9"
          />
        </div>
        <div className="relative">
          <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="input-field pl-9 pr-8 appearance-none cursor-pointer min-w-[160px]"
          >
            {categories.map((c) => (<option key={c} value={c}>{c}</option>))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-800/40">
                <th className="text-left py-3 px-4 text-xs font-semibold text-surface-500 uppercase tracking-wider">Product</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-surface-500 uppercase tracking-wider">Category</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-surface-500 uppercase tracking-wider">Stock</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-surface-500 uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-surface-500 uppercase tracking-wider">Supplier</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-surface-500 uppercase tracking-wider">Last Updated</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-surface-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const isLow = p.stockQuantity < p.minStockThreshold;
                return (
                  <tr
                    key={p.id}
                    className={`border-t border-surface-800/40 transition-colors ${
                      isLow ? 'bg-red-500/[0.04] hover:bg-red-500/[0.08]' : 'hover:bg-surface-800/30'
                    }`}
                  >
                    <td className="py-3 px-4">
                      <span className="font-medium text-surface-200">{p.name}</span>
                      <p className="text-xs text-surface-500 mt-0.5">₹{p.price}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs font-medium bg-surface-700/60 text-surface-300 px-2 py-1 rounded-md">{p.category}</span>
                    </td>
                    <td className={`py-3 px-4 text-right font-semibold ${isLow ? 'text-red-400' : 'text-surface-200'}`}>
                      {p.stockQuantity}
                      <span className="text-surface-600 font-normal text-xs"> / {p.minStockThreshold}</span>
                    </td>
                    <td className="py-3 px-4">
                      {isLow ? (
                        <span className="badge-danger">Restock Required</span>
                      ) : (
                        <span className="badge-success">In Stock</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-surface-400">{p.supplier}</td>
                    <td className="py-3 px-4 text-surface-500 text-xs">{formatDate(p.lastUpdated)}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => { setEditProduct(p); setShowModal(true); }}
                          className="p-2 rounded-lg text-surface-500 hover:text-brand-400 hover:bg-brand-500/10 transition-all"
                          title="Edit"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(p.id)}
                          className="p-2 rounded-lg text-surface-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-surface-500">No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <ProductModal
          product={editProduct}
          onSave={handleSave}
          onClose={() => { setShowModal(false); setEditProduct(null); }}
        />
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="glass-card p-6 max-w-sm w-full text-center space-y-4 animate-slide-up border-surface-600/50">
            <Trash2 size={32} className="text-red-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">Delete Product?</h3>
            <p className="text-sm text-surface-400">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(deleteConfirm)} className="btn-danger flex-1 py-2">Delete</button>
              <button onClick={() => setDeleteConfirm(null)} className="btn-secondary flex-1">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
