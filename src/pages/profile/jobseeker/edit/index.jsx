import { Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import UpdateDataSeekers from '@/components/FormUpdateSeekers';
import { validateToken } from '@/hooks/tokenValidation';
import { GetProfileById } from '@/modules/fetch';
import Head from 'next/head';

const EditDataProfile = () => {
  const [dataProfile, setDataProfile] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    const catchId = async () => {
      const result = validateToken();
      const { id, role } = result;
      setId(id);
    };
    const catchDataProfile = async () => {
      if (id) {
        try {
          const response = await GetProfileById(id);
          setDataProfile(response.data.dataProfile);
        } catch (error) {
          console.log(error);
        }
      }
    };
    catchId();
    catchDataProfile();
  }, [id]);

  return (
    <>
      <Head>
        <title>Edit Profile Jobseeker</title>
      </Head>
      <UpdateDataSeekers dataProfile={dataProfile} />
    </>
  );
};

export default EditDataProfile;
