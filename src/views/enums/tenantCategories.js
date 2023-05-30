import { getTranslation } from "../../heplers/translationHelper";

 export const tenantCategories = [
    {
      id: 0,
      label: getTranslation("Rent", "Louer", "Mieten"),
    },
    {
      id: 1,
      label: getTranslation("Warranty", "Garantie locative", "Mietgarantie"),
    },
    {
      id: 2,
      label: getTranslation("Cost", "Frais", "Kosten"),
    },
    {
      id: 3,
      label: getTranslation("Repair and maintainance", "Réparation et entretien", "Reparatur und Wartung"),
    },
  ];