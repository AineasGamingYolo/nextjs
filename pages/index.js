import React from 'react'
import * as Constants from '../constants'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import ErrorPage from "next/error"

export default function Home({ threads }) {

  if (threads.error_code == "GQLServerError") {
    return <p>Failed to load data!</p>
    //return <ErrorPage statusCode={500} /> Use this if you want to display the 500 page
  }

  return (
    <div>
      <h1>The Worst Design</h1>
      <ul>
      {threads.map(thread => {
        return (
        <li key={thread.id}>  
        <Link href="/thread/[id]" as={`/thread/${thread.id}`}>
          <a>{ thread.title }</a>
        </Link>
        </li>
    );
  })}
      </ul>
    </div>
  );


}


export async function getServerSideProps({ id, res }) {
  const client = new ApolloClient({
    uri: Constants.GRAPH_API_URL,
    cache: new InMemoryCache()
  });

  try {
  // Fetch data from external API
  
  const { data } = await client.query ({
    query: gql`query getThreads { threads{ id title content slug threadAuthor{username} comments { id commentAuthor content}}}`
  });

  // Pass data to the page via props
  return { props: { 
    threads: data.threads
   }
  }
  } catch (error) {
    console.error(error);
      return { props: { 
       threads: { error_code: "GQLServerError" }
      } }
  }
}
