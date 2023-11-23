import { instance } from '@/modules/axios';

// Function for login user endpoint
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
    console.log('RESPONSE ==>', response);
    return response.data;
  } catch (error) {
    console.log('ERROR IN FETCH ==>', error);
    if (error.response.status === 401) {
      throw new Error('Email atau kata sandi salah!');
    }
    throw new Error('Internal server error!');
  }
}

export { loginUser };
