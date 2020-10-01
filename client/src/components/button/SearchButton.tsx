import React from 'react';
import Button, { ButtonProps } from "./Button";
import { BsSearch } from "react-icons/bs";

export const SearchButton: React.FC<ButtonProps> = ({ ...props }) => (
  <Button rightIcon={<BsSearch />} {...props} />
)

export default SearchButton;