import React, { Component } from 'react';
import { Col, ListGroup, Row, Badge, Modal, Button, Card } from 'react-bootstrap';
import { numberWithCommas } from '../utils/utils';
import TotalBayar from  './TotalBayar';
import ModalKeranjang from './ModalKeranjang';
import axios from 'axios';
import swal from 'sweetalert';
import { API_URL } from '../utils/constants';


export default class Hasil extends Component {
	constructor(props) {
	    super(props)

	    this.state = {
	     showModal: false,
	     keranjangDetail: false,
	     jumlah: 0,
	     keterangan: '',
	     totalHarga: 0,
	    }
	 }

	 handleShow = (menukeranjang) => {
	 	this.setState({
	 		showModal: true,
	 		keranjangDetail: menukeranjang,
	 		jumlah: menukeranjang.jumlah,
	 		keterangan: menukeranjang.keterangan,
	 		totalHarga: menukeranjang.total_harga,
	 	})
	 }

	 handleClose = () => {
	 	this.setState({
	 		showModal: false
	 	})
	 }

	 tambah = () => {
	 	this.setState({
	 		jumlah: this.state.jumlah+1,
	 		totalHarga: this.state.keranjangDetail.product.harga*(this.state.jumlah+1)
	 	})
	 }

	 kurang = () => {
	 	if(this.state.jumlah !== 1) {
	 		this.setState({
		 		jumlah: this.state.jumlah-1,
		 		totalHarga: this.state.keranjangDetail.product.harga*(this.state.jumlah-1)
		 	})
	 	}
	 	
	 }

	 changeHandler = (event) => {
	 	this.setState({
	 		keterangan: event.target.value
	 	})
	 }

	 handleSubmit = (event) => {
	 	event.preventDefault();
	 	this.handleClose();
	 	
	 	const data = {
            jumlah: this.state.jumlah,
            total_harga: this.state.totalHarga,
            product: this.state.keranjangDetail.product,
            keterangan: this.state.keterangan
          }

          axios.put(API_URL+"keranjangs/"+this.state.keranjangDetail.id, data)
          .then(res => {
          	this.props.getKeranjang();
            // const menus = res.data;
            // this.setState({ menus });
            swal({
              title: "Update Order",
              text: "Success Update Order "+data.product.nama,
              icon: "success",
              button: false,
              timer: 2000,
            });

          })
          .catch(error => {
            console.log(error);
          })
	 }

	 handleDelete = (id) => {
	 	this.handleClose();
	 	
	 	

          axios.delete(API_URL+"keranjangs/"+id)
          .then(res => {
          	this.props.getKeranjang();
            // const menus = res.data;
            // this.setState({ menus });
            swal({
              title: "Hapus Order",
              text: "Success Hapus Order "+this.state.keranjangDetail.product.nama,
              icon: "error",
              button: false,
              timer: 2000,
            });

          })
          .catch(error => {
            console.log(error);
          })
	 }

	render() {
		const { carts } = this.props
		return (
			<Col md={3} className="mt-3">
				<h4><strong>Hasil</strong></h4>
				<hr />
				{carts.lenght !== 0 && (
					<Card className="overflow-auto hasil">
						<ListGroup variant="flush">
							{carts.map((menukeranjang) => (
								<ListGroup.Item key={menukeranjang.id} onClick = {() => this.handleShow(menukeranjang)} >
									<Row>
										<Col xs={2}>
											<h4>
												<Badge pill variant="success">
													{menukeranjang.jumlah}
												</Badge>
											</h4>
											
										</Col>
										<Col>
											<h5>{menukeranjang.product.nama}</h5>
											<p>Rp {numberWithCommas(menukeranjang.product.harga)}</p>
										</Col>
										<Col>
										<strong className="float-right">Rp {numberWithCommas(menukeranjang.total_harga)}</strong>
											
										</Col>
									</Row>
								</ListGroup.Item>
							))}
						 
						 <ModalKeranjang handleClose={this.handleClose} {...this.state} 
						 tambah={this.tambah} kurang={this.kurang} changeHandler={this.changeHandler} 
						 handleSubmit={this.handleSubmit} handleDelete={this.handleDelete}/>
						</ListGroup>
					</Card>
				)}
				
				<TotalBayar carts={carts} {...this.props} />
			</Col>
		)
	}
}