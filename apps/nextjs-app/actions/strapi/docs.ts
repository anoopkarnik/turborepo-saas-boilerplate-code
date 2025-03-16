"use server"

import axios from 'axios';

export const getDocCategories = async () => {
    try{
        const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL + "/api/" || "http://localhost:1337/api/";
        const database = "doc-categories?sort=order";
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
  
  export const getDocs = async () => {
    try{
        const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL + "/api/" || "http://localhost:1337/api/";
        const database = "docs?filters[project]=company-landing-page&populate[category]=true&sort=order";
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
  
  export const getDocPost = async (slug:string) => {
    try{
      const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL + "/api/" || "http://localhost:1337/api/";
      const database = `docs?filters[slug][$eq]=${slug}&populate[blocks]=true`;
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