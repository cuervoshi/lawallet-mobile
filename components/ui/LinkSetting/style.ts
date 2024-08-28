import styled from "styled-components/native";

export const LinkSettingPrimitive = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 0 12px;
  background-color: ${(props) => props.theme.colors.gray15};
  border-radius: 8px;
`;

export const IconWrapper = styled.View`
  margin-left: 10px;
`;
