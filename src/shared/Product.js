import React from 'react';
import styled from 'styled-components';


const StyledWrapper = styled.div`
    width: 250px;
    height: auto;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 10px;
    border-radius: 10px;
    background: #fff;
    cursor: pointer;
    box-shadow: 0 0 10px 10px rgba(136, 177, 242, 0.1);

    :hover img{
        box-shadow: 0 0 10px 0 #bbb;
        transform: translateY(-20px);
    }


    h4{
        font-family: 'Bebas Neue', cursive;
    }
    p{
        font-family: 'Bebas Neue', cursive;
        color: #bbb;
        font-size: 12px;
        width: 100%;
        text-align: center;
    }
`;

const StyledImage = styled.div`
    width: 100%;
    height: 230px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: 0.2s;
    border-radius: 10px;

    img{
        height: 100%;
        width: auto;
        transition: 0.2s; 
        border-radius: 10px;
    }

    
`;

const StyledContainer = styled.div`
    width: 100%;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    

`;

const Product = (props) => {
    return ( 
        <>
        <StyledContainer>
        <StyledWrapper>
            <StyledImage>
                <img src={props.main_image}></img>
            </StyledImage>
            <h4>{props.name}</h4>
            <p>{props.description}</p>


        </StyledWrapper>
        </StyledContainer>
        </>
     );
}
 
export default Product;