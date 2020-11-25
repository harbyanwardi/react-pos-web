import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import { numberWithCommas } from '../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons'


const ModalKeranjang = ({
	showModal, handleClose, keranjangDetail, 
	jumlah, keterangan, tambah, 
	kurang, changeHandler, handleSubmit,
	totalHarga, handleDelete }) => {
	if(keranjangDetail){
		return (
			<Modal show={showModal} onHide={handleClose}>
				        <Modal.Header closeButton>
				          <Modal.Title>
				          	{keranjangDetail.product.nama} {" "}
				          	<strong>Rp. {numberWithCommas(keranjangDetail.product.harga)}</strong>
				          </Modal.Title>
				        </Modal.Header>
				        <Modal.Body>
				        	<Form onSubmit={handleSubmit}>
						  <Form.Group controlId="exampleForm.ControlInput1">
						    <Form.Label>Total Bayar</Form.Label>
						   	<p>
						   		{numberWithCommas(totalHarga)}
						   	</p>
						  </Form.Group>
						  <Form.Group controlId="exampleForm.ControlInput1">
						    <Form.Label>Jumlah : </Form.Label>
						    <br />
						   	<Button variant="primary" size="sm" className="mr-2" onClick ={() => tambah()}>
						   		<FontAwesomeIcon icon={faPlus} />
						   	</Button>
						   	<strong>{jumlah}</strong>
						   	<Button variant="primary" size="sm" className="ml-2" onClick ={() => kurang()}>
						   		<FontAwesomeIcon icon={faMinus} />
						   	</Button>
						  </Form.Group>
						
						  
						  <Form.Group controlId="exampleForm.ControlTextarea1">
						    <Form.Label>Keterangan</Form.Label>
						    <Form.Control as="textarea" name="keterangan" rows={3} 
						    value={keterangan}
						    onChange={(event) => changeHandler(event)}
						    placeholder="Contoh : Pedas" />
						  </Form.Group>
						  <Button variant="primary" type="submit">
						  	Simpan
						  </Button>
						</Form>
				        </Modal.Body>
				        <Modal.Footer>
				          
				          <Button variant="danger" onClick={() => handleDelete(keranjangDetail.id)}>
				          <FontAwesomeIcon icon={faTrash} />
				            Hapus Pesanan
				          </Button>
				        </Modal.Footer>
				      </Modal>
		)
	}
	else{
		return (
		<Modal show={showModal} onHide={handleClose}>
			        <Modal.Header closeButton>
			          <Modal.Title>
			          	Kosong
			          </Modal.Title>
			        </Modal.Header>
			        <Modal.Body>
			        	Kosong
			        </Modal.Body>
			        <Modal.Footer>
			          <Button variant="secondary" onClick={handleClose}>
			            Close
			          </Button>
			          <Button variant="primary" onClick={handleClose}>
			            Save Changes
			          </Button>
			        </Modal.Footer>
			      </Modal>
	)
	}
	
}

export default ModalKeranjang