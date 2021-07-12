import React from "react";
import { makeStyles, Divider, Box } from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  item: {
    padding: theme.spacing(1.2)
  },
  avatar: { marginRight: theme.spacing(5) },
  paginator: {
    justifyContent: "center",
    padding: "10px"
  }
}));

const AllProjects = (props) => {
  const classes = useStyles();
  const itemsPerPage = 10;
  const [page, setPage] = React.useState(1);
  const [noOfPages] = React.useState(
    Math.ceil(projectsList.length / itemsPerPage)
  );

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <div>
        {projectsList
          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map((projectItem) => {
            // const labelId = `list-secondary-label-${projectItem.projectName}`;
            return (
              <ListItemText
                // id={labelId}
                key={projectItem.projectID}
                primary={projectItem.projectName}
                className={classes.item}
              />
            );
          })}
      </div>
      <Divider />
      <Box component="span">
        <Pagination
          count={noOfPages}
          page={page}
          onChange={handleChange}
          defaultPage={1}
          color="primary"
          size="large"
          showFirstButton
          showLastButton
          classes={{ ul: classes.paginator }}
        />
      </Box>
    </div>
  );
};

export default AllProjects;

const projectsList = [
  {
    projectID: 2,
    projectName: "bjkbu"
  },
  {
    projectID: 4,
    projectName: ";jnhn"
  },
  {
    projectID: 5,
    projectName: ";oi;mou"
  },
  {
    projectID: 15,
    projectName: " vgf"
  },
  {
    projectID: 16,
    projectName: "score"
  },
  {
    projectID: 17,
    projectName: "bbjh"
  },
  {
    projectID: 18,
    projectName: "grsw"
  },
  {
    projectID: 19,
    projectName: "Marathon"
  },
  {
    projectID: 20,
    projectName: "TestProject"
  },
  {
    projectID: 24,
    projectName: "score"
  },
  {
    projectID: 25,
    projectName: "manu"
  },
  {
    projectID: 26,
    projectName: "score"
  },
  {
    projectID: 27,
    projectName: "score"
  },
  {
    projectID: 28,
    projectName: "123"
  },
  {
    projectID: 29,
    projectName: "1234"
  },
  {
    projectID: 30,
    projectName: "Sample"
  },
  {
    projectID: 31,
    projectName: "1"
  },
  {
    projectID: 32,
    projectName: "1"
  },
  {
    projectID: 33,
    projectName: "2"
  },
  {
    projectID: 34,
    projectName: "score"
  },
  {
    projectID: 35,
    projectName: "TestProject2"
  },
  {
    projectID: 36,
    projectName: "score"
  },
  {
    projectID: 37,
    projectName: "score"
  },
  {
    projectID: 38,
    projectName: "AWS "
  },
  {
    projectID: 39,
    projectName: "AWS TEST"
  },
  {
    projectID: 40,
    projectName: "score"
  },
  {
    projectID: 41,
    projectName: "hahj"
  },
  {
    projectID: 42,
    projectName: "hahj"
  },
  {
    projectID: 44,
    projectName: "nnaj"
  },
  {
    projectID: 46,
    projectName: "Best Western"
  },
  {
    projectID: 50,
    projectName: "score"
  },
  {
    projectID: 51,
    projectName: "score"
  },
  {
    projectID: 52,
    projectName: "score"
  },
  {
    projectID: 53,
    projectName: "sample"
  },
  {
    projectID: 54,
    projectName: "ABC"
  },
  {
    projectID: 56,
    projectName: "sample project"
  },
  {
    projectID: 57,
    projectName: "XYZProject"
  },
  {
    projectID: 58,
    projectName: "test"
  },
  {
    projectID: 59,
    projectName: "b"
  },
  {
    projectID: 60,
    projectName: "test"
  },
  {
    projectID: 61,
    projectName: "SAMPLE"
  },
  {
    projectID: 62,
    projectName: "SAMPLE"
  },
  {
    projectID: 63,
    projectName: "score"
  },
  {
    projectID: 64,
    projectName: "score"
  },
  {
    projectID: 65,
    projectName: "TestRandom"
  },
  {
    projectID: 66,
    projectName: "RandomProjectName"
  },
  {
    projectID: 67,
    projectName: "test"
  },
  {
    projectID: 68,
    projectName: "Best Western International"
  },
  {
    projectID: 69,
    projectName: "a"
  },
  {
    projectID: 70,
    projectName: "RandomProjectName"
  },
  {
    projectID: 71,
    projectName: "SecretProject"
  },
  {
    projectID: 77,
    projectName: "score"
  },
  {
    projectID: 79,
    projectName: "RandomProjectName2"
  },
  {
    projectID: 80,
    projectName: "RandomProjectName2"
  },
  {
    projectID: 82,
    projectName: "YetAnotherRandomProject"
  },
  {
    projectID: 84,
    projectName: "Test Project 2"
  },
  {
    projectID: 96,
    projectName: "CannotStopWithRandomProjects"
  },
  {
    projectID: 111,
    projectName: "S.H.I.E.L.D"
  },
  {
    projectID: 113,
    projectName: "Avengers"
  },
  {
    projectID: 114,
    projectName: "Justice League"
  },
  {
    projectID: 124,
    projectName: "TestProject"
  },
  {
    projectID: 126,
    projectName: "Justice League"
  },
  {
    projectID: 127,
    projectName: "Test Project"
  },
  {
    projectID: 133,
    projectName: "test project"
  }
];
