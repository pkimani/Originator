import React from 'react';
import 'tailwindcss/tailwind.css'; // Ensure this is imported to apply Tailwind styles
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export default function Home() {
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    const client = new ApolloClient({
      uri: '/graphql', // Assuming GraphQL endpoint is served from the same origin
      cache: new InMemoryCache(),
    });

    client
      .query({
        query: gql`
          query {
            hello
          }
        `,
      })
      .then((result) => {
        setMessage(result.data.hello);
      });
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-blue-500">
      <p className="text-3xl text-white">{message}</p>
    </div>
  );
}
