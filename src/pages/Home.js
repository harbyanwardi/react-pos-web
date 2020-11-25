import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Hasil, ListCategories,  Menus } from  '../component';
import { API_URL } from '../utils/constants';
import axios from 'axios';
import swal from 'sweetalert';


export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      menus : [],
      selectCategory : 'Minuman',
      carts : [],
    }
  }

  componentDidMount() {
    axios.get(API_URL+"products?category.nama="+this.state.selectCategory)
    .then(res => {
      const menus = res.data;
      this.setState({ menus });
    })
    .catch(error => {
      console.log(error);
    })

   this.getKeranjang();

  }

  // componentDidUpdate(prevState) {
  //   if(this.state.carts !== prevState.carts){
  //     axios.get(API_URL+"keranjangs")
  //     .then(res => {
  //       const carts = res.data;
  //       this.setState({ carts });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     })
  //   }

  // }

  getKeranjang = () => {
     axios.get(API_URL+"keranjangs")
    .then(res => {
      const carts = res.data;
      this.setState({ carts });
    })
    .catch(error => {
      console.log(error);
    })
  }

   changeCategory = (value) => {
      this.setState(
      {
        selectCategory: value,
        menus : []
      })

      axios.get(API_URL+"products?category.nama="+value)
      .then(res => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch(error => {
        console.log(error);
      })

    }

    intoCart = (value) => {

      axios.get(API_URL+"keranjangs?product.id="+value.id)
      .then(res => {
        if(res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value
          }

          axios.post(API_URL+"keranjangs", keranjang)
          .then(res => {
            this.getKeranjang();
            swal({
              title: "SUCCESS",
              text: "Success add into cart "+keranjang.product.nama,
              icon: "success",
              button: false,
              timer: 2000,
            });

          })
          .catch(error => {
            console.log(error);
          })
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah+1,
            total_harga: res.data[0].total_harga+value.harga,
            product: value
          }

          axios.put(API_URL+"keranjangs/"+res.data[0].id, keranjang)
          .then(res => {
            // const menus = res.data;
            // this.setState({ menus });
            swal({
              title: "SUCCESS",
              text: "Success add into cart "+keranjang.product.nama,
              icon: "success",
              button: false,
              timer: 2000,
            });

          })
          .catch(error => {
            console.log(error);
          })
        }
      })
      // .catch(error => {
      //   console.log(error);
      // })


      
    }

  render() {
    const { menus, selectCategory, carts } = this.state
    return (
      
          <div className="mt-2">
            <Container fluid>
               <Row>
                  <ListCategories changeCategory={this.changeCategory} selectCategory={selectCategory}/>
                  <Col className="mt-3">
                    <h4><strong>Daftar Product</strong></h4>
                    <hr/>
                    <Row className="overflow-auto menu">
                      {menus && menus.map((menu) => (
                          <Menus 
                            key = {menu.id}
                            menu = {menu}
                            intoCart = {this.intoCart}
                          />
                        ))}
                    </Row>
                  </Col>
                  <Hasil carts = {carts} {...this.props} getKeranjang={this.getKeranjang}/>
                </Row>
            </Container>

          </div>
      
    )
  }
}

