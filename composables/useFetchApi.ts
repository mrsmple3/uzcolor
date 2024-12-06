export default async (url, options = {}) => {
    const {useAuthToken} = useAuth();

    return await $fetch(url, {
        ...options, headers: {...options.headers, Authorization: `Bearer${useAuthToken().value}`}
    })
}