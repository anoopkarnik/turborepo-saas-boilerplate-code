import axios from 'axios';

const fetcher = async (url: string) =>{
    const { data } = await axios.get(url);
    return data;
}

export default fetcher;