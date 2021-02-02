import styled from 'styled-components';

const gutter = 2;

export const Gallery = styled.div`
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
`;

export const Image = styled.div`
  background-color: #eee;
  box-sizing: border-box;
  float: left;
  height: 16%;
  margin: gutter;
  margin: 5px;
  overflow: hidden;
  position: relative;
  width: calc(25% - ${gutter * 2}px);
  &:hover {
    opacity: 0.9;
  },
`;