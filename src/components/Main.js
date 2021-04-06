import React, { Component } from 'react';
import Identicon from 'identicon.js';
import info from '../InfoIconBlue.jpg';
import love from '../Love.png';

class Main extends Component {

  render() {
    return (

      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '900px' }}>
            <div className="content mr-auto ml-auto">
              <p>&nbsp;</p>

              <h2> Post your profile
                &nbsp;
                 <img src={info} height="21"
                    onClick={(event) => {
                    alert("You can post your profile to LoveChain by entering your email and uploading a picture of yourself. "
                     + " Your email will only be visible to the people that you choose to connect with by clicking on their profile. "
                     + " Your identicon will then appear in their interested list under their profile picture. "
                     + " That person can then either email you, or click on your profile so that their email will be visible to you. "
                     + "\r\n" +  "\r\n"
                     + "You can filter by the people that clicked on your profile."
                   )
                  }}
                 />
              </h2>

              <form onSubmit={(event) => {
                event.preventDefault()
                const email = this.emailAddress.value
                this.props.uploadImage(email)
              }} >
                <input type='file' accept=".jpg, .jpeg, .png, .bmp, .gif" onChange={this.props.captureFile} />
                  <div className="form-group mr-sm-2">
                    <br></br>
                      <input
                        id="emailAddress"
                        type="email"
                        ref={(input) => { this.emailAddress = input }}
                        className="form-control"
                        placeholder="Email address ..."
                        required />
                  </div>
                <button type="submit" className="btn btn-primary btn-block btn-lg">Upload</button>
              </form>


              <p>&nbsp;</p>
              <p>&nbsp;</p>

              <label>Filter profiles that are interested in me: </label>
              <input
                  type="submit"
                  id="SearchOwner"
                  type="text"
                  ref={(input) => { this.userSearchFilter = input }}
                  className="form-control"
                  placeholder="0xC60124F569A7F59C852f82E5bC13a508e4513Be1 ..."
                  onChange={ this.props.getValueInput } />

              <p>&nbsp;</p>
              <div className="card-deck">
              { this.props.images.map((image, key) => {
                return(


                  <div className="col-sm-6 col-md-4" key={key} >
                     <div className="card-header">
                       <img
                         className='mr-2'
                         width='30'
                         height='30'
                         src={`data:image/png;base64,${new Identicon(image.author, 30).toString()}`}
                       />
                       <small className="text">{image.email.substring(0, 3)
                                               + "***@***"
                                               + image.email.substring(image.email.length-5, image.email.length)}
                       </small>
                     </div>
                      <div className="card-body">
                        <p className="text-center">
                            <img  src={`https://ipfs.infura.io/ipfs/${image.hash}`} height="250px" style={{ maxWidth: '250px' }}  />
                        </p>

                      </div>
                      <div className="card-footer">
                        <a
                              href={`https://ipfs.infura.io/ipfs/${image.hash}`}
                              target="_blank"
                              rel="noopener noreferrer">
                                   <small className="text-muted"> <img
                                      className='mr-2'
                                      width='30'
                                      height='30'
                                      src={`data:image/png;base64,${new Identicon(image.author, 30).toString()}`}
                                    /></small>
                        </a>
                      </div>
                      <br/>
                    </div>
                )
              })}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Main;
