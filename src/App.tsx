import { useState } from "react";
import "./App.css";

function App() {
  interface IList {
    listName?: string;
    subLists?: Array<IList>;
    id: number;
  }

  const getId = (): number => {
    return Date.now();
  };

  const setName = (): string => {
    const result = prompt("Enter the name", "name");
    return result || "";
  };

  const [state, setState] = useState<Array<IList>>([
    { listName: "Categories", subLists: [], id: getId() },
  ]);

  const iterateArray = (array: Array<IList>, name: string, id: number): any => {
    //TODO any
    for (let i = 0; i < array.length; i++) {
      const element = array[i];

      if (element.id === id) {
        element.subLists = element.subLists || [];
        element.subLists.push({ listName: name, id: getId() });
        return element;
      } else {
        element.subLists && iterateArray(element.subLists, name, id);
      }
    }
  };

  const addList = (name: string, id: number) => {
    const arr: any = state.map((i) => {
      //TODO any
      const target = i.subLists;

      if (i.id === id) {
        target && target.push({ listName: name, id: getId() });
      } else {
        target && iterateArray(target, name, id);
      }
      return i;
    });
    return setState(arr);
  };

  const renderSubLists = (array: Array<IList>): any => {
    //TODO any
    return array.map((i, index) => {
      return (
        <ul key={index}>
          <li>{i.listName}</li>
          <button onClick={() => addList(setName(), i.id)}>Add</button>
          {i.subLists && renderSubLists(i.subLists)}
        </ul>
      );
    });
  };

  return (
    <div className="App">
      {state.map((i, index) => {
        return (
          <ul key={index}>
            <li>
              <h1>{i.listName}</h1>
            </li>
            <button onClick={() => addList(setName(), i.id)}>Add</button>
            {i.subLists && renderSubLists(i.subLists)}
          </ul>
        );
      })}
    </div>
  );
}

export default App;
