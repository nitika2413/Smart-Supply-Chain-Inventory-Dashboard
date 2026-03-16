import { useState } from 'react';
import { X } from 'lucide-react';

const categories = ['Milk Products', 'Coffee', 'Noodles', 'Chocolate', 'Baby Food'];

export default function ProductModal({ product, onSave, onClose }) {
  const isEdit = !!product;
  const [form, setForm] = useState({
    name: product?.name || '',
    category: product?.category || categories[0],
    stockQuantity: product?.stockQuantity ?? '',
    minStockThreshold: product?.minStockThreshold ?? 20,
    supplier: product?.supplier || '',
    price: product?.price ?? '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'category' || name === 'name' || name === 'supplier' ? value : Number(value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...product,
      ...form,
      id: product?.id || String(Date.now()),
      lastUpdated: new Date().toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="glass-card w-full max-w-lg p-6 space-y-5 animate-slide-up border-surface-600/50">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">{isEdit ? 'Edit Product' : 'Add New Product'}</h2>
          <button onClick={onClose} className="text-surface-500 hover:text-surface-300 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-surface-400 mb-1.5 uppercase tracking-wider">Product Name</label>
            <input name="name" value={form.name} onChange={handleChange} required className="input-field" placeholder="e.g. Nescafé Classic 200g" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-surface-400 mb-1.5 uppercase tracking-wider">Category</label>
              <select name="category" value={form.category} onChange={handleChange} className="input-field">
                {categories.map((c) => (<option key={c} value={c}>{c}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-surface-400 mb-1.5 uppercase tracking-wider">Price (₹)</label>
              <input name="price" type="number" min="0" value={form.price} onChange={handleChange} required className="input-field" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-surface-400 mb-1.5 uppercase tracking-wider">Stock Quantity</label>
              <input name="stockQuantity" type="number" min="0" value={form.stockQuantity} onChange={handleChange} required className="input-field" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-surface-400 mb-1.5 uppercase tracking-wider">Min. Threshold</label>
              <input name="minStockThreshold" type="number" min="0" value={form.minStockThreshold} onChange={handleChange} required className="input-field" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-surface-400 mb-1.5 uppercase tracking-wider">Supplier</label>
            <input name="supplier" value={form.supplier} onChange={handleChange} required className="input-field" placeholder="e.g. Nestlé India" />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary flex-1">{isEdit ? 'Update Product' : 'Add Product'}</button>
            <button type="button" onClick={onClose} className="btn-secondary flex-1">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
