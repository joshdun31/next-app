import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
     <div></div>
  )
}

export async function getStaticProps() {
  return {
    redirect:{
      destination:'/en',
      permanent:true
    }
  }
}
