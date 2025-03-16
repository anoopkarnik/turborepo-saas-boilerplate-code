"use server"

import axios from 'axios';

export const getBlogs = async () => {
    try{
        const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL + "/api/" || "http://localhost:1337/api/";
        const database = "articles?populate[categories]=true&populate[author]=true&populate[cover]=true";
        const url = `${baseUrl}${database}`;
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url,
            headers: { 
              'Authorization': `Bearer ${process.env.STRAPI_TOKEN ?? ""}`
            }
          };
          const response  = await axios.request(config);
          const result = await response.data;
          return result.data;
    }
    catch(e){
        console.log(e);
        return null;
    }
  } 
  
  export const getBlogPost = async (slug:string) => {
    try{
      const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL + "/api/" || "http://localhost:1337/api/";
      const database = `articles?filters[slug][$eq]=${slug}&populate[blocks]=true&populate[categories]=true&populate[author]=true&populate[cover]=true`;
      const url = `${baseUrl}${database}`;
      const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url,
          headers: { 
            'Authorization': `Bearer ${process.env.STRAPI_TOKEN ?? ""}`
          }
        };
        const response  = await axios.request(config);
        const result = await response.data;
        return result.data;
  }
  catch(e){
      console.log(e);
      return null;
  }
  }
  