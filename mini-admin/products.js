// Products Management JavaScript
class ProductsManager {
    constructor() {
        this.products = [];
        this.selectedProducts = new Set();
        this.currentCategoryFilter = 'all';
        this.currentStatusFilter = '';
        this.currentSearchTerm = '';
        
        this.init();
    }

    init() {
        this.loadProducts();
        this.renderProducts();
        this.setupEventListeners();
        this.updateStatistics();
        this.setupCategoryFilters();
        this.populateCategorySelect();
    }

    loadProducts() {
        // Load sample data
        this.products = [
            {
                id: 1,
                name: "Fresh Milk 1L",
                category: "dairy",
                barcode: "5901234567890",
                brand: "DairyFresh",
                stock: 45,
                threshold: 10,
                costPrice: 6.0,
                sellingPrice: 8.5,
                status: "in-stock",
                expiryDate: "2024-12-15",
                location: "Aisle 3, Shelf B",
                unit: "liter",
                taxRate: 10,
                lastUpdated: "2024-11-10"
            },
            {
                id: 2,
                name: "Whole Wheat Bread",
                category: "bakery",
                barcode: "5909876543210",
                brand: "BakeryCorp",
                stock: 5,
                threshold: 15,
                costPrice: 2.8,
                sellingPrice: 4.2,
                status: "low-stock",
                expiryDate: "2024-11-25",
                location: "Aisle 1, Shelf A",
                unit: "piece",
                taxRate: 10,
                lastUpdated: "2024-11-10"
            },
            {
                id: 3,
                name: "Mineral Water 1.5L",
                category: "beverages",
                barcode: "5901122334455",
                brand: "PureWater",
                stock: 120,
                threshold: 20,
                costPrice: 3.5,
                sellingPrice: 5.0,
                status: "in-stock",
                expiryDate: "2025-06-30",
                location: "Aisle 2, Shelf C",
                unit: "liter",
                taxRate: 10,
                lastUpdated: "2024-11-09"
            },
            {
                id: 4,
                name: "Yogurt Natural 500g",
                category: "dairy",
                barcode: "5902233445566",
                brand: "Yogurty",
                stock: 0,
                threshold: 25,
                costPrice: 2.5,
                sellingPrice: 3.8,
                status: "out-of-stock",
                expiryDate: "2024-11-20",
                location: "Aisle 3, Shelf A",
                unit: "piece",
                taxRate: 10,
                lastUpdated: "2024-11-11"
            },
            {
                id: 5,
                name: "Olive Oil 1L",
                category: "food",
                barcode: "5903344556677",
                brand: "OliveGold",
                stock: 18,
                threshold: 10,
                costPrice: 32.0,
                sellingPrice: 45.0,
                status: "in-stock",
                expiryDate: "2025-03-15",
                location: "Aisle 4, Shelf B",
                unit: "liter",
                taxRate: 20,
                lastUpdated: "2024-11-08"
            },
            {
                id: 6,
                name: "Orange Juice 1L",
                category: "beverages",
                barcode: "5904455667788",
                brand: "FruitJuice",
                stock: 32,
                threshold: 15,
                costPrice: 4.2,
                sellingPrice: 6.5,
                status: "in-stock",
                expiryDate: "2024-12-10",
                location: "Aisle 2, Shelf B",
                unit: "liter",
                taxRate: 10,
                lastUpdated: "2024-11-07"
            },
            {
                id: 7,
                name: "Soap Bar",
                category: "hygiene",
                barcode: "5905566778899",
                brand: "CleanLife",
                stock: 85,
                threshold: 20,
                costPrice: 1.5,
                sellingPrice: 2.5,
                status: "in-stock",
                expiryDate: "2025-12-31",
                location: "Aisle 5, Shelf A",
                unit: "piece",
                taxRate: 20,
                lastUpdated: "2024-11-06"
            },
            {
                id: 8,
                name: "Apples (1kg)",
                category: "fruits",
                barcode: "5906677889900",
                brand: "FreshFruits",
                stock: 25,
                threshold: 10,
                costPrice: 8.0,
                sellingPrice: 12.0,
                status: "in-stock",
                expiryDate: "2024-11-30",
                location: "Aisle 6, Shelf C",
                unit: "kg",
                taxRate: 0,
                lastUpdated: "2024-11-10"
            },
            {
                id: 9,
                name: "Chicken Breast (500g)",
                category: "meat",
                barcode: "5907788990011",
                brand: "FreshMeat",
                stock: 12,
                threshold: 8,
                costPrice: 15.0,
                sellingPrice: 22.0,
                status: "in-stock",
                expiryDate: "2024-11-18",
                location: "Aisle 7, Shelf A",
                unit: "kg",
                taxRate: 10,
                lastUpdated: "2024-11-09"
            },
            {
                id: 10,
                name: "Dish Soap 750ml",
                category: "household",
                barcode: "5908899001122",
                brand: "CleanHome",
                stock: 28,
                threshold: 12,
                costPrice: 4.5,
                sellingPrice: 7.8,
                status: "in-stock",
                expiryDate: "2025-08-15",
                location: "Aisle 8, Shelf B",
                unit: "piece",
                taxRate: 20,
                lastUpdated: "2024-11-08"
            }
        ];
    }

