import Calendar from '../components/Calendar'
import { type NextPage } from 'next'
import Head from 'next/head'


const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Booking Software</title>
        <meta name='description' content='by drake' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Calendar />
      </main>
    </>
  )
}

export default Home