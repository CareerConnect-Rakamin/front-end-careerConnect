import { instance } from '@/modules/axios';

const GetProfileById = async (id) => {
  try {
    const response = await instance.get(`/jobseekers/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
};

const UploadCV = async (formData) => {
  try {
    const response = await instance.put(`/jobseekers/profile/cv`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
};

const DeleteCV = async () => {
  try {
    const response = await instance.delete(`/jobseekers/profile/cv`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
};

const GetApplyJobs = async () => {
  try {
    const response = await instance.get(`/apply/seeker`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
};

const UpdatePhoto = async (formData) => {
  try {
    const response = await instance.put(`/photo`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    if (!response.data) {
      throw new Error('No data returned from the server');
    }

    return response.data;
  } catch (error) {
    console.error('Error in UploadPhoto:', error);
    throw new Error(error.response?.data?.message || 'Something went wrong');
  }
};



const UploadSertif = async (formData) => {
  try {
    const response = await instance.post(`/jobseekers/certificates`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data;
  } catch(error) {
    console.error('Error in Upload certificates:', error);
    throw new Error(error.response?.data?.message || 'Something went wrong');
  }
}



const DeleteSertif = async (id) => {
  try {
    const response = await instance.delete(`/jobseekers/certificates/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in Delete Certificates:', error);
    throw new Error(error.response?.data?.message || 'Something went wrong');
  }
};

export {
  GetProfileById,
  UploadCV,
  GetApplyJobs,
  UpdatePhoto,
  DeleteCV,
  UploadSertif,
  DeleteSertif
};
