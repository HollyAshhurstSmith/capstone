import { createContext, useEffect, useReducer } from "react";
import { Snackbar, Alert } from "@mui/material";

export const ToastrContext = createContext();

function reducer(state, action) {

  if (action.type === "showToastr") {
    return action.payload;
  } else if ((action.type === "hideToastr")) {
    return { ...state, isOpen: false };
  }
  return state;
}
export const ToastrProvider = (props) => {
  const [toastr, dispatch] = useReducer(reducer, {
    isOpen: false,
    message: null,
    severity: null,
  });
  const onToastrClose = () => {
    dispatch({ type: "hideToastr" });
  };

  return (
    <ToastrContext.Provider value={{ toastr, toastrDispatch: dispatch }}>
      {props.children}
      <Snackbar
        open={toastr.isOpen}
        autoHideDuration={3000}
        onClose={() => onToastrClose()}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => onToastrClose()}
          severity={toastr.severity}
          sx={{ width: "100%" }}
        >
          {toastr.message}
        </Alert>
      </Snackbar>
    </ToastrContext.Provider>
  );
};