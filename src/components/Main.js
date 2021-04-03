import React, { Component } from 'react';
import Identicon from 'identicon.js';
import info from '../InfoIconBlue.jpg';

class Main extends Component {

  render() {
    return (

      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
            <div className="content mr-auto ml-auto">
              <p>&nbsp;</p>

              <h2> Issue a Certification &nbsp;
                 <img src={info} height="21"
                    onClick={(event) => {
                    alert("To issue a certification enter the wallet address of the recipient then upload the image of the certificate. You can search for certifications owned by a recipient by entering their wallet address in the search filter.")
                  }}
                 />
              </h2>

              <form onSubmit={(event) => {
                event.preventDefault()
                const student = this.studentWallet.value
                this.props.uploadImage(student)
              }} >
                <input type='file' accept=".jpg, .jpeg, .png, .bmp, .gif" onChange={this.props.captureFile} />
                  <div className="form-group mr-sm-2">
                    <br></br>
                      <input
                        id="studentWallet"
                        type="text"
                        ref={(input) => { this.studentWallet = input }}
                        className="form-control"
                        placeholder="Wallet Address to Award Certificate to ..."
                        required />
                  </div>
                <button type="submit" className="btn btn-primary btn-block btn-lg">Upload</button>

              </form>


              <p>&nbsp;</p>
              <p>&nbsp;</p>

              <label>Search by owner: </label>
              <input
                  type="submit"
                  id="SearchOwner"
                  type="text"
                  ref={(input) => { this.userSearchFilter = input }}
                  className="form-control"
                  placeholder="0xC60124F569A7F59C852f82E5bC13a508e4513Be1 ..."
                  onChange={ this.props.getValueInput } />

              <p>&nbsp;</p>

              { this.props.images.map((image, key) => {
                return(

                <div className="card mb-4" key={key} >
                    <div className="card-header">
                      <img
                        className='mr-2'
                        width='30'
                        height='30'
                        src={`data:image/png;base64,${new Identicon(image.student, 30).toString()}`}
                      />
                      <small className="text-muted">{image.student}</small>
                    </div>

                    <ul id="imageList" className="list-group list-group-flush">
                      <li className="list-group-item">
                        <p className="text-center">
                            <img  src={`https://ipfs.infura.io/ipfs/${image.hash}`} width="45%"   />
                        </p>
                        <a
                        href={`https://ipfs.infura.io/ipfs/${image.hash}`}
                        target="_blank"
                        rel="noopener noreferrer">
                             <small className="text-muted">Issued by: {image.author}</small>
                        </a>
                      </li>
                    </ul>
                  </div>
                )
              })}

            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Main;