    setupEventListeners() {
        // Search input
        document.getElementById('productSearch').addEventListener('input', (e) => {
            this.currentSearchTerm = e.target.value.toLowerCase();
            this.renderProducts();
        });

        // Status filter
        document.getElementById('statusFilter').addEventListener('change', (e) => {
            this.currentStatusFilter = e.target.value;
            this.renderProducts();
        });

        // Category filter
        document.getElementById('categoryFilter').addEventListener('change', (e) => {
            this.currentCategoryFilter = e.target.value;
            this.renderProducts();
            this.updateCategoryBadges();
        });

        // Clear filters
        document.getElementById('clearFiltersBtn').addEventListener('click', () => {
            this.clearFilters();
        });

        // Add product button
        document.getElementById('addProductBtn').addEventListener('click', () => {
            this.openAddProductModal();
        });

        // Save product button
        document.getElementById('saveProductBtn').addEventListener('click', () => {
            this.saveProduct();
        });

        // Generate barcode
        document.getElementById('generateBarcodeBtn').addEventListener('click', () => {
            this.generateBarcode();
        });

        // Refresh products
        document.getElementById('refreshProductsBtn').addEventListener('click', () => {
            this.refreshProducts();
        });

        // Delete selected
        document.getElementById('deleteSelectedBtn').addEventListener('click', () => {
            this.deleteSelectedProducts();
        });

        // Sync button
        document.getElementById('syncButton').addEventListener('click', () => {
            this.syncWithHQ();
        });

        // Quick actions
        document.getElementById('scanBarcodeBtn').addEventListener('click', () => {
            this.showNotification('Barcode scanner coming soon!', 'info');
        });

        document.getElementById('exportCSVBtn').addEventListener('click', () => {
            this.exportToCSV();
        });

        document.getElementById('printTagsBtn').addEventListener('click', () => {
            this.printPriceTags();
        });

        document.getElementById('lowStockBtn').addEventListener('click', () => {
            this.filterLowStock();
        });

        document.getElementById('expiringBtn').addEventListener('click', () => {
            this.filterExpiringSoon();
        });

        // Export buttons
        document.getElementById('exportPDFBtn').addEventListener('click', () => {
            this.showNotification('PDF export coming soon!', 'info');
        });

        document.getElementById('exportExcelBtn').addEventListener('click', () => {
            this.showNotification('Excel export coming soon!', 'info');
        });

        document.getElementById('exportCSVBtn2').addEventListener('click', () => {
            this.exportToCSV();
        });

        // Calculate margin
        document.getElementById('costPrice')?.addEventListener('input', () => this.calculateMargin());
        document.getElementById('sellingPrice')?.addEventListener('input', () => this.calculateMargin());
    }

    setupCategoryFilters() {
        const container = document.getElementById('category-filters');
        if (!container) return;

        // Get unique categories
        const categories = ['all', ...new Set(this.products.map(p => p.category))];
        
        container.innerHTML = '';
        
        categories.forEach(category => {
            const badge = document.createElement('span');
            badge.className = `category-badge ${category === this.currentCategoryFilter ? 'active' : ''}`;
            badge.dataset.category = category;
            badge.innerHTML = `
                <i class="fas fa-${this.getCategoryIcon(category)}"></i>
                ${this.getCategoryDisplayName(category)}
            `;
            badge.addEventListener('click', () => {
                this.filterByCategory(category);
            });
            container.appendChild(badge);
        });
    }

