import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>
          <img src={require("../logo/logo.jpg")} height={50} />
        </Logo>
        <Desc>
          The work of many heads, hearts, and hands, we're a creative Home Décor{" "}
          {"&"} Furnishings Store. We design with joy, no pretense, and dollops
          of relevance. Our collections marry form with functionality. Explore
          modern lifestyle furniture, upholstery {"&"} curtain fabrics, lighting {"&"}
          accessories, and unique ceramics {"&"} tableware for your home.
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>
            <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
              Home
            </Link>
          </ListItem>
          <ListItem>
            <Link
              to={"/aboutus"}
              style={{ textDecoration: "none", color: "black" }}
            >
              About us
            </Link>
          </ListItem>
          <ListItem>
            <Link
              to={"/allproducts"}
              style={{ textDecoration: "none", color: "black" }}
            >
              Shop Now
            </Link>
          </ListItem>
          <ListItem>
            <Link
              to={"/categories"}
              style={{ textDecoration: "none", color: "black" }}
            >
              View Categories
            </Link>
          </ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} /> Maharashtra, India
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} /> +91 7758******
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} /> contact@makeithome.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
