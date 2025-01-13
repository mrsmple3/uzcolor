export interface ProductState {
    id?: string;
    name: string;
    art: string;
    weight: number;
    color: object;
    type: string;
    composition: string;
    params?: Array<{
        param: {
            name: string;
        };
        title: string;
    }>;
    categoryId?: string;
    createdAt?: string;
}

export interface DefineProductState extends ProductState {
    price?: number;
    shortDescription?: string;
    description?: string;
    count?: number;
}

export interface CategoryState {
    id: string;
    name: string;
    photo: string;
}

export interface FilterState {
    id: string;
    name: string;
    show: string;
}

export interface Filter {
    name: string;
    filters: {
        name: string;
        checked: boolean;
    };
}

export interface TypeProducts {
    xit: ProductState[];
    news: ProductState[];
    recommendation: ProductState[];
}

const defaultValue: {
    products: ProductState[];
    typeProducts: TypeProducts;
    categoryProducts: ProductState[];
    category: CategoryState[];
    filter: FilterState[];
    defineProduct: DefineProductState;
    currentProduct: DefineProductState;
} = {
    products: [],
    typeProducts: {
        xit: [],
        news: [],
        recommendation: [],
    },
    categoryProducts: [],
    category: [],
    filter: [],
    defineProduct: {
        id: "",
        name: "",
        art: "",
        weight: 0,
        color: {},
        type: "",
        composition: "",
        params: [],
        categoryId: "",
        createdAt: "",
        price: "",
        shortDescription: "",
        description: "",
        count: 0,
    },
    currentProduct: {
        id: "",
        name: "",
        art: "",
        weight: 0,
        color: {},
        type: "",
        composition: "",
        params: [],
        categoryId: "",
        createdAt: "",
        price: "",
        shortDescription: "",
        description: "",
        count: 0,
    },
};

