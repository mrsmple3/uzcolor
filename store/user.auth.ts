import type {ProductState} from "~/store/product.store";

export interface User {
    id: string;
    name: string;
    phone: string;
    email: string;
    password: string;
}

export interface Favorite {
    id: string;
    userId: string;
    productId: string;
    createdAt: string;
    product: ProductState;
}

export interface RefreshToken {
    accessToken: string;
}

export interface Cart {
    id: string;
    userId: string;
    items: CartItem[];
}

export interface CartItem {
    id: string;
    cartId: string;
    productId: string;
    count: number;
    color: object;
    product: ProductState;
}

const defaultValue: {
    user: User;
    accessToken: string;
    savedProducts: ProductState[],
    cartItem: CartItem,
    cart: Cart
} = {
    user: {
        id: "",
        name: "",
        phone: "",
        email: "",
        password: "",
    },
    accessToken: "",
    savedProducts: [],
    cartItem: {
        id: "",
        cartId: "",
        productId: "",
        count: 0,
        color: {},
    },
    cart: {
        id: "",
        userId: "",
        items: [],
    },
};
export const useUserStore = defineStore("user", {
    state: () => defaultValue,
    getters: {
        userGetter: (state): User => state.user,
        isAdmin: (state): boolean => state.user.role === 'ADMIN',
        savedProductsGetter: (state): ProductState[] => state.savedProducts,
        totalSavedProducts: (state): number => state.savedProducts.length,
        cartGetter: (state): Cart => state.cart,
        totalCartItems: (state): number => state.cart.items.length,
        isAuthenticated: (state): boolean => !!state.accessToken,
        isSavedProduct: (state) => (productId: string) => state.savedProducts.some((product) => product.id === productId),
    },
    actions: {
        async login(title: string, password: string, role: string = 'USER') {
            try {
                if (role === 'ADMIN') {
                    const response = await $fetch("/api/auth/login", {
                        method: "POST",
                        body: {
                            email: title,
                            password: password,
                            role: role
                        },
                    });
                    this.$patch({user: response.user, accessToken: response.access_token});
                }
                if (title.includes("@")) {
                    const response = await $fetch("/api/auth/login", {
                        method: "POST",
                        body: {
                            email: title,
                            password: password
                        },
                    });
                    this.$patch({user: response.user, accessToken: response.access_token});
                } else {
                    console.log("Phone number");
                }
            } catch (error) {
                console.error("Error logging in:", error);
                throw error;
            }
        },
        async refreshToken() {
            try {
                const response = await $fetch<RefreshToken>("/api/auth/refresh");
                this.$patch({accessToken: response.accessToken});
            } catch (error) {
                console.error("Error refreshing token:", error);
                throw error;
            }
        },
        async logout() {
            try {
                await this.useFetchApi('/api/auth/logout', {
                    method: 'POST',
                });
                this.$patch({user: defaultValue.user, accessToken: defaultValue.accessToken});
            } catch (error) {
                console.error("Error logging out:", error);
                throw error;
            }
        },
        async initAuth() {
            try {
                await this.refreshToken();
                await this.getUser().then(() => {
                    this.getCarts(this.userGetter.id);
                    this.getFavorites(this.userGetter.id);
                })
            } catch (error) {
                console.error("Error initializing auth:", error);
                throw error;
            }
        },
        async getUser() {
            try {
                const response = (await this.useFetchApi("/api/auth/user")) as User;
                this.$patch({user: response});
            } catch (error) {
                console.error("Error getting user:", error);
                throw error;
            }
        },
        async updateProfile(user: User) {
            try {
                const response: User = await this.useFetchApi(`/api/auth/${user.id}`, {
                    method: "PUT",
                    body: user,
                });
                this.$patch({user: response});
            } catch (error) {
                console.error("Error updating profile:", error);
                throw error;
            }
        },
        async changePassword(userId: string, currentPassword: string, newPassword: string) {
            try {
                await this.useFetchApi(`/api/auth/password/${userId}`, {
                    method: "PUT",
                    body: {currentPassword: currentPassword, newPassword: newPassword},
                });
            } catch (error) {
                console.error("Error changing password:", error);
                throw error;
            }
        },
        async register(user: User) {
        },
        async saveProduct(userId: string, productId: string) {
            try {
                const response: Favorite = await $fetch(`/api/user/saved/${userId}/${productId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: {
                        userId,
                        productId,
                    },
                }).then(() => {
                    this.getFavorites(this.userGetter.id);
                });
            } catch (error) {
                console.error("Error saving product:", error);
                throw error;
            }
        },
        async deleteSavedProduct(userId: string, productId: string) {
            try {
                await $fetch(`/api/user/saved/${userId}/${productId}`, {
                    method: 'DELETE',
                }).then(() => {
                    this.getFavorites(userId);
                });
            } catch (error) {
                console.error("Error deleting product:", error);
                throw error;
            }
        },
        async getFavorites(userId: string) {
            try {
                const response = await $fetch(`/api/user/saved/${userId}`);
                this.$patch({savedProducts: response as Favorite[]});
            } catch (error) {
                console.error("Error getting favorites:", error);
                throw error;
            }
        },
        async useFetchApi(url: string, options: RequestInit = {}) {
            return await $fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: `Bearer ${this.$state.accessToken}`,
                },
                method: options.method as "POST" | "GET" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS" | "CONNECT" | "TRACE" | undefined,
            });
        },
        async setCart(userId: string, productId: string, count: number, color: any, price: number) {
            try {
                const response: CartItem = await $fetch(`/api/user/cart/${userId}`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: {productId, count, color, price},
                }).then(() => {
                    this.getCarts(this.userGetter.id);
                });
            } catch (error) {
                console.error("Error setting cart:", error);
                throw error;
            }
        },
        async getCarts(userId: string) {
            try {
                const response: Cart = await $fetch(`/api/user/cart/${userId}`);
                this.$patch({cart: response});
            } catch (error) {
                console.error("Error getting cart:", error);
                throw error;
            }
        },
        async deleteCartItem(userId: string, cartItemId: string) {
            try {
                await $fetch(`/api/user/cart/${userId}/${cartItemId}`, {
                    method: 'DELETE',
                }).then(() => {
                    this.getCarts(this.userGetter.id);
                })
            } catch (error) {
                console.error("Error deleting cart item:", error);
                throw error;
            }
        },
        async sendVerificationCode(phoneNumber: string) {
            try {
                return await $fetch("/api/verification/send", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({phoneNumber}),
                });
            } catch (error) {
                console.error("Error sending verification code:", error);
                throw error;
            }
        },
        async checkVerificationCode(phoneNumber: string, code: string) {
            try {
                return await $fetch("/api/verification/check", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({phoneNumber, code}),
                });
            } catch (error) {
                console.error("Error checking verification code:", error);
                throw error;
            }
        },

    },
});
