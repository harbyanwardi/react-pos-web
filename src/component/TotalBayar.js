import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { numberWithCommas } from '../utils/utils';
import { API_URL } from '../utils/constants';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'



export default class TotalBayar extends Component {
	submitBayar = (totalbayar) => {
		const pesanans = {
			total_bayar: totalbayar,
			menus: this.props.carts
		}

		axios.post(API_URL+"pesanans", pesanans)
          .then(res => {
            // const menus = res.data;
            // this.setState({ menus });
          	this.props.history.push('/sukses')
          })

         
          .catch(error => {
            console.log(error);
          })
	}
	render() {
		const totalbayar = this.props.carts.reduce(function(result, item) {
			return result + item.total_harga;
		}, 0); //reduce disini untuk menjumlahkan isi total_harga pada carts
		return (
			<>
			{/* Web */}
			<div className="fixed-bottom d-none d-md-block">
				<Row>
					<Col md={{ span: 3, offset: 9 }} className="px-4">
						<h4>Total Bayar : <strong className="float-right mr-3">Rp {numberWithCommas(totalbayar)}</strong></h4>
						<Button variant="primary" className="mb-2 mt-2 mr-2" 
						size="lg"
						onClick = { () => this.submitBayar(totalbayar)} block>
							<FontAwesomeIcon icon={faShoppingCart} /><strong> BAYAR</strong>
							
						</Button>
					</Col>
				</Row>
			</div>

			{/* Mobile */}
				<div className="d-sm-block d-md-none">
					<Row>
						<Col md={{ span: 3, offset: 9 }} className="px-4">
							<h4>Total Bayar : <strong  className="float-right">Rp {numberWithCommas(totalbayar)}</strong></h4>
							<Button variant="primary" className="mb-2 mt-2" 
							size="lg"
							onClick = { () => this.submitBayar(totalbayar)} block>
								<FontAwesomeIcon icon={faShoppingCart} /><strong> BAYAR</strong>
								
							</Button>
						</Col>
					</Row>
				</div>
			</>
		)
	}
}