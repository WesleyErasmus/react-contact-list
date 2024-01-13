import useFetchData from "./utils/useFetchData"

function App() {
  const { data } = useFetchData();

  return (
    <div>
      {data ? <p>{JSON.stringify(data, null, 1)}</p> : <p>Loading data...</p>}
    </div>
  );
}

export default App
