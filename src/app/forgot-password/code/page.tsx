import ForgetPasswordCode from '@/src/components/auth/ForgetPasswordCode';
import React, { Suspense } from 'react'

const CodeFromPassword = () => {
  return (

        <Suspense fallback={null}>
      <ForgetPasswordCode />
    </Suspense>
  );
  
}

export default CodeFromPassword