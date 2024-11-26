export const userTransformer = (user: any) => {
    return {
        id: user.id,
        username: user.name,
        email: user.email,
        phone: user.phone,
    }
}