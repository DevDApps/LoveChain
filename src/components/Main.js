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
                     + " You may contact users by clicking on thier hidden email address and sending them a message. "
                     + " You do not need to have a profile uploaded to send a message. "
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

                       <button onClick={(event) => {
                         const message = prompt("Please type a message you would like to send, including contact info.  ")
                         if (message != null) {alert("Your message  '" + message + "'  will be sent!")}
                        }}>
                             { image.email.substring(0, 3)
                                               + "***@***"
                                               + image.email.substring(image.email.length-5, image.email.length)}
                        </button>
                      </div>
                      <div className="card-body">
                        <p className="text-center">
                            <img  src={`https://ipfs.infura.io/ipfs/${image.hash}`} height="250px" style={{ maxWidth: '250px' }}  />
                        </p>

                      </div>
                      <div className="card-footer">

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
