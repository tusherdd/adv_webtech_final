import { useContext } from "react";
import { StudentContext } from "./StudentContext";

function useStudent() {
  const context = useContext(StudentContext);

  if (!context) {
    throw new Error(
      "useStudent must be used inside StudentProvider"
    );
  }

  return context;
}

export default useStudent;