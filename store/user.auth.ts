interface User {
    id: string;
    name: string;
    phone: string;
    email: string;
    password: string;
    accessToken: string;
}

const defaultValue: { user: User } = {
    user: {
        id: "",
        name: "",
        phone: "",
        email: "",
        password: "",
        accessToken: "",
    }
}
export const useUserStore = defineStore("user", {
    state: () => '',
    actions: {}
})