export const useAuth = () => {
    const token = localStorage.getItem("token");

    console.log(token);
    
    return { isAuthorized: !!token, token };
};