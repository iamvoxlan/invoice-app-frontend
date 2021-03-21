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
import api from "../utils/api";

class Invoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoice_data: {},
      customer_data: {},
      ordered_item: [],
      sub_total: 0,
    };
  }

  async componentDidMount() {
    const id = this.props.match.params.id;
    const response = await api.get(`invoice/${id}`);
    this.setState({ ordered_item: response.data.data.ordered_item });
    let total = 0;
    for (const item of this.state.ordered_item) {
      total += item.qty * item.price;
    }
    this.setState({ customer_data: response.data.data.customer_id });
    this.setState({ sub_total: total });
    this.setState({
      invoice_data: {
        id: response.data.data.id,
        num: response.data.data.number,
        date: response.data.data.date,
        amount: response.data.data.invoice_amount,
      },
    });
  }

  render() {
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1> INVOICE </h1>
        </div>
        {this.state.customer_data && (
          <Table size="small" aria-label="a dense table">
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  <strong>Customer Name</strong>
                </TableCell>
                <TableCell align="left">
                  {this.state.customer_data.name}
                </TableCell>
                <TableCell align="left">
                  <strong>Invoice#</strong>
                </TableCell>
                <TableCell align="left">
                  {this.state.invoice_data.num}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <strong>Customer Address</strong>
                </TableCell>
                <TableCell align="left">
                  {this.state.customer_data.address}
                </TableCell>
                <TableCell align="left">
                  <strong>Invoice Date</strong>
                </TableCell>
                <TableCell align="left">
                  {this.state.invoice_data.date}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <strong>Customer Phone</strong>
                </TableCell>
                <TableCell align="left">
                  {this.state.customer_data.phone}
                </TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
        <br />
        <br />
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Item Name</TableCell>
                <TableCell align="right">Qty</TableCell>
                <TableCell align="right">Unit Price</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.ordered_item.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.qty}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">{row.qty * row.price}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell component="th" scope="row">
                  Sub Total
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">
                  {this.state.invoice_data.amount / 1.1}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Tax (10%)
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">
                  {(this.state.invoice_data.amount / 1.1) * 0.1}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Total
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">
                  {this.state.invoice_data.amount}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default Invoice;
