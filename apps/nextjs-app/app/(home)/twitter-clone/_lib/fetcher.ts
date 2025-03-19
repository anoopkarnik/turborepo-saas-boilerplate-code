import axios from 'axios';

const fetcher = async (url: string) =>{
    const { data } = await axios.get(url);
    console.log('data', data)
    return data;
}

export default fetcher;