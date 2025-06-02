import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import ProgramDeleteForm from "../components/CategoryDeleteForm";

type Program = {
  id: number;
  title: string;
};

function ProgramDetail() {
  const { id } = useParams();
  const [program, setProgram] = useState(null as null | Program);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/program/${id}`)
      .then((response) => response.json())
      .then((data: Program) => {
        setProgram(data);
      });
  }, [id]);

  return (
    program && (
      <>
        <h1>{program.title}</h1>
        <Link to={`/program/${program.id}/edit`}>Modifier</Link>
        <ProgramDeleteForm id={program.id}>Supprimer</ProgramDeleteForm>
      </>
    )
  );
}

export default ProgramDetail;
