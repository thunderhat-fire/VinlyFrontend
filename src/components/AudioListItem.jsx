import { TextField, Paper, Typography, Input, Button } from "@mui/material";
import axios from "axios";
import { apiStem } from "../utils/variables";
import { forwardRef, useState } from "react";
const AudioListItem = forwardRef(function audioItem( //audio item is a placeholder name, only there to clear a display name ESlint error
  { user, projectId, side, track, addFileHandler, fileInputRef },
  ref
) {
  const [localTrackName, setLocalTrackName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  // const audioUploadHandler = async (e) => {
  //   try {
  //     const file = e.target.files[0];

  //     const name = e.target.name;
  //     if (file.type !== "audio/wav") {
  //       console.log("invalid format");
  //     } else {
  //       // const formData = new FormData();
  //       // formData.append("songFile", file);
  //       // formData.append("ownerId", user.sub);
  //       // formData.append("projectId", projectId);
  //       // formData.append("track", track);
  //       // formData.append("side", side);
  //       // formData.append("preview", preview);
  //       // const result = await axios.post(`${apiStem}/songs`, formData, {
  //       //   headers: {
  //       //     "Content-Type": "multipart/form-data",
  //       //   },
  //       // });
  //       // console.log("result", result);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <>
      <Paper elevation={5} sx={{ margin: "5px" }}>
        <form
          style={{ textAlign: "center" }}
          onSubmit={(e) => {
            e.preventDefault();
            console.log(e);
            addFileHandler({
              file: selectedFile,
              title: localTrackName,
              side,
            });
            setLocalTrackName("");
          }}
        >
          <TextField
            label="Song Title"
            name="title"
            value={localTrackName}
            onChange={(e) => setLocalTrackName(e.target.value)}
          />
          <Typography>
            <TextField
              type="file"
              name="songFile"
              inputRef={ref}
              onChange={(e) => setSelectedFile(e.target.files[0])}
              sx={{ outline: "0" }}
              slotProps={{ formHelperText: track }}
            />
          </Typography>
          {localTrackName && selectedFile && <Button type="submit">Add</Button>}
        </form>
      </Paper>
    </>
  );
});

export default AudioListItem;
