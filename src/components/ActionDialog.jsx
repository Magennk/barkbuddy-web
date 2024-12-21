<Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
  <DialogTitle>Notification</DialogTitle>
  <DialogContent>
    <Typography>{dialogMessage}</Typography>
  </DialogContent>
  <DialogActions>
    {dialogMessage === "Are you sure you want to cancel the meeting?" ? (
      <>
        <Button onClick={() => setDialogOpen(false)} color="primary">
          No
        </Button>
        <Button
          onClick={async () => {
            if (onConfirmAction) await onConfirmAction();
            setDialogOpen(false); // Close dialog after action
          }}
          color="primary"
          autoFocus
        >
          Yes
        </Button>
      </>
    ) : (
      <Button onClick={() => setDialogOpen(false)} color="primary" autoFocus>
        Close
      </Button>
    )}
  </DialogActions>
</Dialog>
