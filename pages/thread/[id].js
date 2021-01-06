import React from 'react'
import * as Constants from '../../constants'
import { useRouter } from 'next/router'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import ErrorPage from "next/error"

export default function ThreadView({ thread }) {

  const router = useRouter()
  const { id } = router.query

  if (thread.error_code == "GQLServerError") {
    return <p>Failed to load data!</p>
    //return <ErrorPage statusCode={500} /> Use this if you want to display the 500 page
  }

  if (thread.error_code == "NotFound") {
    return <ErrorPage statusCode={404} />
  }

  return (
    <ul>
        <li>
          <ul key={thread.id}>
          <li>
            <h1>title: {thread.title}</h1>
            <h1>content: {thread.content}</h1>
          </li>
        </ul>
        </li>
    </ul>
  )
}


export async function getServerSideProps({ query, res }) {
  const client = new ApolloClient({
    uri: Constants.GRAPH_API_URL,
    cache: new InMemoryCache()
  });

  const id = query.id

  // Fetch data from external API
  try{
  const { data } = await client.query({
    query: gql`query GetThread {thread(id: ${id}) {title content}}`
  });

  // Pass data to the page via props
  return { props: { 
    thread: data.thread
   } }
  } catch (error) {
    if (error.message == "Thread matching query does not exist." ) {
      return { props: { 
        thread: { error_code: "NotFound" }
      } }
    }
    else { // (res.statusCode !== 200) {
      console.error(error);
      return { props: { 
       thread: { error_code: "GQLServerError" }
      } }
    }
  }
}