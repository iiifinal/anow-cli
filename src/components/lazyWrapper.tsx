import React, { FC, lazy, Suspense } from 'react'

interface lazyWrapperProps {
  path: string
}

const lazyWrapper: FC<lazyWrapperProps> = ({ path }) => {
  const LazyCompnent = lazy(() => import(`@/components/${path}`))
  return (
    <Suspense fallback={<div>loading</div>}>
      <LazyCompnent />
    </Suspense>
  )
}

export default lazyWrapper
