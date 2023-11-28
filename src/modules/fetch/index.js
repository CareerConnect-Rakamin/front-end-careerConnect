import { instance } from '../axios/index';

async function getCompanyById(id) {
  try {
    const response = await instance.get(`/companies/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}
async function getCompanyJobs(id) {
  try {
    const response = await instance.get(`/jobs/company/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}
async function getJobById(id) {
  try {
    const response = await instance.get(`/jobs/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

async function getApllicants(id) {
  try {
    const response = await instance.get(`/apply/job/${id}`);
    return response.data;
  } catch (error) {
    return;
  }
}

async function updateJob(
  id,
  {
    name,
    description,
    what_will_you_do,
    what_will_you_need,
    location,
    category,
    job_type,
    salary,
    capacity,
    is_open
  }
) {
  console.log(
    id,
    name,
    description,
    what_will_you_do,
    what_will_you_need,
    location,
    category,
    job_type,
    salary,
    capacity,
    is_open
  );
  try {
    const response = await instance.put(`/jobs/${id}`, {
      name,
      description,
      what_will_you_do,
      what_will_you_need,
      location,
      category,
      job_type,
      salary,
      capacity,
      is_open
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

async function updateStatusApplicants(id, status, seekerId) {
  try {
    const response = await instance.put(`/apply/company/job/${id}`, {
      status,
      seekerId
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

async function editCompany(
  id,
  email,
  password,
  name,
  type,
  description,
  website,
  email_company,
  phone_number,
  address
) {
  try {
    const response = await instance.put(`/companies/${id}`, {
      email,
      password,
      name,
      type,
      description,
      email_company,
      website,
      phone_number,
      address
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

async function UpdatePhoto(formData) {
  try {
    const response = await instance.put(`/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

export {
  getCompanyById,
  getCompanyJobs,
  editCompany,
  UpdatePhoto,
  getJobById,
  getApllicants,
  updateStatusApplicants,
  updateJob
};
