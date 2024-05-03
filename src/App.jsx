import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import Switcher from "./components/Switcher";

function App() {
  return (
    <div className="w-full bg-g-secondary  dark:bg-accent">
      <Switcher />
      <h1 className="text-rokh text-s-13 dark:text-white">فروشگاه اثار هنری</h1>
      <div>
        <FontAwesomeIcon icon={faCoffee} className="dark:text-white"/>
      </div>
    </div>
  );
}

export default App;
