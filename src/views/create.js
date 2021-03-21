import { Component } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { FormControl } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import api from "../utils/api";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCustomer: "",
      name: "",
      price: 0,
      qty: 0,
      customer: [],
      ordered_items: [],
    };
  }

  async componentDidMount() {
    const customers = await api.get(`customer/`);
    this.setState({ customer: customers.data.data });
    console.log(this.state.customer);
  }

  handleSelectedCustomer = (event) => {
    this.setState({ selectedCustomer: event.target.value });
  };

  addRow = (item) => {
    if (item.qty === 0 || item.price === 0 || item.name === "") {
      alert("Fill empty form");
    } else {
      const new_items = this.state.ordered_items;
      new_items.push(item);
      this.setState({ ordered_items: new_items });
      this.setState({ name: "", qty: 0, price: 0 });
    }
  };

  render() {
    return (
      <div>
        <form>
          <FormControl>
            <InputLabel id="demo-simple-select-helper-label">
              Customer
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={this.state.selectedCustomer}
              onChange={this.handleSelectedCustomer}
            >
              {this.state.customer.map((row) => (
                <MenuItem value={row.id}>{row.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
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
                {this.state.ordered_items.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.qty}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">{row.qty * row.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <TextField
            required
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Item Name"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={(e) => this.setState({ name: e.target.value })}
            value={this.state.name}
          />
          <TextField
            required
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="qty"
            label="Quantity"
            name="qty"
            type="number"
            autoComplete="qty"
            autoFocus
            value={this.state.qty}
            onChange={(e) => this.setState({ qty: e.target.value })}
          />
          <TextField
            required
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="price"
            label="Price"
            name="price"
            type="number"
            autoComplete="price"
            autoFocus
            value={this.state.price}
            onChange={(e) => this.setState({ price: e.target.value })}
          />
          <Button
            onClick={() =>
              this.addRow({
                name: this.state.name,
                qty: this.state.qty,
                price: this.state.price,
              })
            }
            fullWidth
            variant="contained"
            color="primary"
          >
            Add Item
          </Button>
        </form>
      </div>
    );
  }
}

export default Create;
