import type {Order, OrderItem, ProductState} from "~/store/product.store";
import {useFetchApi} from "~/utils/api";

export interface User {
    id: string;
    name: string;
    phone: string;
    email: string;
    password: string;
    company: string;
    role: string;
    address: string;
    files: string[];
    updatedAt: string;
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
    cart: Cart,
    orders: Order[],
    users: User[],
} = {
    user: {
        id: "",
        name: "",
        phone: "",
        email: "",
        password: "",
        company: "",
        role: "",
        address: "",
        files: [],
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
    orders: [],
    users: [],
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
        getCartItemByIdProduct: (state) => (productId: string) => state.cart.items.find((item) => item.productId === productId),
        isAuthenticated: (state): boolean => !!state.accessToken,
        isSavedProduct: (state) => (productId: string) => state.savedProducts.some((product) => product.id === productId),
        orderGetter: (state) => state.orders.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()),
        usersGetter: (state): User[] => state.users,
        userById: (state) => (userId: string) => state.users.find((user) => user.id === userId),
        userNameById: (state) => (userId: string) => state.users.find((user) => user.id === userId)?.name,
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
                    if (!response.access_token)
                        throw new Error(response.message);

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
                    if (!response.access_token)
                        throw new Error(response.message);

                    this.$patch({user: response.user, accessToken: response.access_token});
                } else {
                    console.log("Phone number");
                }
            } catch (error) {
                throw error;
            }
        },
        async refreshToken() {
            try {
                const response = await $fetch<RefreshToken>("/api/auth/refresh");

                if (!response.accessToken)
                    return "Access token not found"

                this.$patch({accessToken: response.accessToken});
            } catch (error) {
                console.error("Error refreshing token:", error);
                throw error;
            }
        },
        async logout() {
            try {
                await useFetchApi('/api/auth/logout', {
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
                const refresh = await this.refreshToken();
                if (refresh === "Access token not found") {
                    return;
                }
                await this.getUser().then(async () => {
                    if (this.isAdmin) {
                        await this.getAllUsers();
                        await this.getOrders();
                    }
                })
            } catch (error) {
                console.error("Error initializing auth:", error);
                throw error;
            }
        },
        async getUser() {
            try {
                const response = (await useFetchApi("/api/auth/user")) as User;
                this.$patch({user: response});
            } catch (error) {
                console.error("Error getting user:", error);
                throw error;
            }
        },
        async updateProfile(user: User) {
            try {
                const response: User = await useFetchApi(`/api/auth/${user.id}`, {
                    method: "PUT",
                    body: user,
                });
                this.$patch({user: response.body});
            } catch (error) {
                console.error("Error updating profile:", error);
                throw error;
            }
        },
        async updateUser(user: User) {
            try {
                const response: User = await useFetchApi(`/api/user`, {
                    method: "PUT",
                    body: user,
                });
                this.$patch({user: response.body});
            } catch (error) {
                console.error("Error updating profile:", error);
                throw error;
            }
        },
        async changePassword(userId: string, currentPassword: string, newPassword: string) {
            try {
                await useFetchApi(`/api/auth/password/${userId}`, {
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
                if (!userId) {
                    return;
                }
                const response = await $fetch(` /api/user/saved/${userId}`);
                this.$patch({savedProducts: response as Favorite[]});
            } catch (error) {
                console.error("Error getting favorites:", error);
                throw error;
            }
        },
        async setCart(userId: string, productId: string, count: number, color: any, price: number) {
            try {
                const response: CartItem = await $fetch(`/api/user/cart/${userId}`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: {productId, count, color, price},
                }).then(async () => {
                    await this.getCarts(this.userGetter.id);
                });
                console.log(response);
            } catch (error) {
                console.error("Error setting cart:", error);
                throw error;
            }
        },
        async getCarts(userId: string) {
            try {
                if (!userId) {
                    return;
                }
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
        async deleteAllCartItemsOnUser(userId: string) {
            try {
                await $fetch(`/api/user/cart/${userId}`, {
                    method: 'DELETE',
                });
                this.$patch({cart: defaultValue.cart});
            } catch (error) {
                console.error("Error deleting all cart items:", error);
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
        async createOrder(order: Order) {
            try {
                const response = await useFetchApi('/api/order', {
                    method: 'POST',
                    body: order,
                });
                this.$patch({orders: response});
            } catch (error) {
                console.error('Error creating order:', error);
                throw error;
            }
        },
        async getOrders() {
            try {
                const response = await useFetchApi('/api/order');
                this.$patch({orders: response});
            } catch (error) {
                console.error('Error getting orders:', error);
                throw error;
            }
        },
        async getOrderByUserId(userId: string) {
            try {
                const response = await useFetchApi(`/api/order/${userId}`);
                this.$patch({orders: response});
            } catch (error) {
                console.error('Error getting order by id:', error);
                throw error;
            }
        },
        async deleteOrderItem(itemId: string) {
            try {
                return await useFetchApi(`/api/order/${itemId}`, {
                    method: 'DELETE',
                });
            } catch (error) {
                console.error('Error deleting order item:', error);
                throw error;
            }
        },
        async getAllUsers() {
            try {
                const response = await useFetchApi('/api/user');
                this.$patch({users: response});
            } catch (error) {
                console.error('Error getting all users:', error);
                throw error;
            }
        },
        async changeOrder(orderItem: OrderItem) {
            try {
                return await useFetchApi(`/api/order/${orderItem.id}`, {
                    method: 'PUT',
                    body: orderItem,
                });
            } catch (error) {
                console.error('Error changing order:', error);
                throw error;
            }
        }
    },
});
