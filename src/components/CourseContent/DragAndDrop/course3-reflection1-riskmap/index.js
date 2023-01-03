import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Container from "./Container";
import CustomDragLayer from "./CustomDragLayer";

export default function RiskMap() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <Container />
        <CustomDragLayer />
      </div>
    </DndProvider>
  );
};
