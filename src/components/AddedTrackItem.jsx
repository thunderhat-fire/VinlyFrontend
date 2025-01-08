import { Paper, Typography, Button, Box } from "@mui/material";

const AddedTrackItem = ({
  title,
  length,
  preview,
  complete,
  previewHandler,
  id,
}) => {
  return (
    <>
      <Paper
        sx={{
          background: complete ? "green" : "white",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography>{title}</Typography>
        <Box
          sx={{
            padding: "0 5px",
            margin: "2px",
            background: preview ? `#1F7A1F` : `#000`,
            color: "#fff",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => previewHandler(id)}
        >
          Preview
        </Box>
      </Paper>
    </>
  );
};

export default AddedTrackItem;
