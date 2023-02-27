import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { PaginationResponse } from "../models/pagination";
import { router } from "../router/Routes";
import { store } from "../store/configureStore";

const sleep = () => new Promise(resolve=> setTimeout(resolve, 500));

axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.withCredentials=true;

const responseBody = (response:AxiosResponse)=>response.data;

axios.interceptors.request.use(config=>{
    const token = store.getState().account.user?.token;
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response=>{
    await sleep();
    const pagination = response.headers['pagination'];
    if(pagination) {
        response.data = new PaginationResponse(response.data, JSON.parse(pagination));
        return response;
    }
    return response
}, (error:AxiosError)=>{
    const {data, status} = error.response as any;
    switch (status) {
        case 400:
            if(data.errors)
            {
                const modelStateErrors: string[]=[];
                for(const key in data.errors)
                {
                    if(data.errors[key]) {
                        console.log("suresh6");
                        modelStateErrors.push(data.errors[key])
                    }
                }
                console.log("suresh5");
                throw modelStateErrors.flat();
            }
            console.log("suresh0");
            toast.error(data.title);
            break;
        case 401:
            console.log("suresh1");
            toast.error(data.title);
            break;
        case 404:
            console.log("suresh2");
            toast.error(data.title);
            break;
        case 500:
            router.navigate('/server-error', {state: {error: data}})
            break;                 
        default:
            break;
    }
    console.log("Cought by interseptor")
    return Promise.reject(error.response);
})

const requests = {
    get:(url:string, params?:URLSearchParams) => axios.get(url,{params}).then(responseBody),
    post:(url:string, body:{}) => axios.post(url, body).then(responseBody),
    put:(url:string, body:{}) => axios.put(url,body).then(responseBody),
    delete:(url:string) => axios.delete(url).then(responseBody),
}

const Catalog = {
    list:(params:URLSearchParams)=>requests.get('products', params),
    details:(id:number)=>requests.get(`products/${id}`),
    fetchFilters:()=>requests.get('products/filters')
}

const testErrors = {
    get400Error: ()=>requests.get('buggy/bad-request'),
    get401Error: ()=>requests.get('buggy/unauthorized'),
    get404Error: ()=>requests.get('buggy/not-found'),
    get500Error: ()=>requests.get('buggy/server-error'),
    getValidationError: ()=>requests.get('buggy/validation-error'),
}

const Basket = {
    get:() => requests.get('basket'),
    addItem:(productId:number, quantity = 1)=>requests.post(`basket?productId=${productId}&quantity=${quantity}`,{}),
    removeItem:(productId:number, quantity = 1)=>requests.delete(`basket?productId=${productId}&quantity=${quantity}`)
}

const Account = {
    login: (values:any) => requests.post('Account/login', values),
    register: (values:any) => requests.post('Account/register', values),
    currentUser: () => requests.get('Account/currentUser'),
    fetchAddress: () => requests.get('Account/savedAddress')
}

const Orders = {
    list: () => requests.get('order'),
    fetch: (id:number) => requests.get(`order/${id}`),
    create: (values:any) => requests.post('order',values),
}

const agent = {
    Catalog,
    testErrors,
    Basket,
    Account,
    Orders
}

export default agent;