import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { ERRORS_MESSAGE } from "@/lib/constants";

type ErrorMessage = keyof typeof ERRORS_MESSAGE;

export const useError = () => {
  const [error, setError] = useState<ErrorMessage | null>(null);

  const setErrorMessage = (message: ErrorMessage) => {
    setError(message);
  };

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Ocurrio un error",
        text: ERRORS_MESSAGE[error],
        confirmButtonText: "Aceptar"
      }).finally(() => setError(null));
    }
  }, [error]);

  return setErrorMessage;
};
