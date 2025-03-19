import { Card, ValidationTable } from "../../../types";

const hasFalse = (validation: ValidationTable): boolean =>
  Object.entries(validation).some(([, values]) => values.includes(false));

const hasCommunity = (community: Card[]): boolean => community[0].index !== -1;

export default { hasFalse, hasCommunity };
