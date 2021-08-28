interface Query<TVariable> {
  query: string;
  variables?: TVariable;
}
interface Error {
  message: string;
}

const fetchData = async <T = any, TVariable = any>(query: Query<TVariable>) => {
  const response = await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(query)
  });

  if (!response.ok) {
    throw new Error('Failed to fetch from the server');
  }

  return response.json() as Promise<{ data: T; errors: Error[] }>;
};

export default fetchData;
