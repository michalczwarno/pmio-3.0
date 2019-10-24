import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
// import { useFirestore } from "react-redux-firebase";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    margin: "2rem",
    border: "1px solid grey"
  }
};

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

function Company({ id }) {
  const company = useSelector(state => state.firestore.data.companies[id]);
  const classes = useStyles();
  // TODO: implement deletion
  // const firestore = useFirestore();

  function deleteCompany() {
    console.log("Delete company");
    // return firestore.remove(`companies/${id}`);
  }

  return (
    <li className="Todo" style={styles.container}>
      {company.company || company.name} {company.ownerEmail}
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteIcon />}
        onClick={deleteCompany}
      >
        Delete
      </Button>
    </li>
  );
}

Company.propTypes = {
  id: PropTypes.string.isRequired
};

export default Company;
