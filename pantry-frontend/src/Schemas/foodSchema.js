import * as yup from "yup";

const foodValidationSchema = yup.object({
  name: yup.string("Enter a valid name").required("Name is required"),
  inventory: yup.number("Enter an inventory amount"),
});

export default foodValidationSchema;
