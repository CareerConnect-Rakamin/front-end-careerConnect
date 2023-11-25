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
    console.log('RESPONSE IN FETCH ==>', response);
    return response.data;
  } catch (error) {
    console.log('ERROR IN FETCH ==>', error);
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
    console.log('RESPONSE IN FETCH ==>', response);
    return response.data;
  } catch (error) {
    console.log('ERROR IN FETCH ==>', error);
    if (error.response.status === 401) {
      throw new Error('Email atau kata sandi salah!');
    }
    throw new Error('Internal server error!');
  }
}

async function getJobs(page) {
  try {
    const response = await instance.get(`/jobs?page=${page}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function searchJobs(keyword) {
  try {
    const response = await instance.get(`/jobs?keyword=${keyword}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export { loginUser, registerJobSeeker, registerCompany, getJobs, searchJobs };
