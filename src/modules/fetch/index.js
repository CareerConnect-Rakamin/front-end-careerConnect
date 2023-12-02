import { instance } from '@/modules/axios';

async function loginUser(email, password) {
  try {
    const response = await instance.post(
      '/auth/login',
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error('Email atau kata sandi salah!');
    }
    throw new Error('Internal server error!');
  }
}

// Function for register user endpoint
async function registerJobSeeker({
  email,
  password,
  full_name,
  gender,
  phone_number,
  address,
  place_of_birth,
  date_of_birth
}) {
  try {
    const response = await instance.post(
      '/auth/register/jobseeker',
      {
        email,
        password,
        full_name,
        gender,
        phone_number,
        address,
        place_of_birth,
        date_of_birth
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error('Email atau kata sandi salah!');
    }
    throw new Error('Internal server error!');
  }
}

// Function for register user endpoint
async function registerCompany({
  email,
  password,
  name,
  type,
  address,
  phoneNumber,
  website,
  companyEmail
}) {
  try {
    const response = await instance.post(
      '/auth/register/company',
      {
        email,
        password,
        name,
        type,
        address,
        phoneNumber,
        website,
        companyEmail
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error('Email atau kata sandi salah!');
    }
    throw new Error('Internal server error!');
  }
}

async function getJobs(page, jobType) {
  try {
    let url = `/jobs?page=${page}`;

    if (jobType) {
      url += `&job_type=${jobType}`;
    }

    const response = await instance.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
  }
}

async function searchJobs(page, keyword) {
  try {
    const response = await instance.get(`jobs?page=${page}&keyword=${keyword}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function getPhotoProfileJobSeeker(id) {
  try {
    const response = await instance.get(`/jobseekers/${id}`);
    return response.data.data.dataProfile.photo_profile;
  } catch (err) {
    console.log(err);
  }
}

async function getCompanies(page) {
  try {
    const response = await instance.get(`/companies?page=${page}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function getPhotoProfileCompany(id) {
  try {
    const response = await instance.get(`/companies/${id}`);
    return response.data.data.photo_profile;
  } catch (err) {
    console.log(err);
  }
}

async function getPhotoProfile(id, role) {
  try {
    if (role == 'jobseeker') {
      const photo = await getPhotoProfileJobSeeker(id);
      return photo;
    } else {
      const photo = await getPhotoProfileCompany(id);
      return photo;
    }
  } catch (err) {
    console.log(err);
  }
}

async function createApply(id) {
  try {
    const response = await instance.post(`/apply/job/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function searchCompanies(page, keyword) {
  try {
    const response = await instance.get(
      `companies?page=${page}&keyword=${keyword}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function getJobById(id) {
  try {
    const response = await instance.get(`/jobs/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function getUserById() {
  try {
    const response = await instance.get(`/users`);
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error(error.response.status);
    }
    throw new Error('Internal server error!');
  }
}

async function getApply(id) {
  try {
    const response = await instance.get(`/apply/seeker/job/${id}`);
    return response.data;
  } catch (error) {
    if (error.response.status === 404) {
      throw 'Belum ada apply di job ini';
    }
    throw new Error('Internal server error!');
  }
}

async function cancelApply(id) {
  try {
    const response = await instance.put(`/apply/seeker/job/${id}`, {
      status: 'cancel'
    });
    return response.data;
  } catch (error) {
    throw new Error('Internal server error!');
  }
}

const GetProfileById = async (id) => {
  try {
    const response = await instance.get(`/jobseekers/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
};

const UpdateProfile = async (
  email,
  full_name,
  bio,
  gender,
  phone_number,
  address,
  place_of_birth,
  date_of_birth,
  link_portfolio,
  on_work
) => {
  try {
    const response = await instance.put(`/jobseekers`, {
      email,
      full_name,
      bio,
      gender,
      phone_number,
      address,
      place_of_birth,
      date_of_birth,
      link_portfolio,
      on_work
    });
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
    });
    return response.data;
  } catch (error) {
    console.error('Error in Upload certificates:', error);
    throw new Error(error.response?.data?.message || 'Something went wrong');
  }
};

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
  loginUser,
  registerJobSeeker,
  registerCompany,
  getJobs,
  searchJobs,
  getPhotoProfile,
  getCompanies,
  searchCompanies,
  createApply,
  getJobById,
  getUserById,
  getApply,
  cancelApply,
  GetProfileById,
  UploadCV,
  GetApplyJobs,
  UpdatePhoto,
  DeleteCV,
  UploadSertif,
  DeleteSertif,
  UpdateProfile
};
