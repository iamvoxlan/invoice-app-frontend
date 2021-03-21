import { Component } from "react";
import Button from "@material-ui/core/Button";
import cookie from "react-cookies";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import { Link, Redirect } from "react-router-dom";
import api from "../utils/api";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  logout = (event) => {
    event.preventDefault();
    cookie.remove("token");
    window.location = "/";
  };

   deleteInvoice = async (invoice_id) => {
    const response = api.delete(`invoice/${invoice_id}`);
    if (response) {
      const response2 = await api.get("invoice/");
      this.setState({ data: response2.data.data });
    }
  };

  async componentDidMount() {
    const response = await api.get("invoice/");
    this.setState({ data: response.data.data });
  }

  render() {
    return (
      <div>
        <Button onClick={this.logout}>Logout</Button>
        <Button>
          <Link to={`/create`}>Create Invoice</Link>
        </Button>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Invoice Date</TableCell>
                <TableCell align="right">Customer Name</TableCell>
                <TableCell align="right">Total Invoice Amount</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!this.state.data.length > 0 && (
                <TableCell align="right">NO DATA</TableCell>
              )}
              {this.state.data.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.date}
                  </TableCell>
                  <TableCell align="right">{row.customer_id.name}</TableCell>
                  <TableCell align="right">{row.invoice_amount}</TableCell>
                  <TableCell align="right">
                    <Button>
                      <Link to={`/invoice/${row.id}`}>Detail</Link>
                    </Button>
                    <Button>
                      <Link to={`/edit/${row.id}`}>Edit</Link>
                    </Button>
                    <Button onClick={() => this.deleteInvoice(row.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default Home;
