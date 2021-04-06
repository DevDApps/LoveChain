pragma solidity ^0.5.0;

contract LoveChain {
  string public name;
  uint public imageCount = 0;
  mapping(uint => Image) public images;

  struct Image {
    uint id;
    string hash;
    string email;
    address payable author;
  }

  event ImageCreated(
    uint id,
    string hash,
    string email,
    address payable author
  );


  constructor() public {
    name = "LoveChain";
  }

  function uploadImage(string memory _imgHash, string memory _email) public {
    // Make sure the image hash exists
    require(bytes(_imgHash).length > 0);
    // Make sure email address exists
    require(bytes(_email).length > 0);
    // Make sure uploader address exists
    require(msg.sender!=address(0));

    // Increment image id
    imageCount ++;

    // Add Image to the contract
    images[imageCount] = Image(imageCount, _imgHash, _email, msg.sender);
    // Trigger an event
    emit ImageCreated(imageCount, _imgHash, _email, msg.sender);
  }


}
