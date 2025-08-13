const { VITE_API_ENDPOINT } = import.meta.env;

export const validation = async (token: string): Promise<boolean> => {
    const response = await fetch(`${VITE_API_ENDPOINT}/auth/validation`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({token})
    });
    const { data, status } = await response.json();
    const { success } = data;

    if(status !== 200 || success !== true) {
        console.error("Authentication was a failed...");
        return false;
    }

    return true;
}