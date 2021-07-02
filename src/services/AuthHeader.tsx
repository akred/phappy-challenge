import React from "react";
import { useJwt } from "react-jwt";
const token = "Your JWT";

const AuthHeader = () => {

    const TOKEN = localStorage.getItem('TOKEN') || '';
    const { decodedToken, isExpired, reEvaluateToken } = useJwt(token);

    if (isExpired) {
        const newToken = "A new JWT";
        return reEvaluateToken(newToken);
    } else {
        return { Authorization: 'Bearer ' + TOKEN };
    }
};

export default AuthHeader;
