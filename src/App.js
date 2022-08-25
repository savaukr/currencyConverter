import styles from "./App.module.css";

import Converter from "./components/converter/converter.tsx";

function App() {
  return (
    <div className={styles.App}>
      <Converter />
    </div>
  );
}

export default App;
