import { IDisease } from '../types/disease.ts';
import instance from '../utils/axios.ts';

const getDisease = async (str: string): Promise<IDisease[] | undefined> => {
  try {
    const { data } = await instance.get(`/api/v1/search-conditions/?name=${str}`);

    console.log('data', data);
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export default getDisease;
