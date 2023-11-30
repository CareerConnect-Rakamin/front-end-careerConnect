import { Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import UpdateDataSeekers from '@/components/FormUpdateSeekers';

const EditDataProfile = () => {
  return (
    <>
    <UpdateDataSeekers/>
    </>
  );
};

export default EditDataProfile;
