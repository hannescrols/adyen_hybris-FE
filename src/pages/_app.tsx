import * as React from 'react'
import '../index.css'

interface MyAppProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageProps: any
}

function MyApp({ Component, pageProps }: MyAppProps): React.ReactElement {
    if (pageProps.template === 'empty') {
      return <Component {...pageProps} />
    } else {
      return <BaseAppWrapper pageProps={pageProps} Component={Component} />
    }
  }

  function BaseAppWrapper({
    Component,
    pageProps,
  }: MyAppProps): React.JSX.Element {
    return (
        <Component {...pageProps} />
    )
  }

export default MyApp