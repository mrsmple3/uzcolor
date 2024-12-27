export interface ProductState {
    id: string;
    name: string;
    art: string;
    weight: number;
    color: object;
    type: string;
    composition: string;
    params: Array<{
        param: {
            name: string;
        };
        title: string;
    }>;
    categoryId: string;
    createdAt: string;
}

export interface DefineProductState extends ProductState {
    price: string;
    shortDescription: string;
    description: string;
    count: number;
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
};

export const useProductStore = defineStore("product", {
    state: () => defaultValue,
    getters: {
        productsGetter: (state): DefineProductState[] => state.products,
        typeProductsGetter: (state) => state.typeProducts,
        categoryProductsGetter: (state) => state.categoryProducts,
        filterGetter: (state) => state.filter,
        categoryGetter: (state) => state.category,
        categoryByIdGetter: (state) => (id: string) => {
            return state.category.find((category) => category.id === id);
        },
        getIdCategoryByNameCategory: (state) => (name: string) => {
            return state.category.find((category) => category.name === name)?.id;
        }
    },
    actions: {
        async setProduct(product: ProductState) {
            try {
                return await $fetch<ProductState>("/api/product", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(product),
                });
            } catch (error) {
                console.error("Error creating product:", error);
                throw error;
            }
        },
        async getAllProducts() {
            try {
                const response: ProductState[] = await $fetch("/api/product", {
                    method: "GET",
                });
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
                const response: FilterState[] = await $fetch("/api/filter", {
                    method: "GET",
                });
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
    },
});
