import styled from 'styled-components';

const TagBox = styled.div`
  border-radius: 4px;
  background-color: ${props=>props.color ? props.color : "#000000"};
  padding: 7px 12px;
  display: inline-block;
`;

const TagTitle = styled.div`
  font-family: ${props=>props.theme.fontFamily};
  font-size: 16px;
  font-weight: bold;
  text-transform: lowercase;
  color: #ffffff;
`;


const Tag = ({children, color}) =>{
    return (
        <TagBox color={color}>
            <TagTitle>
                {children}
            </TagTitle>
        </TagBox>
    );
};

export default Tag;