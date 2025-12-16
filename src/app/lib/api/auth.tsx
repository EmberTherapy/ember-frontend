export async function authenticateUser(email: string, password: string) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { status: true, token: "fake-jwt-token" };
}

export async function createUser(email: string, password: string, firstName: string, lastName: string) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { status: true };
}