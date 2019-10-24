import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function FormDialog({ open, onSave, onCancel }) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="form-dialog-title"
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">Company Details</DialogTitle>
      <DialogContent>
        <DialogContentText>Info about a company</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Company Name"
          type="text"
        />
        <TextField margin="dense" id="lob" label="Department" type="text" />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={onSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