    updateCategoryBadges() {
        document.querySelectorAll('.category-badge').forEach(badge => {
            const category = badge.dataset.category;
            badge.classList.toggle('active', category === this.currentCategoryFilter);
        });
    }

    populateCategorySelect() {
        const select = document.getElementById('categoryFilter');
        if (!select) return;

        // Get unique categories
        const categories = [...new Set(this.products.map(p => p.category))].sort();
        
        // Clear existing options (keep "All Categories")
        select.innerHTML = '<option value="">All Categories</option>';
        
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = this.getCategoryDisplayName(category);
            select.appendChild(option);
        });
    }

    filterByCategory(category) {
        this.currentCategoryFilter = category;
        document.getElementById('categoryFilter').value = category;
        this.renderProducts();
        this.updateCategoryBadges();
    }

    renderProducts() {
        const tableBody = document.getElementById('productsTableBody');
        if (!tableBody) return;

        // Filter products
        let filteredProducts = this.products;
        
        // Apply category filter
        if (this.currentCategoryFilter && this.currentCategoryFilter !== 'all') {
            filteredProducts = filteredProducts.filter(p => p.category === this.currentCategoryFilter);
        }
        
        // Apply status filter
        if (this.currentStatusFilter) {
            filteredProducts = filteredProducts.filter(p => p.status === this.currentStatusFilter);
        }
        
        // Apply search filter
        if (this.currentSearchTerm) {
            filteredProducts = filteredProducts.filter(p => 
                p.name.toLowerCase().includes(this.currentSearchTerm) ||
                p.barcode.toLowerCase().includes(this.currentSearchTerm) ||
                (p.brand && p.brand.toLowerCase().includes(this.currentSearchTerm))
            );
        }

        // Clear table
        tableBody.innerHTML = '';

        if (filteredProducts.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="8" class="text-center py-5">
                        <i class="fas fa-box-open fa-3x text-muted mb-3"></i>
                        <h5 class="text-muted">No products found</h5>
                        <p class="text-muted">Try changing your filters or add a new product</p>
                    </td>
                </tr>
            `;
        } else {
            // Render products
            filteredProducts.forEach(product => {
                const row = this.createProductRow(product);
                tableBody.appendChild(row);
            });
        }

        // Update product count
        this.updateProductCount(filteredProducts.length);
    }

    createProductRow(product) {
        const row = document.createElement('tr');
        row.dataset.id = product.id;
        
        // Calculate stock percentage and class
        const stockPercentage = Math.min((product.stock / (product.threshold * 3)) * 100, 100);
        let stockClass = 'stock-high';
        let stockTextClass = 'high';
        
        if (product.stock === 0) {
            stockClass = 'stock-empty';
            stockTextClass = 'low';
        } else if (product.stock < product.threshold) {
            stockClass = 'stock-low';
            stockTextClass = 'low';
        } else if (product.stock < product.threshold * 2) {
            stockClass = 'stock-medium';
            stockTextClass = 'medium';
        }

        row.innerHTML = `
            <td class="text-center">${product.id}</td>
            <td>
                <div class="product-info">
                    <div class="product-name">${product.name}</div>
                    ${product.barcode ? `<div class="product-details small">Barcode: ${product.barcode}</div>` : ''}
                    ${product.brand ? `<div class="product-details small">Brand: ${product.brand}</div>` : ''}
                </div>
            </td>
            <td>
                <span class="badge bg-light text-dark">
                    ${this.getCategoryDisplayName(product.category)}
                </span>
            </td>
            <td>
                <div class="stock-indicator-container">
                    <div class="stock-indicator">
                        <div class="stock-fill ${stockClass}" style="width: ${stockPercentage}%"></div>
                    </div>
                    <div class="stock-text ${stockTextClass}">${product.stock} ${product.unit}</div>
                </div>
            </td>
            <td class="text-end">
                <strong class="text-success">${product.sellingPrice.toFixed(2)} MAD</strong>
            </td>
            <td class="text-center">
                <span class="status-badge ${this.getStatusClass(product.status)}">
                    ${this.getStatusText(product.status)}
                </span>
            </td>
            <td class="text-center">
                ${this.formatExpiryDate(product.expiryDate)}
            </td>
            <td class="text-center">
                <div class="action-buttons">
                    <button class="btn btn-action btn-action-edit" onclick="productsManager.editProduct(${product.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-action btn-action-view" onclick="productsManager.viewProduct(${product.id})" title="View">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-action btn-action-stock" onclick="productsManager.adjustStock(${product.id})" title="Adjust Stock">
                        <i class="fas fa-boxes"></i>
                    </button>
                    <button class="btn btn-action btn-action-delete" onclick="productsManager.deleteProduct(${product.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;

        return row;
    }

    updateProductCount(count) {
        const totalCount = this.products.length;
        const element = document.getElementById('productCountText');
        if (element) {
            element.textContent = `Showing ${count} of ${totalCount} products`;
        }
    }

    updateStatistics() {
        const totalProducts = this.products.length;
        const lowStockCount = this.products.filter(p => p.status === 'low-stock').length;
        const outOfStockCount = this.products.filter(p => p.status === 'out-of-stock').length;
        const totalStockValue = this.products.reduce((sum, p) => sum + (p.stock * p.costPrice), 0);
        const avgPrice = this.products.length > 0 ? 
            this.products.reduce((sum, p) => sum + p.sellingPrice, 0) / this.products.length : 0;
        
        // Calculate expiring products (within 7 days)
        const today = new Date();
        const expiringCount = this.products.filter(p => {
            if (!p.expiryDate) return false;
            const expiryDate = new Date(p.expiryDate);
            const diffTime = expiryDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays <= 7 && diffDays >= 0;
        }).length;

        // Update UI
        this.updateStatistic('totalProducts', totalProducts);
        this.updateStatistic('lowStockCount', lowStockCount);
        this.updateStatistic('outOfStockCount', outOfStockCount);
        this.updateStatistic('totalStockValue', totalStockValue.toFixed(2) + ' MAD');
        this.updateStatistic('avgPrice', avgPrice.toFixed(2));
        this.updateStatistic('expiringCount', expiringCount);
        
        // Weekly change (simulated)
        const weeklyChange = Math.floor(Math.random() * 10) + 1;
        this.updateStatistic('weeklyChange', weeklyChange);
    }

    updateStatistic(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }

    // Filter Methods
    clearFilters() {
        this.currentCategoryFilter = 'all';
        this.currentStatusFilter = '';
        this.currentSearchTerm = '';
        
        document.getElementById('categoryFilter').value = '';
        document.getElementById('statusFilter').value = '';
        document.getElementById('productSearch').value = '';
        
        this.renderProducts();
        this.updateCategoryBadges();
        this.showNotification('All filters cleared', 'info');
    }

    filterLowStock() {
        this.currentStatusFilter = 'low-stock';
        document.getElementById('statusFilter').value = 'low-stock';
        this.renderProducts();
        this.showNotification('Showing low stock products', 'warning');
    }

    filterExpiringSoon() {
        // This is a special filter that doesn't use the normal filtering system
        const today = new Date();
        const filteredProducts = this.products.filter(p => {
            if (!p.expiryDate) return false;
            const expiryDate = new Date(p.expiryDate);
            const diffTime = expiryDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays <= 7 && diffDays >= 0;
        });
        
        if (filteredProducts.length === 0) {
            this.showNotification('No products expiring soon', 'info');
            return;
        }
        
        // Update table with filtered products
        const tableBody = document.getElementById('productsTableBody');
        tableBody.innerHTML = '';
        
        filteredProducts.forEach(product => {
            const row = this.createProductRow(product);
            tableBody.appendChild(row);
        });
        
        this.updateProductCount(filteredProducts.length);
        this.showNotification(`Showing ${filteredProducts.length} products expiring soon`, 'warning');
    }

    // Product CRUD Operations
    openAddProductModal() {
        const modal = new bootstrap.Modal(document.getElementById('addProductModal'));
        modal.show();
    }

    saveProduct() {
        // Collect form data
        const productData = {
            name: document.getElementById('productName').value.trim(),
            category: document.getElementById('category').value,
            barcode: document.getElementById('barcode').value.trim(),
            brand: document.getElementById('brand').value.trim(),
            stock: parseInt(document.getElementById('currentStock').value) || 0,
            threshold: parseInt(document.getElementById('alertThreshold').value) || 10,
            costPrice: parseFloat(document.getElementById('costPrice').value) || 0,
            sellingPrice: parseFloat(document.getElementById('sellingPrice').value) || 0,
            expiryDate: document.getElementById('expiryDate').value,
            location: document.getElementById('location').value.trim(),
            unit: document.getElementById('unit').value,
            lastUpdated: new Date().toISOString().split('T')[0]
        };

        // Validate
        if (!productData.name || !productData.category || isNaN(productData.stock) || 
            isNaN(productData.costPrice) || isNaN(productData.sellingPrice)) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Check if editing
        const modal = document.getElementById('addProductModal');
        const productId = modal.dataset.productId;

        if (productId) {
            // Update existing product
            this.updateProduct(productId, productData);
        } else {
            // Add new product
            this.addProduct(productData);
        }

        // Close modal and reset form
        bootstrap.Modal.getInstance(modal).hide();
        this.resetProductForm();
    }

    addProduct(productData) {
        // Generate new ID
        const newId = this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
        
        // Set status based on stock
        productData.id = newId;
        productData.status = this.calculateStockStatus(productData.stock, productData.threshold);
        productData.taxRate = 10; // Default tax rate

        // Add to products array
        this.products.push(productData);
        
        // Refresh display
        this.renderProducts();
        this.updateStatistics();
        this.setupCategoryFilters();
        this.populateCategorySelect();
        
        this.showNotification('Product added successfully!', 'success');
    }

    updateProduct(productId, productData) {
        const index = this.products.findIndex(p => p.id === parseInt(productId));
        if (index === -1) return;

        // Update product
        productData.id = parseInt(productId);
        productData.status = this.calculateStockStatus(productData.stock, productData.threshold);
        productData.taxRate = this.products[index].taxRate; // Keep existing tax rate

        this.products[index] = { ...this.products[index], ...productData };
        
        // Refresh display
        this.renderProducts();
        this.updateStatistics();
        
        this.showNotification('Product updated successfully!', 'success');
    }

    editProduct(productId) {
        const product = this.products.find(p => p.id === parseInt(productId));
        if (!product) {
            this.showNotification('Product not found', 'error');
            return;
        }

        // Fill form
        document.getElementById('productName').value = product.name;
        document.getElementById('category').value = product.category;
        document.getElementById('barcode').value = product.barcode;
        document.getElementById('brand').value = product.brand || '';
        document.getElementById('currentStock').value = product.stock;
        document.getElementById('alertThreshold').value = product.threshold;
        document.getElementById('costPrice').value = product.costPrice;
        document.getElementById('sellingPrice').value = product.sellingPrice;
        document.getElementById('expiryDate').value = product.expiryDate || '';
        document.getElementById('location').value = product.location || '';
        document.getElementById('unit').value = product.unit || 'piece';

        // Calculate margin
        this.calculateMargin();

        // Set modal title and store product ID
        document.getElementById('modalTitle').innerHTML = '<i class="fas fa-edit"></i> Edit Product';
        document.getElementById('addProductModal').dataset.productId = productId;

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('addProductModal'));
        modal.show();
    }

    viewProduct(productId) {
        const product = this.products.find(p => p.id === parseInt(productId));
        if (!product) {
            this.showNotification('Product not found', 'error');
            return;
        }

        // Create modal content
        const modalContent = this.createProductViewModal(product);
        
        // Create and show modal
        this.showProductViewModal(modalContent);
    }

    deleteProduct(productId) {
        if (!confirm('Are you sure you want to delete this product?')) {
            return;
        }

        const index = this.products.findIndex(p => p.id === parseInt(productId));
        if (index !== -1) {
            this.products.splice(index, 1);
            this.renderProducts();
            this.updateStatistics();
            this.setupCategoryFilters();
            this.populateCategorySelect();
            this.showNotification('Product deleted successfully!', 'success');
        }
    }

    adjustStock(productId) {
        const product = this.products.find(p => p.id === parseInt(productId));
        if (!product) return;

        const newStock = prompt(`Current stock: ${product.stock} ${product.unit}\n\nEnter new stock value:`, product.stock);
        if (newStock !== null && !isNaN(newStock)) {
            const stockValue = parseInt(newStock);
            product.stock = stockValue;
            product.status = this.calculateStockStatus(stockValue, product.threshold);
            product.lastUpdated = new Date().toISOString().split('T')[0];
            
            this.renderProducts();
            this.updateStatistics();
            this.showNotification(`Stock updated to ${stockValue} ${product.unit}`, 'success');
        }
    }

    // Selection Methods
    deleteSelectedProducts() {
        if (this.selectedProducts.size === 0) {
            this.showNotification('No products selected', 'warning');
            return;
        }

        if (!confirm(`Are you sure you want to delete ${this.selectedProducts.size} selected products?`)) {
            return;
        }

        // Delete selected products
        const idsToDelete = Array.from(this.selectedProducts);
        idsToDelete.forEach(id => {
            const index = this.products.findIndex(p => p.id === parseInt(id));
            if (index !== -1) {
                this.products.splice(index, 1);
            }
        });

        // Clear selection and refresh
        this.selectedProducts.clear();
        this.renderProducts();
        this.updateStatistics();
        this.setupCategoryFilters();
        this.populateCategorySelect();
        
        this.showNotification(`${idsToDelete.length} products deleted successfully!`, 'success');
    }

    // Utility Methods
    calculateStockStatus(stock, threshold) {
        if (stock === 0) return 'out-of-stock';
        if (stock < threshold) return 'low-stock';
        return 'in-stock';
    }

    calculateMargin() {
        const cost = parseFloat(document.getElementById('costPrice')?.value) || 0;
        const price = parseFloat(document.getElementById('sellingPrice')?.value) || 0;
        const marginElement = document.getElementById('profitMargin');
        
        if (!marginElement) return;
        
        if (cost > 0 && price > 0) {
            const margin = ((price - cost) / cost * 100).toFixed(2);
            marginElement.value = `${margin}%`;
            
            // Color coding
            if (margin >= 50) marginElement.style.color = 'var(--success)';
            else if (margin >= 20) marginElement.style.color = 'var(--warning)';
            else marginElement.style.color = 'var(--danger)';
            
            marginElement.style.fontWeight = 'bold';
        } else {
            marginElement.value = '';
            marginElement.style.color = '';
            marginElement.style.fontWeight = '';
        }
    }

    generateBarcode() {
        const barcode = '590' + Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
        document.getElementById('barcode').value = barcode;
        this.showNotification(`Generated barcode: ${barcode}`, 'success');
    }

    resetProductForm() {
        const form = document.getElementById('productForm');
        if (form) {
            form.reset();
            document.getElementById('profitMargin').value = '';
            document.getElementById('profitMargin').style.color = '';
            document.getElementById('profitMargin').style.fontWeight = '';
        }
        
        // Reset modal title
        document.getElementById('modalTitle').innerHTML = '<i class="fas fa-plus-circle"></i> Add New Product';
        delete document.getElementById('addProductModal').dataset.productId;
    }

    refreshProducts() {
        this.renderProducts();
        this.showNotification('Products refreshed', 'info');
    }

    syncWithHQ() {
        const syncBtn = document.getElementById('syncButton');
        const originalText = syncBtn.innerHTML;
        
        syncBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Syncing...';
        syncBtn.disabled = true;
        
        setTimeout(() => {
            this.showNotification('Synchronization completed successfully', 'success');
            syncBtn.innerHTML = originalText;
            syncBtn.disabled = false;
        }, 1500);
    }

    exportToCSV() {
        const headers = ['ID', 'Name', 'Category', 'Barcode', 'Stock', 'Price', 'Status', 'Expiry Date'];
        const csvData = this.products.map(p => [
            p.id,
            p.name,
            this.getCategoryDisplayName(p.category),
            p.barcode,
            p.stock,
            p.sellingPrice,
            this.getStatusText(p.status),
            p.expiryDate || 'N/A'
        ]);
        
        const csvContent = [headers, ...csvData]
            .map(row => row.map(cell => `"${cell}"`).join(','))
            .join('\n');
        
        this.downloadFile(csvContent, `products_${new Date().toISOString().split('T')[0]}.csv`, 'text/csv');
        this.showNotification('Products exported to CSV successfully', 'success');
    }

    printPriceTags() {
        const productsToPrint = this.selectedProducts.size > 0
            ? this.products.filter(p => this.selectedProducts.has(p.id.toString()))
            : this.products.slice(0, 10);

        if (productsToPrint.length === 0) {
            this.showNotification('No products to print', 'warning');
            return;
        }

        const printContent = this.generatePrintContent(productsToPrint);
        const printWindow = window.open('', '_blank');
        printWindow.document.write(printContent);
        printWindow.document.close();
        
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 500);
        
        this.showNotification(`Printing ${productsToPrint.length} price tags`, 'success');
    }

    // Helper Methods
    getCategoryIcon(category) {
        const icons = {
            'all': 'boxes',
            'food': 'utensils',
            'beverages': 'wine-bottle',
            'hygiene': 'soap',
            'household': 'home',
            'fruits': 'apple-alt',
            'dairy': 'cheese',
            'bakery': 'bread-slice',
            'meat': 'drumstick-bite'
        };
        return icons[category] || 'box';
    }

    getCategoryDisplayName(category) {
        if (category === 'all') return 'All Products';
        
        const names = {
            'food': 'Food',
            'beverages': 'Beverages',
            'hygiene': 'Hygiene',
            'household': 'Household',
            'fruits': 'Fruits & Vegetables',
            'dairy': 'Dairy',
            'bakery': 'Bakery',
            'meat': 'Meat & Poultry'
        };
        return names[category] || category.charAt(0).toUpperCase() + category.slice(1);
    }

    getStatusClass(status) {
        const classes = {
            'in-stock': 'status-in-stock',
            'low-stock': 'status-low-stock',
            'out-of-stock': 'status-out-of-stock'
        };
        return classes[status] || 'status-in-stock';
    }

    getStatusText(status) {
        const texts = {
            'in-stock': 'In Stock',
            'low-stock': 'Low Stock',
            'out-of-stock': 'Out of Stock'
        };
        return texts[status] || 'In Stock';
    }

    formatExpiryDate(dateString) {
        if (!dateString) return '<span class="text-muted">N/A</span>';
        
        const date = new Date(dateString);
        const today = new Date();
        const diffTime = date - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        let badgeClass = 'badge bg-success';
        let icon = '';
        
        if (diffDays < 0) {
            badgeClass = 'badge bg-danger';
            icon = '<i class="fas fa-times-circle ms-1"></i>';
        } else if (diffDays <= 7) {
            badgeClass = 'badge bg-warning';
            icon = '<i class="fas fa-exclamation-triangle ms-1"></i>';
        }
        
        return `
            <span class="${badgeClass}">
                ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                ${icon}
            </span>
        `;
    }

    createProductViewModal(product) {
        const statusConfig = {
            'in-stock': { class: 'success', text: 'In Stock' },
            'low-stock': { class: 'warning', text: 'Low Stock' },
            'out-of-stock': { class: 'danger', text: 'Out of Stock' }
        }[product.status] || { class: 'info', text: 'Unknown' };

        const margin = ((product.sellingPrice - product.costPrice) / product.costPrice * 100).toFixed(2);
        
        return `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header modal-header-yellow">
                        <h5 class="modal-title"><i class="fas fa-info-circle"></i> Product Details</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row mb-4">
                            <div class="col-md-8">
                                <h4 class="product-name">${product.name}</h4>
                                ${product.brand ? `<p class="text-muted">Brand: ${product.brand}</p>` : ''}
                                <p class="text-muted">ID: ${product.id} • Barcode: ${product.barcode || 'N/A'}</p>
                            </div>
                            <div class="col-md-4 text-end">
                                <span class="badge bg-${statusConfig.class}">${statusConfig.text}</span>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col-md-6">
                                <h6><i class="fas fa-info-circle"></i> Product Information</h6>
                                <table class="table table-sm">
                                    <tr><td><strong>Category:</strong></td><td>${this.getCategoryDisplayName(product.category)}</td></tr>
                                    <tr><td><strong>Unit:</strong></td><td>${product.unit}</td></tr>
                                    <tr><td><strong>Location:</strong></td><td>${product.location || 'N/A'}</td></tr>
                                    <tr><td><strong>Tax Rate:</strong></td><td>${product.taxRate}%</td></tr>
                                </table>
                            </div>
                            <div class="col-md-6">
                                <h6><i class="fas fa-chart-line"></i> Stock & Pricing</h6>
                                <table class="table table-sm">
                                    <tr><td><strong>Current Stock:</strong></td><td>${product.stock} ${product.unit}</td></tr>
                                    <tr><td><strong>Alert Threshold:</strong></td><td>${product.threshold} ${product.unit}</td></tr>
                                    <tr><td><strong>Cost Price:</strong></td><td>${product.costPrice.toFixed(2)} MAD</td></tr>
                                    <tr><td><strong>Selling Price:</strong></td><td>${product.sellingPrice.toFixed(2)} MAD</td></tr>
                                    <tr><td><strong>Profit Margin:</strong></td><td>${margin}%</td></tr>
                                </table>
                            </div>
                        </div>
                        
                        <div class="row mt-3">
                            <div class="col-12">
                                <h6><i class="fas fa-calendar-alt"></i> Additional Information</h6>
                                <table class="table table-sm">
                                    <tr><td><strong>Expiry Date:</strong></td><td>${product.expiryDate ? new Date(product.expiryDate).toLocaleDateString() : 'N/A'}</td></tr>
                                    <tr><td><strong>Last Updated:</strong></td><td>${new Date(product.lastUpdated).toLocaleDateString()}</td></tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-yellow" onclick="productsManager.editProduct(${product.id})">
                            <i class="fas fa-edit"></i> Edit Product
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    showProductViewModal(content) {
        // Remove existing modal if any
        const existingModal = document.getElementById('productViewModal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Create modal container
        const modalContainer = document.createElement('div');
        modalContainer.className = 'modal fade';
        modalContainer.id = 'productViewModal';
        modalContainer.tabIndex = '-1';
        modalContainer.innerHTML = content;
        
        // Add to body and show
        document.body.appendChild(modalContainer);
        const modal = new bootstrap.Modal(modalContainer);
        modal.show();
        
        // Remove on hide
        modalContainer.addEventListener('hidden.bs.modal', () => {
            modalContainer.remove();
        });
    }

    generatePrintContent(products) {
        let content = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Price Tags - SuperMaroc</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
                    .price-tag-container { display: flex; flex-wrap: wrap; gap: 10px; }
                    .price-tag { 
                        width: 200px; 
                        height: 100px; 
                        border: 1px solid #000; 
                        padding: 10px;
                        page-break-inside: avoid;
                    }
                    .product-name { font-weight: bold; font-size: 14px; margin-bottom: 5px; }
                    .price { font-size: 18px; font-weight: bold; color: #d00; margin: 10px 0; }
                    .barcode { font-family: monospace; font-size: 12px; letter-spacing: 1px; }
                    .store-name { font-size: 10px; color: #666; margin-top: 5px; }
                    @media print {
                        .no-print { display: none; }
                        body { padding: 0; }
                    }
                </style>
            </head>
            <body>
                <button class="no-print" onclick="window.print()" style="position: fixed; top: 20px; right: 20px; padding: 10px 20px; background: #FFD700; border: none; cursor: pointer;">Print Tags</button>
                <h1 class="no-print">Price Tags - ${products.length} items</h1>
                <div class="price-tag-container">
        `;

        products.forEach(product => {
            content += `
                <div class="price-tag">
                    <div class="product-name">${product.name.substring(0, 30)}</div>
                    <div class="price">${product.sellingPrice.toFixed(2)} MAD</div>
                    <div class="barcode">${product.barcode || '5900000000000'}</div>
                    <div class="store-name">SuperMaroc - Agadir • ${new Date().toLocaleDateString()}</div>
                </div>
            `;
        });

        content += `
                </div>
            </body>
            </html>
        `;
        
        return content;
    }

    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    showNotification(message, type = 'info') {
        // Create notification container if it doesn't exist
        let container = document.querySelector('.notification-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'notification-container';
            document.body.appendChild(container);
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="fas fa-${this.getNotificationIcon(type)} me-2"></i>
                <div class="flex-grow-1">${message}</div>
                <button type="button" class="btn-close" onclick="this.parentElement.parentElement.remove()"></button>
            </div>
        `;
        
        container.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }

    getNotificationIcon(type) {
        const icons = {
            'success': 'check-circle',
            'error': 'exclamation-circle',
            'warning': 'exclamation-triangle',
            'info': 'info-circle'
        };
        return icons[type] || 'info-circle';
    }
}

// Initialize Products Manager
let productsManager;

document.addEventListener('DOMContentLoaded', function() {
    productsManager = new ProductsManager();
    window.productsManager = productsManager;
});