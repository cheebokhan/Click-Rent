import React, { useState, useEffect, useRef } from "react";
import Table from "../../../components/table";
import { getTranslation } from "../../../heplers/translationHelper";


const columns = [
  {
    id: "apartmentNo",
    numeric: false,
    disablePadding: true,
    label: getTranslation("Apartment Name", "Logement Nom", "Wohnung Name"),
  },
  {
    id: "amount",
    numeric: false,
    disablePadding: true,
    format: "number",
    label: getTranslation("Rent", "Louer", "Mieten"),
  },
  {
    id: "status",
    disablePadding: true,
    label: getTranslation("Status", "Statut", "Status"),
  },
];

export const AvailableApartments = ({availableApartments, loading,selectedApartment, onApartmentSelected}) => {
  console.log("ksgjdfdsgsdfg",availableApartments)
  const [searchString, setSearchString] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentRent, setCurrentRent] = useState(0)

  //handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handleSearchBuilding = (searchString) => {
    setSearchString(searchString);
  };
  const handleCurrentRent = (row) => {
    console.log("ljkshdfgsfdgsf",row)
    setCurrentRent(row?.rent)
  }
  return (
    <div>
      <Table
        dense
        auto
        title={getTranslation("Available Apartments", "Appartements disponibles", "Verfügbare Wohnungen")}
        loading={loading}
        colums={columns}
        sortBy="name"
        rows={availableApartments}
        count={5}
        page={0}
        rowsPerPage={10}
        viewEdit
        selected={selectedApartment?[selectedApartment]:[]}
        onEdit = {(row)=>{
          onApartmentSelected(row)}}
        // handleChangePage={handleChangePage}
        // handleChangeRowsPerPage={handleChangeRowsPerPage}
        //viewEdit
       // onEdit={(row) => onBuildingSelect(row)} 
      />
    </div>
  );
};
