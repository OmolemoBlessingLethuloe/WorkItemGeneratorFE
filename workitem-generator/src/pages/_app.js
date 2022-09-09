import "../../styles/globals.css";
import { PersonProvider } from "../providers/persons";
import { PersonProjectProvider } from "../providers/personsProjects";

function MyApp({ Component, pageProps }) {
  return (
    <PersonProvider>
      <PersonProjectProvider>
        <Component {...pageProps} />;
      </PersonProjectProvider>
    </PersonProvider>
  );
}

export default MyApp;
