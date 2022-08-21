import React from "react";
import { List, ListItem, Divider, Box } from "@mui/material";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Pagination from '@mui/material/Pagination';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import "./lists.css"
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';



export default function AllProjects(props) {
  console.log(props.ResultList);
  const projectsList = props.ResultList;
  const itemsPerPage = 4;
  const [page, setPage] = React.useState(1);
  const [noOfPages,setNumPages] = React.useState(
    Math.ceil(projectsList.length / itemsPerPage)
  );

  const handleChange = (event, value) => {
    setPage(value);
  };
  

  return (
    <div>
      <h3 className="intro">Old Predictions</h3>
      <div className="list-area">
      <List >
        {projectsList
          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map(resultItem => {
            const labelId = `list-secondary-label-${resultItem.input}`;
            return (
              <div style={{display:"flex", wordWrap:"break-word", width:"1300px", margin:"auto", marginTop:"15px",border:"1px solid gray", borderRadius:"10px"}}>
              <ListItem
                key={resultItem.id}
                button
                onClick={() => alert(resultItem.labelFirst + " " + resultItem.resultFirst + "\n"
                + resultItem.labelSecond + " " + resultItem.resultSecond + "\n" 
                + resultItem.labelThird + " " + resultItem.resultThird)} //show results
                
                
              > 
                <div className="insight-text">
                <ListItemText
                  id={labelId}
                  primary={resultItem.input}
                  secondary={
                    "Time created: " + resultItem.time_created
                  }
                  
                />
                </div>

                <div className="result-text">
                <ListItemText
                  id={labelId}
                  primary={resultItem.labelFirst}
                  secondary={
                    resultItem.resultFirst + "%"
                  }
                  
                />
                </div>
                
              </ListItem>
              <div className="delete-result-btn">
                <IconButton edge="end" aria-label="delete" >
                <DeleteIcon onClick={() => props.handleDelete(resultItem.id)}/>
                </IconButton>
              </div>
              </div>
            );
          })}
      </List>
      </div>
      <Divider />
      <Box component="span" style={{display:"flex", marginTop:"15px", marginBottom:"20px"}}>
        <Pagination
          count={noOfPages}
          page={page}
          onChange={handleChange}
          defaultPage={1}
          color="primary"
          size="large"
          showFirstButton
          showLastButton
          
        />
        <div className="clean-database-btn">
        <Button color="primary" onClick={props.handleDeleteAll}>Delete All <DeleteForeverIcon/> </Button>
        </div>
      </Box>
    </div>
  );
};

