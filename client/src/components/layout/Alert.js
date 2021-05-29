import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function ShowAlert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Alert() {
  const alertContext = useContext(AlertContext);

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => {
      return (
        <Snackbar
          open={true}
          key={alert.id}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <ShowAlert severity="error">{alert.msg}</ShowAlert>
        </Snackbar>
        // <div key={alert.id} className={`alert alert-${alert.type}`}>
        //     <i className="fas fa-info-circle" /> { alert.msg}
        // </div>
      );
    })
  );
}

// const Alert = () => {

//     return (
//         alertContext.alerts.length > 0 && alertContext.alerts.map(alert => {
//             return (
//                 <div key={alert.id} className={`alert alert-${alert.type}`}>
//                     <i className="fas fa-info-circle" /> { alert.msg}
//                 </div>
//             )
//         })
//     )
// }
