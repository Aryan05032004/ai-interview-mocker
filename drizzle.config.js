/** @type{import("drizzle-kit").Config} */
export default{
    schema: "./utils/schema.js",
    dialect: "postgresql",
    dbCredentials:{
        url: 'postgresql://neondb_owner:FIL2WBHO5UpS@ep-damp-leaf-a54b78jb.us-east-2.aws.neon.tech/neondb?sslmode=require'
    }
};