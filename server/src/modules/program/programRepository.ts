import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Program = {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
  category_id: number;
};

class ProgramRepository {
  async readAll() {
    // Execute the SQL SELECT query to retrieve all programs from the "program" table
    const [rows] = await databaseClient.query<Rows>("select * from program");

    // Return the array of programs
    return rows as Program[];
  }

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific program by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from program where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the program
    return rows[0] as Program;
  }

  async update(program: Partial<Program> & { id: number }) {
    const [result] = await databaseClient.query<Result>(
      "update program set title = ? where id = ?",
      [program.title, program.id],
    );
    return result.affectedRows;
  }

  async create(program: Partial<Omit<Program, "id">>) {
    // Execute the SQL INSERT query to add a new category to the "program" table
    const [result] = await databaseClient.query<Result>(
      "insert into program (name) values (?)",
      [program.title],
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  async delete(id: number) {
    // Execute the SQL DELETE query to delete an existing category from the "category" table
    const [result] = await databaseClient.query<Result>(
      "delete from program where id = ?",
      [id],
    );

    // Return how many rows were affected
    return result.affectedRows;
  }
}

export default new ProgramRepository();
