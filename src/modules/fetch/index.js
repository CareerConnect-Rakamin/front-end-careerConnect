import { instance } from '@/modules/axios';

const GetProfileById = async (id) => {
  try {
    const response = await instance.get(`/jobseekers/${id}`)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
};

const UploadCV = async (cv_path) => {
  try {
    const response = await instance.post(`/jobseekers/profile/cv`, cv_path)
    return response.data
  } catch(error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

export { GetProfileById, UploadCV }
