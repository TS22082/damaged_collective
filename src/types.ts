export type BoardType = {
  _id: string;
  brand: string;
  img: string;
};

export type ProductCardPropsType = {
  product: {
    _id: string;
    brand: string;
    img: string;
  };
  handleUiUpdate: any;
  handleDelete: any;
  updateItem: any;
};