export const useProductStore = defineStore("product", {
    state: () => defaultValue,
    getters: {
        productsGetter: (state): DefineProductState[] => state.products,
        typeProductsGetter: (state) => state.typeProducts,
        categoryProductsGetter: (state) => state.categoryProducts,
        filterGetter: (state) => state.filter,
        categoryGetter: (state): CategoryState[] => state.category,
        categoryByIdGetter:
            (state): CategoryState =>
                (id: string) => {
                    return state.category.find((category) => category.id === id);
                },
        getIdCategoryByNameCategory: (state) => (name: string) => {
            return state.category.find((category) => category.name === name)?.id;
        },
        getCurrentProduct: (state): DefineProductState => state.currentProduct,
        getProductProductsByCategory: (state) => {
            return state.category.map((category) => {
                return {
                    category,
                    products: state.products.filter((product) => product.categoryId === category.id),
                };
            });
        },
    },
    actions: {
        async setProduct(product: DefineProductState) {
            try {
                const response = await $fetch<DefineProductState>("/api/product", {
                    method: "POST",
                    body: product,
                });
                this.$patch({currentProduct: response});
            } catch (error) {
                console.error("Error creating product:", error);
                throw error;
            }
        },
        async getAllProducts() {
            try {
                const response: ProductState[] = await $fetch("/api/product");
                this.$patch({products: response});
            } catch (error) {
                console.error("Error getting products:", error);
                throw error;
            }
        },
        async updateProductCount(productId: string, count: number) {
            try {
                await $fetch(`/api/product/${productId}`, {
                    method: "PUT",
                    body: {count},
                });
            } catch (error) {
                console.error("Error updating product count:", error);
                throw error;
            }
        },
        async updateProduct(product: DefineProductState) {
            try {
                await $fetch(`/api/product/`, {
                    method: "PUT",
                    body: product,
                });
            } catch (error) {
                console.error("Error updating product:", error);
                throw error;
            }
        },
        async setCurrentProduct(productId: string) {
            try {
                const response: DefineProductState = await $fetch(`/api/product/${productId}`);
                this.$patch({currentProduct: response});
            } catch (error) {
                console.error("Error setting current product:", error);
                throw error;
            }
        },
        async deleteProduct(productId: string) {
            try {
                await $fetch(`/api/product/`, {
                    method: "DELETE",
                    body: {
                        id: productId,
                    },
                });
            } catch (error) {
                console.error("Error deleting product:", error);
                throw error;
            }
        },
        async getProductsByCategory(categoryId: string) {
            try {
                const response: ProductState[] = await $fetch(`/api/product/category/${categoryId}`, {
                    method: "GET",
                });
                this.$patch({categoryProducts: response});
                return response;
            } catch (error) {
                console.error("Error getting products by category:", error);
                throw error;
            }
        },
        async getProductByType(type: string) {
            try {
                const response: ProductState[] = await $fetch(`/api/product/type/${type}`, {
                    method: "GET",
                });
                if (type === "xit") {
                    this.$patch({typeProducts: {...this.typeProducts, xit: response}});
                } else if (type === "news") {
                    this.$patch({typeProducts: {...this.typeProducts, news: response}});
                } else if (type === "recommendation") {
                    this.$patch({typeProducts: {...this.typeProducts, recommendation: response}});
                }
            } catch (error) {
                console.error("Error getting products by type:", error);
                throw error;
            }
        },
        async getAllCategory() {
            try {
                const response: CategoryState[] = await $fetch("/api/category", {
                    method: "GET",
                });
                this.$patch({category: response});
            } catch (error) {
                console.error("Error getting category:", error);
                throw error;
            }
        },
        async getAllFilter() {
            try {
                const response: FilterState[] = await $fetch("/api/filter");
                this.$patch({filter: response});
            } catch (error) {
                console.error("Error getting filter:", error);
                throw error;
            }
        },
        getCurrentFilters(filter: FilterState, products: ProductState[]) {
            if (products.length === 0 || filter === undefined) {
                return [];
            }
            const uniqueFilters = new Set<string>();
            products.forEach((product) => {
                const paramName = product.params.find((param) => param.title === filter.name)?.param.name;
                if (paramName) {
                    uniqueFilters.add(paramName);
                }
            });
            return Array.from(uniqueFilters).map((name) => ({
                name,
                checked: false,
            }));
        },
        async getProductById(id: string) {
            try {
                const response: DefineProductState = await $fetch(`/api/product/${id}`, {
                    method: "GET",
                });
                this.$patch({defineProduct: response});
            } catch (error) {
                console.error("Error getting product by id:", error);
                throw error;
            }
        },
        async createCategory(category: CategoryState) {
            try {
                const response = await $fetch('/api/category', {
                    method: 'POST',
                    body: category,
                });
                this.$patch({category: [...this.category, response]});
            } catch (error) {
                console.error('Error creating category:', error);
                throw error;
            }
        },
        async deleteCategory(categoryId: string) {
            try {
                await $fetch(`/api/category/${categoryId}`, {
                    method: 'DELETE',
                });
                this.$patch({category: this.category.filter((category) => category.id !== categoryId)});
            } catch (error) {
                console.error('Error deleting category:', error);
                throw error;
            }
        },
        async updateCategory(category: CategoryState) {
            try {
                const response = await $fetch('/api/category', {
                    method: 'PUT',
                    body: category,
                });
                this.$patch({category: this.category.map((item) => item.id === category.id ? category : item)});
            } catch (error) {
                console.error('Error updating category:', error);
                throw error;
            }
        },
        async updateFilter(filter: FilterState) {
            try {
                const response = await $fetch('/api/filter', {
                    method: 'PUT',
                    body: filter,
                });
                if (response.message === 'Фильтр успешно обновлен') {
                    this.$patch({filter: this.filter.map((item) => item.id === filter.id ? filter : item)});
                }
            } catch (error) {
                console.error('Error updating filter:', error);
                throw error;
            }
        },
        async deleteFilter(filterId: string) {
            try {
                const response = await $fetch(`/api/filter/${filterId}`, {
                    method: 'DELETE',
                });
                if (response.message === 'Фильтр успешно удален')
                    this.$patch({filter: this.filter.filter((item) => item.id !== filterId)});
            } catch (error) {
                console.error('Error deleting filter:', error);
                throw error;
            }
        }
    },
});
