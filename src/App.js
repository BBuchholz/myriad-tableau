import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';


function App() {



  function cardKeyToImagePath(cardKey){
    //just temporarily pulling from the repo for sandboxing
    return "https://raw.githubusercontent.com/BBuchholz/" + 
           "make-ten-mod/jpg-mod/public/images/cards-jpg/" + 
           cardKey + ".jpg";
  }

  const [gameData, setGameData] = useState({
    status: 'not initialized',
    score: 0,
    drawStack: [],
    discardStack: [],
    oneStack: [],
    twoStack: [],
    threeStack: [],
    fourStack: []
  });
  

  //const [discardPileCards, setDiscardPileCards] = useState([]);
  
  const [stackOneCards, setStackOneCards] = useState([]);
  const [stackTwoCards, setStackTwoCards] = useState([]);
  const [stackThreeCards, setStackThreeCards] = useState([]);
  const [stackFourCards, setStackFourCards] = useState([]);
  
  const [drawLegendText, setDrawLegendText] = useState("");
  const [discardLegendText, setDiscardLegendText] = useState("");

  const [stackOneLegendText, setStackOneLegendText] = useState("");
  const [stackTwoLegendText, setStackTwoLegendText] = useState("");
  const [stackThreeLegendText, setStackThreeLegendText] = useState("");
  const [stackFourLegendText, setStackFourLegendText] = useState("");

  const [drawJpgPath, setDrawJpgPath] = useState("");
  const [discardJpgPath, setDiscardJpgPath] = useState("");

  const [stackOneJpgPath, setStackOneJpgPath] = useState("");
  const [stackTwoJpgPath, setStackTwoJpgPath] = useState("");
  const [stackThreeJpgPath, setStackThreeJpgPath] = useState("");
  const [stackFourJpgPath, setStackFourJpgPath] = useState("");


  
  function loadDeck(){
    if(discardJpgPath === ""){
      setDiscardJpgPath(cardKeyToImagePath("2B"));
    }
    if(gameData.drawStack.length < 1){
      gameData.drawStack.push("2C");  
      gameData.drawStack.push("2H");  
      gameData.drawStack.push("2S");  
      gameData.drawStack.push("2D"); 
      gameData.drawStack.push("3C");  
      gameData.drawStack.push("3H");  
      gameData.drawStack.push("3S");  
      gameData.drawStack.push("3D"); 
      gameData.drawStack.push("4C");  
      gameData.drawStack.push("4H");  
      gameData.drawStack.push("4S");  
      gameData.drawStack.push("4D");  
      setDrawLegendText(gameData.drawStack.length);
      setDrawJpgPath(cardKeyToImagePath("1B"));
    }  
  }


  function handleStackOneClick() {
    

    alert(JSON.stringify(stackOneCards));
  }

  function handleStackTwoClick() {
    alert(JSON.stringify(stackTwoCards));
  }

  function handleStackThreeClick() {
    alert(JSON.stringify(stackThreeCards));
  }

  function handleStackFourClick() {
    alert(JSON.stringify(stackFourCards));
  }

  function peek(arr){
    let idx = arr.length - 1;
    return arr[idx]
  }

  function drawCards(quantity) {
    
    const sliced = gameData.drawStack.slice(quantity);

    const newDeck = gameData.drawStack.filter(key => !sliced.includes(key));
    
    let newGameData = gameData;
    newGameData.drawStack = newDeck;
    newGameData.status = generateStatus(newGameData);
    setGameData(newGameData);
    setDrawLegendText(newGameData.drawStack.length);

    return sliced;
  }

  function generateStatus(thisGameData){
    return 'Draw Stack: ' + JSON.stringify(thisGameData.drawStack);
  }

  function handleDrawClick() {

    let cardKeys = drawCards(4);

    handleSingleDealToStack(cardKeys[0],
                            stackOneCards, 
                            setStackOneCards, 
                            setStackOneLegendText, 
                            setStackOneJpgPath);
    handleSingleDealToStack(cardKeys[1],
                            stackTwoCards, 
                            setStackTwoCards, 
                            setStackTwoLegendText, 
                            setStackTwoJpgPath);
    handleSingleDealToStack(cardKeys[2],
                            stackThreeCards, 
                            setStackThreeCards, 
                            setStackThreeLegendText, 
                            setStackThreeJpgPath);
    handleSingleDealToStack(cardKeys[3],
                            stackFourCards, 
                            setStackFourCards, 
                            setStackFourLegendText, 
                            setStackFourJpgPath);


  }

  function handleSingleDealToStack(cardKey,
                                   stackArr, 
                                   setStackArr,
                                   setStackLegendText,
                                   setStackJpgPath){


    setStackArr([...stackArr, cardKey]);
    setStackLegendText(cardKey);
    setStackJpgPath(cardKeyToImagePath(cardKey)); 
  }


  loadDeck();


  return (
    <div className="App">
      <Container className="tableau" fluid>
        <Row>
          <Col xs={5}>
            <Stack handleClick={handleDrawClick} 
                   legendText={drawLegendText}
                   jpgPath={drawJpgPath} />
          </Col>
          <Col xs={5}>
            <DiscardStack
              jpgPath={discardJpgPath}
              bodyText={gameData.status} />
          </Col>
        </Row>
        <Row>
          <Col xs={5}>
            <Stack handleClick={handleStackOneClick} 
                   legendText={stackOneLegendText}
                   jpgPath={stackOneJpgPath} />
          </Col>
          <Col xs={5}>
            <Stack handleClick={handleStackTwoClick} 
                   legendText={stackTwoLegendText}
                   jpgPath={stackTwoJpgPath} />
          </Col>
        </Row>
        <Row> 
          <Col xs={5}>
            <Stack handleClick={handleStackThreeClick} 
                   legendText={stackThreeLegendText}
                   jpgPath={stackThreeJpgPath} />
          </Col>
          <Col xs={5}>
            <Stack handleClick={handleStackFourClick} 
                   legendText={stackFourLegendText}
                   jpgPath={stackFourJpgPath} />
          </Col>
        </Row>
      </Container> 
    </div>
  );

}

function DiscardStack({jpgPath, bodyText}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Stack handleClick={handleShow} 
             legendText={'Click Me'}
             jpgPath={jpgPath} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {bodyText}
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
    </div>
  );
}

function Stack({isHorizontal,
                handleClick,
                legendText,
                jpgPath}) {
  
  let className = '';
  if(isHorizontal) {
    //className += 'rotated'
  }
  
  return (
    <div className='stack' onClick={handleClick}>
      <p>[{legendText}]</p>
      <img 
          className={className}
          src={jpgPath}
          alt={"card goes here"} /> 
    </div>
  );
}

export default App;
