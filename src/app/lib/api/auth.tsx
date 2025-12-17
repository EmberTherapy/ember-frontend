const base_api_url = "http://localhost:5000/";

export async function authenticateUser(email: string, password: string) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { status: true, token: "fake-jwt-token" };
}

export async function createUser(email: string, password: string, firstName: string, lastName: string) {
    // await new Promise((resolve) => setTimeout(resolve, 500));
    // return { status: true };
    const jsonBody = {
        email: email,
        passkey: password,
        first_name: firstName,
        last_name: lastName
    };

    fetch(base_api_url + "api/create_user", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonBody),
    })
    .then(response => response.json())
    .then(data => {
        if (data.status == "success") {
            console.log('Success:', data);
            return { status: true };

        } else {
            console.log('Failed:', data);
            return { status: false };
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        return { status: false };
    });
}
