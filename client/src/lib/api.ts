interface Query<TVariable> {
  query: string;
  variables?: TVariable;
}

const fetchData = async <T = any, TVariable = any>(query: Query<TVariable>) => {
  const response = await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(query)
  });

  return response.json() as Promise<T>;
};

export default fetchData;
