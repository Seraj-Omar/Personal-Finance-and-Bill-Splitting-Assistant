import CodeFromPass from '@/src/modules/auth/pages/CodeFromPassword'
import React, { Suspense } from 'react'

const CodeFromPassword = () => {
  return (

        <Suspense fallback={null}>
      <CodeFromPass />
    </Suspense>
  );
  
}

export default CodeFromPassword