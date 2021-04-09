import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import SubContainer from '../sharedStyles/subContainer';

const Flight = ({ FligthDetail, setfligthSelected, flightSelected }) => {
  const [selected, setSelected] = useState(false);
  const [hoverDate, sethoverDate] = useState(false);
  const displayDate = useRef();

  const airlineIcon = {
    "UNITED AIRLINES": "icons/UnitedAirline.png",
    "PHILIPPINE AIRLINES": "icons/PhilippineAirlines.png",
    "HAWAIIAN AIRLINES": "icons/haiwaiianAirline.png",
    "DELTA AIR LINES": "icons/delta.png",
    "SOUTHWEST": "icons/southwest.png",
    "AMERICAN AIRLINES": "icons/AA.png",
    "TURKISH AIRLINES": "icons/turkisk.png",
    "QATAR AIRWAYS": "icons/qatar.png",
    "AIR CANADA": "icons/aircanada.png",
    "JETBLUE AIRWAYS": "icons/jetBlue.png",
    "ALASKA AIRLINES": "icons/alaska.jpeg",
    "SPIRIT AIRLINES": "icons/spirit.jpeg"
  }

  const flightLegs = (array) => {
    let display = '';
    for (let i = 0; i < array.length; i++) {
      display += array[i];
      if (i !== array.length - 1) {
        display += ' - ';
      }
    }
    return display;
  }

  const stop = (FligthDetail) => {
    if (FligthDetail.numberOfStops) {
      let display = FligthDetail.airports.slice(1, FligthDetail.airports.length - 1);
      let length = display.length;
      let displayStop = length === 1 ? "1 stop" : `${length} stops`;

      let legs = '';
      for (let i = 0; i < display.length; i++) {
        if (i === display.length - 1) {
          legs += display[i];
        } else {
          legs += display[i] + ", ";
        }
      }
      return (
        <div>
          <BigFont>{displayStop}</BigFont>
          <SmallFont>{legs}</SmallFont>
        </div>);
    }
    return "Non-stop";
  }

  const convertToTime = (APIdate) => {
    let date = new Date(APIdate);
    let time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    return (
    <Time onMouseEnter={() => { handleMouseEnter(APIdate)}} onMouseLeave={handleMouseLeave}>
     <Triangle></Triangle>
     {time}
    </Time> )
  }

  const handleSelected = () => {
    setSelected(!selected);
    setfligthSelected(FligthDetail);
  }

  const handleMouseLeave = () => {
    sethoverDate(false);
  }

  const handleMouseEnter = (APIdate) => {
    let date = new Date(APIdate);
    let weekday = date.toLocaleString('en-us', {  weekday: 'short' });
    let month = date.toLocaleString('default', { month: 'short' });
    let day = date.toLocaleString('default', { day: 'numeric' });
    let time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    displayDate.current = `${time} on ${weekday}, ${month} ${day}`;
    sethoverDate(true);
  }

  return (
    <FlightContainer onClick={handleSelected}>
      { flightSelected === FligthDetail ?
        <Circle selected ></Circle>
        : <Circle></Circle>}
      {
        <Icon src={airlineIcon[FligthDetail.airline] ? airlineIcon[FligthDetail.airline] : "icons/airlinelogo.png"} />
      }

      <AlignWrapper>

        <Bold>{convertToTime(FligthDetail.departureTime)}   -   {convertToTime(FligthDetail.arrivalTime)} </Bold>
        {
          hoverDate && (
            <div>
              <TimeAndDate>{displayDate.current}</TimeAndDate>
            </div>
          )
        }
        <SmallFont>{FligthDetail.airline}</SmallFont>
      </AlignWrapper>

      <AlignWrapper>
        <BigFont>{FligthDetail.duration}</BigFont>
        <SmallFont>{flightLegs(FligthDetail.airports)}</SmallFont>
      </AlignWrapper>

      <AlignWrapper>
        {stop(FligthDetail)}
      </AlignWrapper>

      <Bold>${FligthDetail.price}</Bold>
    </FlightContainer>
  )
}

export default Flight;

const SmallFont = styled.p`
  font-size: 13px;
  margin: 0;
`;

const Triangle = styled.div`
  width: 0;
  height: 0;
  left: 18px;
  bottom: 25px;
  position: absolute;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid white;
  filter: drop-shadow(0 -0.0625rem 0.0625rem #b7b7b7);
`;

const Time = styled.div`
  position: relative;
`;

const TimeAndDate = styled.div`
position: absolute;
  top: -6px;
  left: 102px;
  background: white;
  width: 200px;
  height: 30px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 5px 5px 10px 3px #b7b7b7;
`;

const Bold = styled.span`
  font-weight: bold;
  font-size: 19px;
  margin: 0;
  display: flex;
`;

const BigFont = styled.p`
  font-size: 19px;
  margin: 0;
`;

const AlignWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 25%;
`;

const FlightContainer = styled.div`
  display: flex;
  width: 95%;
  height: 100px;
  margin: 10px auto;
  max-width: 1300px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 10px -5px #cccc;
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  &:hover {
    transform: scale(1.01);
    transition: .5s;
  }
`;

const Icon = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 5px;
  object-fit: cover;
`;

const Circle = styled.span`
  height: 25px;
  width: 25px;
  background-color: ${props => props.selected ? "#4ECDC4" : "#CDCDCD"};
  border-radius: 50%;
`;

