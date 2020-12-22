import React from 'react'
import * as Constants from '../../constants'
import { useRouter } from 'next/router'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export default function ThreadView({ thread }) {

  const router = useRouter()
  const { id } = router.query

  return (
    <ul>
        <li>
          <ul key={thread.id}>
          <li>
            <h1>title: {thread.title}</h1>
          </li>
        </ul>
        </li>
    </ul>
  )
}


export async function getServerSideProps({ query }) {
  const client = new ApolloClient({
    uri: Constants.GRAPH_API_URL,
    cache: new InMemoryCache()
  });

  const id = query.id

  // Fetch data from external API

  const { data } = await client.query({
    query: gql`query GetThread {thread(id: ${id}) {title content}}`
  });

  // Pass data to the page via props
  return { props: { 
    thread: data.thread
   } }
}