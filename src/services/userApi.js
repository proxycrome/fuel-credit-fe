import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


const data = JSON.parse(localStorage.getItem("data"))

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({baseUrl: "https://dev.myfuelcredit.com/api/v1/"}),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: formData => ({
                url: '/register',
                method: 'POST',
                body: formData 
            })
        }),
        loginUser: builder.mutation({
            query: formData => ({
                url: '/login',
                method: 'POST',
                body: formData
            })
        }),
        getUserDetails: builder.query({
            query: (id) => ({
                url: `/user/${id}/dashboard`,
                headers: {
                    'authorization': `${data.token_type} ${data.access_token}`
                }
            })
        })
    })
})

export const {
    useRegisterUserMutation, useLoginUserMutation, useGetUserDetailsQuery
} = userApi