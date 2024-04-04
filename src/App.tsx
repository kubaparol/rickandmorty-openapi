import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CharactersContainer } from "./containers/CharactersContainer";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CharactersContainer />
    </QueryClientProvider>
  );
}

export default App;
