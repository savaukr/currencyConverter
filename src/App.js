import styles from "./App.module.css";

import Currency from "./components/currency/currency.tsx";

function App() {
  return (
    <div className={styles.App}>
      <Currency />
    </div>
  );
}

export default App;
