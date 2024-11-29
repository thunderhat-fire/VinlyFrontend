import { Paper, Typography } from "@mui/material";

const AddedTrackItem = ({ title, length, streamable, complete }) => {
  return (
    <>
      <Paper sx={{ background: complete ? "green" : "white" }}>
        <Typography>{title}</Typography>
      </Paper>
    </>
  );
};

export default AddedTrackItem;
