import React from "react";
import styled from "styled-components";

const Select = styled.select`
  width: 100%;
  height: 35px;
  background: white;
  color: black;
  padding-left: 5px;
  font-size: 16px;
  border: 1px solid black;
  margin-left: 0px;
`;

const Option = styled.option`
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;


const State = () => {
  return (<>        
        <Option selected disabled defaultValue={0}>Select State</Option>
        <Option value={"Andhra Pradesh"}>Andhra Pradesh</Option>
        <Option value={"Arunachal Pradesh"}>Arunachal Pradesh</Option>
        <Option value={"Assam"}>Assam</Option>
        <Option value={"Bihar"}>Bihar</Option>
        <Option value={"Chhattisgarh"}>Chhattisgarh</Option>
        <Option value={"Goa"}>Goa</Option>
        <Option value={"Gujarat"}>Gujarat</Option>
        <Option value={"Haryana"}>Haryana</Option>
        <Option value={"Himachal Pradesh"}>Himachal Pradesh</Option>
        <Option value={"Jammu and Kashmir"}>Jammu and Kashmir</Option>
        <Option value={"Jharkhand"}>Jharkhand</Option>
        <Option value={"Karnataka"}>Karnataka</Option>
        <Option value={"Kerala"}>Kerala</Option>
        <Option value={"Madhya Pradesh"}>Madhya Pradesh</Option>
        <Option value={"Maharashtra"}>Maharashtra</Option>
        <Option value={"Manipur"}>Manipur</Option>
        <Option value={"Meghalaya"}>Meghalaya</Option>
        <Option value={"Mizoram"}>Mizoram</Option>
        <Option value={"Nagaland"}>Nagaland</Option>
        <Option value={"Odisha"}>Odisha</Option>
        <Option value={"Punjab"}>Punjab</Option>
        <Option value={"Rajasthan"}>Rajasthan</Option>
        <Option value={"Sikkim"}>Sikkim</Option>
        <Option value={"Tamil Nadu"}>Tamil Nadu</Option>
        <Option value={"Telangana"}>Telangana</Option>
        <Option value={"Tripura"}>Tripura</Option>
        <Option value={"Uttarakhand"}>Uttarakhand</Option>
        <Option value={"Uttar Pradesh"}>Uttar Pradesh</Option>
        <Option value={"West Bengal"}>West Bengal</Option>
        <Option value={"Andaman and Nicobar Islands"}>Andaman and Nicobar Islands</Option>
        <Option value={"Chandigarh"}>Chandigarh</Option>
        <Option value={"Dadra and Nagar Haveli"}>Dadra and Nagar Haveli</Option>
        <Option value={"Daman and Diu"}>Daman and Diu</Option>
        <Option value={"Delhi"}>Delhi</Option>
        <Option value={"Lakshadweep"}>Lakshadweep</Option>
        <Option value={"Puducherry"}>Puducherry</Option>
      </>
  );
};

export default State;
