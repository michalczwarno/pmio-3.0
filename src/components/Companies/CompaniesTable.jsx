import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import Table from "material-table";
import Spinner from "../Spinner";
import Details from "./Details";

const companiesQuery = {
  collection: "companies",
  where: [
    ["ownerEmail", "==", "michal.czwarno@powermap.io"]
    // ["isModel", "==", true]
  ],
  orderBy: ["timeLastUpdatedAt", "desc"],
  limit: 150
};

function Companies() {
  // Attach todos listener
  const [open, setOpen] = React.useState(false);
  const handleDetailsClose = () => {
    setOpen(!open);
  };
  useFirestoreConnect(() => [companiesQuery]);

  // Get todos from redux state
  const companies = useSelector(state => state.firestore.ordered.companies);

  // Show a message while todos are loading
  if (!isLoaded(companies)) {
    // TODO: place spinner in the middle of the page, rather then top right corner
    return <Spinner />; // return "Loading";
  }

  // Show a message if there are no todos
  if (isEmpty(companies)) {
    return "Company list is empty";
  }

  console.debug(companies[11]);
  const columns = [
    {
      title: "Logo",
      export: false,
      field: "logo",
      render: rowData => (
        <img
          src={rowData.logo}
          alt="logo"
          style={{ width: 40, borderRadius: "50%" }}
        />
      )
    },
    { title: "Company", field: "company" },
    { title: "LoB", field: "division" },
    { title: "People", field: "peopleCount" },
    { title: "Owner", field: "ownerEmail" },
    {
      title: "Last Modified",
      field: "timeLastUpdatedAt",
      type: "datetime",
      render: rowData => (
        <div>{new Date(rowData.timeLastUpdatedAt).toLocaleDateString()}</div>
      ),
      export: false
    }
  ];

  return (
    <React.Fragment>
      <Details
        open={open}
        onSave={handleDetailsClose}
        onCancel={handleDetailsClose}
      />
      <Table
        title="Your Account Maps"
        columns={columns}
        data={companies}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit",
            onClick: (event, rowData) => {
              setOpen(!open);
              //alert("You edited company" + rowData.name);
            }
          },
          rowData => ({
            icon: "delete",
            tooltip: "Delete User",
            onClick: (event, rowData) =>
              confirm("You want to delete " + rowData.name), //eslint-disable-line no-restricted-globals
            disabled: rowData.birthYear < 2000
          })
        ]}
        options={{
          pageSize: 20,
          sorting: true,
          exportButton: true,
          actionsColumnIndex: -1
        }}
      />
    </React.Fragment>
  );
}

export default Companies;
