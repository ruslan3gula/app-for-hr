import React from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

class Home extends React.Component {
  constructor(props) {
    super();
    this.state = {
      application: null,
      filteredData: [],
      user: null
    };
    this.signout = this.signout.bind(this);
  }

  componentDidMount() {
    this.setState({ filteredData: this.state.application });
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged(user => {
      //console.log(user);
      if (user) {
        this.setState({ user });
        window.history.pushState({ home: 1 });
        // localStorage.setItem("user", user.uid);
      } else {
        this.setState({ user: null });
        // localStorage.removeItem("user");
      }
    });
  }

  handleSubmit = value => {
    this.setState(prevState => ({
      application: [...prevState.application, value]
    }));
    console.log("submitted", this.state.application);
    this.setState({ filteredData: this.state.application });
  };

  handleOnChange = e => {
    const searchedText = e.target.value ? e.target.value.toLowerCase() : "";
    console.log("searchedText", searchedText);

    const filteredData = this.state.application.filter(a =>
      a.firstName.toLowerCase().includes(searchedText)
    );
    this.setState({ filteredData: filteredData });
  };

  saveUser = user => {
    this.setState({ user });
  };

  signout() {
    const a = fire.auth().signOut();
    console.log("fire", a);
  }

  render() {
    return (
      <>
        <div>
          <Button
            variant="contained"
            color="secondary"
            // className={classes.button}
            // startIcon={<DeleteIcon />}
            onClick={this.signout}
          >
            SIGNOUT
          </Button>
        </div>
        <h1>Application form</h1>
        <TextField
          id="standard-basic"
          label="Search"
          onChange={this.handleOnChange}
        />

        <FormikForm handleSubmit={this.handleSubmit} />

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>FIRTSNAME</StyledTableCell>
                <StyledTableCell align="right">SURNAME</StyledTableCell>
                <StyledTableCell align="right">PRIO</StyledTableCell>
                <StyledTableCell align="right">DOC TYPE</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody />

            {this.state.filteredData.map(v => (
              <StyledTableRow>
                <StyledTableCell>{v.firstName}</StyledTableCell>
                <StyledTableCell align="right">{v.surName}</StyledTableCell>
                <StyledTableCell align="right">{v.prio}</StyledTableCell>
                <StyledTableCell align="right">{v.docType}</StyledTableCell>
              </StyledTableRow>
            ))}
          </Table>
        </TableContainer>
      </>
    );
  }
}

export default Home;
