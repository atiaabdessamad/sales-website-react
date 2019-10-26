import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom';
import {
    MDBIcon, MDBTable, MDBTableBody, MDBTableHead, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn
} from 'mdbreact';

class MyList extends Component {



    constructor() {
        super();
        this.state = {
            error: null,
            isOpen: false,
            isLoaded: false,
            list: []
        }
    }

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }


    //Api functions
    delete_product(object, id) {
        const list = this.state.list;
        const index = list.indexOf(object);
        list.splice(index, 1);
        this.setState({
            list: list
        })
        fetch("http://localhost:3300/products/" + id, {
            method: "DELETE",
        }).then(res => {
            console.log(res);
        })
            .then(

                this.See()
            );

    }


    InputPage = () => {
        return (
            <div>

                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="10">
                            <form>
                                <p className="h5 text-center mb-4">Add your product</p>
                                <div className="grey-text">
                                    <MDBInput
                                        label="product name"
                                        icon="dolly-flatbed"
                                        group
                                        success="right"
                                        id="name"
                                    />
                                    <MDBInput
                                        label="Price"
                                        icon="money-bill-alt"
                                        group
                                        type="number"
                                        id="price"
                                    />
                                </div>
                                <div className="text-center">
                                    <MDBBtn onClick={() => this.add_product()}> Add </MDBBtn>
                                </div>
                            </form>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }


    add_format = () => {
        ReactDOM.render(
            this.InputPage()
            , document.getElementById('mylist'));
    }


    add_product() {
        fetch("http://localhost:3300/products/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: document.querySelector('#name').value,
                price: document.querySelector('#price').value
            })
        })
            .then(res => {
                console.log(res);
            }).then(res => { this.load_list() })

        console.log(this.state.list);
    }
//test
    load_list() {
        fetch("http://localhost:3300/products")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        list: []
                    });
                    this.setState({
                        isLoaded: true,
                        list: result
                    });
                    console.log(this.state.list);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }


    //List functions

    list_header = () => {

        return (

            <MDBTableHead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>Price</th>
                    <th>Delete</th>
                </tr>
            </MDBTableHead>

        )
    }

    list_body = () => {

        return this.state.list.map((attr) => {
            { console.log(attr) }
            return (

                <tr key={attr}>
                    <td>{attr._id}</td>
                    <td>{attr.name}</td>
                    <td>{attr.price}</td>
                    <td><button onClick={() => this.delete_product(attr, attr._id)} >X</button></td>
                </tr>
            )
        })


    }

    See = () => {

        ReactDOM.render(
            <MDBTable>
                {this.list_header()}
                <MDBTableBody>
                    {this.list_body()}
                </MDBTableBody>
            </MDBTable>




            , document.getElementById('mylist'));
        return 0;
    }


    //Button functions
    add_butoon = () => {
        return (<MDBBtn color="primary" onClick={() => this.add_format()}>add product </MDBBtn>)
    }



    load_product_button = () => {

        return (<MDBBtn color="info" onClick={() => this.load_list()}>load products </MDBBtn>)
    }


    list_button = () => {

        return (<MDBBtn color="secondary" onClick={() => this.See()}>show list </MDBBtn>)
    }



    ButtonsPage = () => {
        return (
            <Fragment>
                {this.add_butoon()}
                {this.load_product_button()}
                {this.list_button()}
            </Fragment>
        );
    }

    test = () => {
        console.log(this.state.list);
    }


    //render
    render() {
        return (

            <div>
                <div>
                    <MDBNavbar color="indigo" dark expand="md">
                        <MDBNavbarBrand>
                            <strong className="white-text">My list</strong>
                        </MDBNavbarBrand>
                        <MDBNavbarToggler onClick={this.toggleCollapse} />
                        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                            <MDBNavbarNav left>
                                <MDBNavItem active>
                                    {this.ButtonsPage()}
                                </MDBNavItem>
                                <MDBNavItem>

                                </MDBNavItem>
                                <MDBNavItem>

                                </MDBNavItem>
                                <MDBNavItem>
                                    <MDBDropdown>
                                        <MDBDropdownToggle nav caret>
                                            <span className="mr-2">Dropdown</span>
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu>
                                            <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                                            <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                                            <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                                            <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                </MDBNavItem>
                            </MDBNavbarNav>
                            <MDBNavbarNav right>
                                <MDBNavItem>
                                    <MDBFormInline waves>
                                        <div className="md-form my-0">
                                            <input className="form-control mr-sm-2" type="text" placeholder="Search a product" aria-label="Search" />
                                        </div>
                                    </MDBFormInline>
                                </MDBNavItem>
                            </MDBNavbarNav>
                        </MDBCollapse>
                    </MDBNavbar>
                </div>

                <div>
                    {/* <h1>My List</h1> */}
                    {/* <input value={this.state.text} onChange={e => this.mod_text(e.target.value)} /> */}

                    <div id="mylist">
                        <MDBTable>
                            {this.list_header()}
                            <MDBTableBody>
                                {this.list_body()}
                            </MDBTableBody>
                        </MDBTable>

                    </div>
                </div>
            </div>

        )
    }


}

export default MyList;