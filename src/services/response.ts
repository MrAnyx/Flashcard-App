import { AxiosResponse } from "axios";

export const isSuccessful = (response: AxiosResponse) => {
    return response.status < 400;
};

export const isFailed = (response: AxiosResponse) => {
    return !isSuccessful(response);
};
