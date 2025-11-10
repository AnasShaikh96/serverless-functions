import pool from "../data/db";




// Had a problem where fn_name had generic unique constraint, updated it to have 
// composite unique constraint as per individual owners.

export const AlterColumnFnNameConstrainst = async () => {
    try {
        const query = `
        ALTER TABLE functions 
        DROP CONSTRAINT constraint_name,
        ADD CONSTRAINT unique_fnname_per_owner UNIQUE (owner, fn_name);
        `;
        await pool.query(query);
        console.log("table created successfully");
    } catch (error) {
        console.error("Error creating table:", error);
    } finally {
        pool.end();
    }
};
