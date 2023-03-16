import { useState } from "react";
import Draggable, { DraggableData } from "react-draggable";
import styles from "../styles/Home.module.css";

interface Position {
  id: number;
  x: number;
  y: number;
}

export default function App() {
  const [positionList, setPositionList] = useState<Position[]>([
    { id: 0, x: 0, y: 0 },
    { id: 1, x: 100, y: 100 },
    { id: 2, x: 200, y: 200 },
    { id: 3, x: 300, y: 3 },
    { id: 6, x: 666, y: 965 },
    { id: 7, x: 143, y: 568 },
    { id: 8, x: 153, y: 123 },
    { id: 9, x: 1120, y: 213 },
  ]);

  const isMypage = true;

  const trackEnd = (id: number, { lastX: x, lastY: y }: DraggableData) => {
    if (isMypage) {
      setPositionList((prev) => [
        { id, x, y },
        ...prev.filter((data) => data.id !== id),
      ]);
    }
  };

  return (
    <div className={styles.wrapper}>
      {positionList.map((position) => (
        <Draggable
          bounds="parent"
          key={position.id}
          defaultPosition={{ x: position.x, y: position.y }}
          onStop={(_, data) => trackEnd(position.id, data)}
          cancel={isMypage ? undefined : "*"}
        >
          <div className={styles.box} id={position.id.toString()}>
            <div>BOX</div>
            <div>
              x: {position.x}, y: {position.y}
            </div>
          </div>
        </Draggable>
      ))}
    </div>
  );
}
