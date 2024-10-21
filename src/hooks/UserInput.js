import { useState } from "react";

function useUserInput(initialState = {}) {
  const [userInput, setUserInput] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const resetUserInput = () => {
    setUserInput(initialState);
  };

  return {
    userInput,
    handleInputChange,
    resetUserInput,
    setUserInput,
  };
}
export default useUserInput;
